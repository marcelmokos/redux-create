# redux-create

redux create reducer, action creator, async action creator, action type

[![npm version](https://img.shields.io/npm/v/redux-create.svg?style=flat)](https://www.npmjs.com/package/redux-create) [![Build Status](https://travis-ci.org/marcelmokos/redux-create.svg?branch=master)](https://travis-ci.org/marcelmokos/redux-create) [![Coverage Status](https://coveralls.io/repos/github/marcelmokos/redux-create/badge.svg?branch=master)](https://coveralls.io/github/marcelmokos/redux-create?branch=master) [![dependency](https://david-dm.org/marcelmokos/redux-create/status.svg)](https://david-dm.org/marcelmokos/redux-create) [![devDep](https://david-dm.org/marcelmokos/redux-create/dev-status.svg)](https://david-dm.org/marcelmokos/redux-create?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/marcelmokos/redux-create/badge.svg)](https://snyk.io/test/github/marcelmokos/redux-create) 

## Create a Reducer

- creates nested reducer without need of writing switch statement

Usage: 

Javascript:
```javascript
const selectedProduct = createReducer(state = null, {
  [PRODUCT]: {
    [SELECT]: (state, payload) => payload,
    [TOGGLE]: (state, payload) => state === payload ? null : payload,
    [UNSELECT]: () => null,
  }
});
```

TypeScript, Flow Type:
```javascript
const selectedProduct = createReducer(state: null | number = null, {
  [PRODUCT]: {
    [SELECT]: (state, payload) => payload,
    [TOGGLE]: (state, payload) => state === payload ? null : payload,
    [UNSELECT]: () => null,
  }
});
```

same code written using switch
```javascript
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
```

## Create Action Creator

- creates Action Creator from one or more strings
- calling the created Action Creator will return Action Object of shape {type: string, payload: any}

Javascript:
```javascript
const createProduct = createActionCreator(PRODUCT_CREATE)

const productData = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}}
```

TypeScript:
```javascript
interface IProduct {
  id: number;
  name: string;
}
 
const createProduct = createActionCreator<IProduct>(PRODUCT_CREATE)
 
const productData: IProduct = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}}
```

Flow Type: 
```javascript
declare type TProduct {
  id: number;
  name: string;
}
 
const createProduct = createActionCreator<TProduct>(PRODUCT_CREATE)

const productData: TProduct = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}}
```

## Create an Async Action Creator 
- creates object containing Action Creators for async operations (request, success, failure)

```javascript
const asyncActionType = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

const createAsyncActionCreator = (...type) => ({
  request: createActionCreator(type, asyncActionType.REQUEST),
  success: createActionCreator(type, asyncActionType.SUCCESS),
  failure: createActionCreator(type, asyncActionType.FAILURE),
});
```

Usage: 

Javascript:
```javascript
export const fetchProductsAction = createAsyncActionCreator(FETCH_PRODUCTS);

export const fetchProducts = () => (dispatch) => {
  dispatch(fetchProductsAction.request());

  productsApi.fetchProducts().then(
    (payload) => dispatch(fetchProductsAction.success(payload)),
    (error) => dispatch(fetchProductsAction.failure(error)),
  );
};
```

TypeScript:
```javascript
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
```

Flow Type: 
```javascript
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
```

## Create Action Type

- creates action type from one or more strings
- exposed helper method can be replaced with template strings

```javascript
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

...
```
