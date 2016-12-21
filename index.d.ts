/**
 * An *action* is a plain object that represents an intention to change the
 * state. Actions are the only way to get data into the store. Any data,
 * whether from UI events, network callbacks, or other sources such as
 * WebSockets needs to eventually be dispatched as actions.
 *
 * Actions must have a `type` field that indicates the type of action being
 * performed. Types can be defined as constants and imported from another
 * module. It's better to use strings for `type` than Symbols because strings
 * are serializable.
 *
 * Other than `type`, the structure of an action object is really up to you.
 * If you're interested, check out Flux Standard Action for recommendations on
 * how actions should be constructed.
 */
export interface Action<P> {
  type: string;
  payload?: P
}

/* reducers */

/**
 * A *reducer* (also called a *reducing function*) is a function that accepts
 * an accumulation and a value and returns a new accumulation. They are used
 * to reduce a collection of values down to a single value
 *
 * Reducers are not unique to Redux—they are a fundamental concept in
 * functional programming.  Even most non-functional languages, like
 * JavaScript, have a built-in API for reducing. In JavaScript, it's
 * `Array.prototype.reduce()`.
 *
 * In Redux, the accumulated value is the state object, and the values being
 * accumulated are actions. Reducers calculate a new state given the previous
 * state and an action. They must be *pure functions*—functions that return
 * the exact same output for given inputs. They should also be free of
 * side-effects. This is what enables exciting features like hot reloading and
 * time travel.
 *
 * Reducers are the most important concept in Redux.
 *
 * *Do not put API calls into reducers.*
 *
 * @template S State object type.
 */
export type Reducer<S> = <A extends Action<S>>(state: S, action: A) => S;

/* create Action Type */

/**
 * Create Action Type
 * @param type
 */
export function createActionType(...type: [string]): string;

/* create Reducer */

export interface CustomReducersMapObject {
  [key: string]: CustomReducersMapObject | void;
}

/**
 * Create an reducer
 * @param defaultState The default state of the reducer
 * @param reducerMap The tree object containing 'Leafs' with reducer functions
 */
export function createReducer<S, CustomReducersMapObject>(defaultState, reducerMap): Reducer<S>;

/* create Action Creator */

/**
 * A function that creates actions.
 */
export interface ActionCreator<P> {
  (payload?: P): Action<P>;
}

/**
 * Create an action creator
 * @param type The ActionType
 */
export function createActionCreator<P>(...type: [string]): ActionCreator<P>;

