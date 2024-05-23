import { VueMaskDirective } from 'v-mask';

export const vMask = {
  beforeMount: VueMaskDirective.bind,
  updated: VueMaskDirective.componentUpdated,
  unmounted: VueMaskDirective.unbind,
};
