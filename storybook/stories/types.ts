/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefineComponent, ExtractPropTypes } from 'vue';

type ComponentPropOptions<
  C extends DefineComponent<any, any, any, any, any, any, any, any, any>
> = C extends DefineComponent<infer P, any, any, any, any, any, any, any, any>
  ? P
  : never;

export type StoryArgs<
  C extends DefineComponent<any, any, any, any, any, any, any, any, any>,
  AdditionalArgsType extends Record<string, any>
> = ExtractPropTypes<ComponentPropOptions<C>> & AdditionalArgsType;

export enum StoryArgCategory {
  Props = 'Props',
  Slots = 'Slots',
  Events = 'Events',
}
