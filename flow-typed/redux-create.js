declare module "redux-create" {
  declare type Action<P> = {
    type: string;
    payload?: P;
  }
  declare type Reducer<S, A> = (state: S, action: A) => S;

  /* create Action Type */

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
  declare function createActionType(...parts: Array<string>): string;

  /* create Action Creator */
  declare type ActionCreator<P> = (payload?: P) => Action<P>;

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
  declare function createActionCreator<Payload>(...type: Array<string>): ActionCreator<Payload>;

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

   */
  declare function createAsyncActionCreator<RequestPayload, SuccessPayload, FailurePayload>
  (...type: Array<string>): {
    request: () => ActionCreator<RequestPayload>,
    success: () => ActionCreator<SuccessPayload>,
    failure: () => ActionCreator<FailurePayload>,
  }

  /* create Reducer */
  declare type CustomReducersMapObject = {
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
  declare function createReducer<S, R: CustomReducersMapObject>(defaultState: S, reducerMap: R):
  Reducer<S, Action<S>>;
}
