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

/* Create Action Type */

/**
 * Create Action Type
 * @param parts
 *
 * usage:

const PRODUCT = "PRODUCT";
const CATEGORY = "CATEGORY";

const SELECT = "SELECT";
cosnt CREATE = "CREATE";
const UPDATE = "UPDATE";
cosnt DELETE = "DELETE";

cosnt PRODUCT_SELECT = createActionType(PRODUCT, SELECT) // "PRODUCT_SELECT";
cosnt PRODUCT_CREATE = createActionType(PRODUCT, CREATE) // "PRODUCT_CREATE";
cosnt PRODUCT_UPDATE = createActionType(PRODUCT, UPDATE) // "PRODUCT_UPDATE";
cosnt PRODUCT_DELETE = createActionType(PRODUCT, DELETE) // "PRODUCT_DELETE";

 */
export function createActionType(...parts: [string]): string;

/* Create Action Creator */

/**
 * A function that creates actions.
 */
export interface ActionCreator<P> {
  (payload?: P): Action<P>;
}

/**
 * Create an action creator
 * @param type The ActionType
 *
 * usage:
 * - javascript

const createProduct = createActionCreator(PRODUCT_CREATE)

const productData = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}

 * - Typescript

 interface IProduct {
    id: number;
    name: string;
 }

const createProduct = createActionCreator<IProduct>(PRODUCT_CREATE)

const productData: IProduct = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}}

 * - Flow Type

declare type TProduct {
 id: number;
 name: string;
}

const createProduct = createActionCreator<TProduct>(PRODUCT_CREATE)

const productData: TProduct = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}}

 */
export function createActionCreator<Payload>(...type: [string]): ActionCreator<Payload>;

/**
 * Create an async action creator
 * @param type
 *
 * usage:
 * - javascript

export const fetchProductsAction = createAsyncActionCreator(FETCH_PRODUCTS);

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsAction.request());

  productsApi.fetchProducts().then(
    (payload) => dispatch(fetchProductsAction.success(payload)),
    (error) => dispatch(fetchProductsAction.failure(error)),
  );
};

 * - typescript

interface IErrorPayload {
  message: string;
}

export const fetchProductsAction = createAsyncActionCreator<{}, IProduct[], IErrorPayload>(FETCH_PRODUCTS);

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsAction.request());

  productsApi.fetchProducts().then(
    (payload) => dispatch(fetchProductsAction.success(payload)),
    (error) => dispatch(fetchProductsAction.failure(error)),
  );
};

 * - Flow Type

declare type TErrorPayload {
  message: string;
}

 export const fetchProductsAction = createAsyncActionCreator<{}, TProduct[], TErrorPayload>(FETCH_PRODUCTS);

 export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsAction.request());

  productsApi.fetchProducts().then(
    (payload) => dispatch(fetchProductsAction.success(payload)),
    (error) => dispatch(fetchProductsAction.failure(error)),
  );
};

 */
export function createAsyncActionCreator<RequestPayload, SuccessPayload, FailurePayload>(...type: [string]): {
  request: () => ActionCreator<RequestPayload>,
  success: () => ActionCreator<SuccessPayload>,
  failure: () => ActionCreator<FailurePayload>,
}


/* Create Reducer */
export interface CustomReducersMapObject {
  [key: string]: CustomReducersMapObject | void;
}

/**
 * Create an reducer
 * @param defaultState The default state of the reducer
 * @param reducerMap The tree object containing 'Leafs' with reducer functions
 *
 * usage:
 * - javascript

const selectedProduct = createReducer(state = null, {
  [PRODUCT]: {
    [SELECT]: (state, payload) => payload,
    [TOGGLE]: (state, payload) => state === payload ? null : payload,
    [UNSELECT]: () => null,
  }
});

 * - typescript

const selectedProduct = createReducer(state: null | number = null, {
  [PRODUCT]: {
    [SELECT]: (state, payload) => payload,
    [TOGGLE]: (state, payload) => state === payload ? null : payload,
    [UNSELECT]: () => null,
  }
});

 * - Flow Type

const selectedProduct = createReducer(state: null | number = null, {
  [PRODUCT]: {
    [SELECT]: (state, payload) => payload,
    [TOGGLE]: (state, payload) => state === payload ? null : payload,
    [UNSELECT]: () => null,
  }
});

 * - same code written using switch

 const selectedProduct = (state = null, action) => {
  switch (action.type) {
    case PRODUCT_SELECT:
      return action.payload;
    case PRODUCT_TOGGLE:
      return state === action.payload ? null : action.payload;
    case PRODUCT_UNSELECT:
      return null;
    default:
      return state;
  }
};

 */
export function createReducer<S, CustomReducersMapObject>(defaultState, reducerMap): Reducer<S>;

