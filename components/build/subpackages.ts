import glob from 'glob';
import { access, readFile, writeFile } from 'node:fs/promises';
import {
  basename,
  dirname,
  isAbsolute,
  normalize,
  resolve as resolvePath,
} from 'node:path';
import type { NormalizedOutputOptions, OutputAsset, OutputChunk } from 'rollup';
import type { PluginOption } from 'vite';

/**
 * Information about a generated subpackage.
 */
export interface SubpackagesPackageInfo {
  /** Output directory containing the package. */
  dir: string;
  /** Name of the package entrypoint file. */
  file: string;
  /** Rollup output options. */
  options: NormalizedOutputOptions;
  /** Rollup chunk information. */
  chunk: OutputChunk;
}

/**
 * Subpackages plugin options.
 */
export interface SubpackagesOptions {
  /**
   * Path of the source directory to resolve module patterns from.
   *
   * Relative path is resolved from current working directory.
   */
  sourceDir?: string;
  /**
   * Glob patterns to match entrypoint files of subpackages in source directory.
   *
   * A separate entry chunk is created for each matching file.
   */
  modulePatterns: string[];
  /**
   * Additional entries for package.json file generated for each subpackage.
   *
   * Can be a static object or a function returning an object/promise.
   */
  packageJson?:
    | Record<string, unknown>
    | ((
        info: SubpackagesPackageInfo
      ) => Record<string, unknown> | Promise<Record<string, unknown>>);
}

/**
 * Creates a Vite plugin to generate separate subpackages.
 *
 * @param pluginOptions Plugin configuration options.
 * @returns Vite plugin configuration.
 */
export const subpackages = (
  pluginOptions: SubpackagesOptions
): PluginOption => {
  const packageModulePaths = new Set<string>();
  const isPackageOutputChunk = (
    outputInfo: OutputAsset | OutputChunk
  ): outputInfo is OutputChunk =>
    outputInfo.type === 'chunk' &&
    outputInfo.facadeModuleId &&
    packageModulePaths.has(normalize(outputInfo.facadeModuleId));

  return {
    name: 'subpackages-vite-plugin',

    /** Hook generating additional entrypoints for subpackage modules. */
    async options(options) {
      if (pluginOptions.modulePatterns.length < 1) return;
      const sourcePath = resolveSourcePath(pluginOptions);
      const packageModuleFiles = await findPackageModuleFiles(
        pluginOptions.modulePatterns,
        sourcePath
      );
      if (packageModuleFiles.length < 1) return;
      const packageEntrypoints = createPackageEntrypoints(
        packageModuleFiles,
        sourcePath
      );
      Object.values(packageEntrypoints).forEach((packageModulePath) =>
        packageModulePaths.add(normalize(packageModulePath))
      );
      return {
        ...options,
        input: {
          ...(typeof options.input === 'object' ? options.input : {}),
          ...packageEntrypoints,
        },
      };
    },

    /** Hook generating package.json file for each subpackage. */
    async writeBundle(options, bundle) {
      const packageOutputs = Object.values(bundle).filter(isPackageOutputChunk);
      await Promise.all(
        packageOutputs.map((outputChunk) =>
          writePackageJson(pluginOptions, options, outputChunk)
        )
      );
    },
  };
};

const resolveSourcePath = (pluginOptions: SubpackagesOptions) =>
  pluginOptions.sourceDir && isAbsolute(pluginOptions.sourceDir)
    ? pluginOptions.sourceDir
    : resolvePath(process.cwd(), pluginOptions.sourceDir || '.');

const findPackageModuleFiles = async (
  modulePatterns: string[],
  sourcePath: string
) => {
  const patternMatches = await Promise.all(
    modulePatterns.map((pattern) => findFilesByPattern(pattern, sourcePath))
  );
  return patternMatches.flatMap((files) => files);
};

const findFilesByPattern = (pattern: string, basePath?: string) =>
  new Promise<string[]>((resolve, reject) => {
    glob(pattern, { cwd: basePath }, (err, matches) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(matches);
    });
  });

const createPackageEntrypoints = (
  packageModuleFiles: string[],
  sourcePath: string
) =>
  packageModuleFiles.reduce<Record<string, string>>(
    (entrypoints, packageModuleFile) => {
      const entryName = packageModuleFile.replace(/\.[^.]*$/, '');
      entrypoints[entryName] = resolvePath(sourcePath, packageModuleFile);
      return entrypoints;
    },
    {}
  );

const writePackageJson = async (
  pluginOptions: SubpackagesOptions,
  outputOptions: NormalizedOutputOptions,
  outputChunk: OutputChunk
) => {
  const outputPath = resolvePath(outputOptions.dir, outputChunk.fileName);
  const outputDir = dirname(outputPath);
  const outputFile = basename(outputChunk.fileName);
  const packageJsonPath = resolvePath(outputDir, 'package.json');
  const isPackageJsonPresent = await access(packageJsonPath)
    .then(() => true)
    .catch(() => false);

  const packageJson = isPackageJsonPresent
    ? JSON.parse(await readFile(packageJsonPath, 'utf8'))
    : {};

  if (outputOptions.format === 'es') {
    packageJson.module = `./${outputFile}`;
  } else if (outputOptions.format === 'cjs' || outputOptions.format === 'umd') {
    packageJson.main = `./${outputFile}`;
  }

  if (typeof pluginOptions.packageJson === 'function') {
    Object.assign(
      packageJson,
      await pluginOptions.packageJson({
        dir: outputDir,
        file: outputFile,
        options: outputOptions,
        chunk: outputChunk,
      })
    );
  } else if (pluginOptions.packageJson) {
    Object.assign(packageJson, pluginOptions.packageJson);
  }

  await writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, undefined, 2),
    'utf8'
  );
};
