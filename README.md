# redux-create

redux create reducer, action type and action creator

[![Build Status](https://travis-ci.org/marcelmokos/redux-create.svg?branch=master)](https://travis-ci.org/marcelmokos/redux-create)

## Create Action Type

- creates action type from one or more strings
- exposed helper method can be replaced with template strings

```
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

## Create Action Creator

- creates Action Creator from one or more strings
- calling the created Action Creator will return Action Object of shape {type: string, payload: any}

Javascript:
```
const createProduct = createActionCreator(PRODUCT_CREATE)

const productData = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}
```

TypeScript:
```
interface IProduct {
  id: number;
  name: string;
}
 
const createProduct = createActionCreator<IProduct>(PRODUCT_CREATE)
 
const productData: IProduct = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}}
```

Flow Type: 
```
declare type Product {
  id: number;
  name: string;
}
 
const createProduct = createActionCreator<Product>(PRODUCT_CREATE)

const productData: Product = {id: 1, name: "test"}
createProduct(productData) // {type: "PRODUCT_CREATE", payload: {id: 1, name: "test"}}
```

## Create an reducer

- creates nested reducer without need of writing switch statement

```
const selectedProduct = createReducer(state = null, {
  [PRODUCT]: {
    [SELECT]: (state, payload) => payload,
    [TOGGLE]: (state, payload) => state === payload ? null : payload,
    [UNSELECT]: () => null,
  }
});
```
same code written using switch
```
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
