import { readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

export interface EntrypointsOptions {
  /** Absolute path of the source directory. */
  sourceDirectoryPath: string;
  /** Name of the components directory inside the source directory. */
  componentsDirectoryName: string;
}

/**
 * Creates build entrypoints for the main module and all components inside the
 * given components directory.
 *
 * @param options Options for entrypoints.
 * @returns Build entrypoints.
 */
export const createEntrypoints = ({
  sourceDirectoryPath,
  componentsDirectoryName,
}: EntrypointsOptions): Record<string, string> => ({
  // Entrypoint for main module of the package.
  index: `${sourceDirectoryPath}/index.ts`,
  // Entrypoints for each component inside source directory.
  ...readdirSync(resolve(sourceDirectoryPath, componentsDirectoryName))
    .filter((componentsEntry) =>
      statSync(
        resolve(sourceDirectoryPath, componentsDirectoryName, componentsEntry)
      ).isDirectory()
    )
    .reduce<Record<string, string>>((entrypoints, componentDirectoryName) => {
      entrypoints[
        `${componentsDirectoryName}/${componentDirectoryName}/index`
      ] = resolve(
        sourceDirectoryPath,
        componentsDirectoryName,
        componentDirectoryName,
        'index.ts'
      );
      return entrypoints;
    }, {}),
});
