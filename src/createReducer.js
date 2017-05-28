import {reduce, isFunction, isObject} from "lodash";
import createActionType from "./createActionType";

const createReducer = (defaultState, reducerMap) => {
  const iterator = (reducers, initial = {}, prefix = []) =>
    reduce(
      reducers,
      (acc, reducer, type) => {
        if (isFunction(reducer)) {
          return {...acc, [createActionType(prefix, type)]: reducer};
        }

        if (!isObject(reducer)) {
          throw new Error(
            "createReducer expect 'Object' tree with 'Leafs' (A node with no children) containing function that takes arguments (state, action)",
          );
        }

        return iterator(reducer, acc, [createActionType(prefix, type)]);
      },
      initial,
    );

  const flattened = iterator(reducerMap);

  return (state = defaultState, action) => {
    if (!Object.prototype.hasOwnProperty.call(flattened, action.type)) {
      return state;
    }

    const reducer = flattened[action.type];

    return reducer(state, action.payload);
  };
};

export default createReducer;
