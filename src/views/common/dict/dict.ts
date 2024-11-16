import { backendDict, clearBackendDictCache } from './backendDict.ts';
import { frontendDict } from './frontendDict.ts';
import { dictHooks } from './dictHooks.ts';

export const $dict = {
  ...backendDict,
  ...frontendDict,
  ...dictHooks,
  clearCache() {
    clearBackendDictCache();
  },
};
