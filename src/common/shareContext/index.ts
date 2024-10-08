import useToastCtx from './useToastCtx';
import useDialogCtx from './useDialogCtx';

// Expose instance
export const $toast = useToastCtx();
export const $dialog = useDialogCtx();

export { useToastCtx, useDialogCtx };
