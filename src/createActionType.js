import flattenDeep from "lodash.flattenDeep";

const createActionType = (...type) => flattenDeep(type).join("_");

export default createActionType;
