import asyncActionType from "./asyncActionType";
import createActionCreator from "./createActionCreator";

export const createAsyncActionCreator = (...type) => ({
  request: createActionCreator(type, asyncActionType.REQUEST),
  success: createActionCreator(type, asyncActionType.SUCCESS),
  failure: createActionCreator(type, asyncActionType.FAILURE),
});
