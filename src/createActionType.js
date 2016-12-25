import {flattenDeep} from "lodash";

const createActionType = (...parts) => flattenDeep(parts).join("_");

export default createActionType;
