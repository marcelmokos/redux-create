declare module "redux-create" {
  declare type Action<P> = {
    type: string;
    payload?: P;
  }
  declare type Reducer<S, A> = (state: S, action: A) => S;

  /* create Action Type */

  declare function createActionType(...type: Array<string>): string;

  /* create Action Creator */
  declare type ActionCreator<P> = (payload?: P) => Action<P>;

  declare function createActionCreator<P>(...type: Array<string>): ActionCreator<P>;

  /* create Reducer */
  declare type CustomReducersMapObject = {
    [key: string]: CustomReducersMapObject | void;
  }


  declare function createReducer<S, R: CustomReducersMapObject>(defaultState: S, reducerMap: R):
  Reducer<S, Action<S>>;
}
