import { Ref, ref, UnwrapRef } from 'vue';

export function useState<T>(initialValue: T) {
  const state = ref(initialValue) as Ref<UnwrapRef<T>>;

  function setState(value: UnwrapRef<T>) {
    state.value = value;
  }

  return [state, setState] as const;
}
