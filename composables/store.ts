import type { Ref, ComputedRef, ToRef, ToRefs } from 'vue'
import type { StoreGeneric, StoreState, PiniaCustomStateProperties, StoreGetters, StoreActions } from 'pinia'
import { storeToRefs } from 'pinia'

type ToComputedRefs<T> = {
  [K in keyof T]: ToRef<T[K]> extends Ref<infer U> ? ComputedRef<U> : ToRef<T[K]>
}

type ExtractStore<SS extends StoreGeneric> = ToRefs<StoreState<SS> & PiniaCustomStateProperties<StoreState<SS>>> &
  ToComputedRefs<StoreGetters<SS>> &
  StoreActions<SS>

/**
 *  Convert store to be reactive and keep everything that is not reactive too (like function etc...)
 * @param store
 * @returns Store
 */
export const extractStore = <T extends StoreGeneric>(store: T) => {
  const refs = storeToRefs(store)
  return new Proxy(store, {
    get: (store, key: string) => refs[key] ?? store[key],
  }) as ExtractStore<T>
}
