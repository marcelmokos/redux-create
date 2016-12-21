import createActionType from "./createActionType";

const createActionCreator = (...type) => payload => ({
  type: createActionType(type),
  payload,
});

export default createActionCreator;
