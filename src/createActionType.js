import {flattenDeep} from "lodash";

const createActionType = (...type) => flattenDeep(type).join("_");

export default createActionType;
