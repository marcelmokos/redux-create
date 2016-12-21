import {
  reduce,
  isFunction,
  isObject,
} from "lodash";
import createActionType from "./createActionType";

const createReducer = (defaultState, reducerMap) => {
  const iterator = (reducers, initial = {}, prefix = []) =>
    reduce(reducers, (acc, reducer, type) => {
      if (isFunction(reducer)) {
        return {...acc, [createActionType(prefix, type)]: reducer};
      }

      if (!isObject(reducer)) {
        throw "createReducer expect 'Object' tree with 'Leafs' (A node with no children) containing functions";
      }

      return iterator(reducer, acc, [createActionType(prefix, type)]);
    }, initial);

  const flattened = iterator(reducerMap);

  return (state = defaultState, action) => {
    const reducer = flattened[action.type];

    return (reducer) ? reducer(state, action.payload) : state;
  };
};

export default createReducer;
