import { CommitOptions, DispatchOptions, Store } from 'vuex';
import {
  RootActionTypes,
  RootGetterTypes,
  RootMutationTypes,
  RootStore,
} from '@/store';

/** @usage (in Store Module) export interface GetterTypes extends BaseGetterTypes { ... } */
export interface BaseGetterTypes {
  [key: string]: { returnType: any };
}

/** @usage (in Store Module) export interface MutationTypes extends BaseMutationTypes { ... } */
export interface BaseMutationTypes {
  [key: string]: { payload: any };
}

/** @usage (in Store Module) export interface ActionTypes extends BaseActionTypes { ... } */
export interface BaseActionTypes {
  [key: string]: { payload: any; returnType: any };
}

/** Commit の型拡張 */
export interface TypedCommit {
  <K extends keyof RootMutationTypes>(
    type: Extract<K, string>,
    payload: RootMutationTypes[K]['payload'],
    options?: CommitOptions,
  ): void;
  // default
  (type: string, payload?: any, options?: CommitOptions): void;
}

/** Dispatch の型拡張 */
export interface TypedDispatch {
  <K extends keyof RootActionTypes>(
    type: Extract<K, string>,
    payload: RootActionTypes[K]['payload'],
    options?: DispatchOptions,
  ): Promise<RootActionTypes[K]['returnType']>;
  // default
  (type: string, payload?: any, options?: DispatchOptions): Promise<any>;
}

/** Store の型拡張 */
export interface TypedStore extends Store<RootStore> {
  readonly state: RootStore;
  readonly getters: RootGetterTypes;
  commit: TypedCommit;
  dispatch: TypedDispatch;
}
