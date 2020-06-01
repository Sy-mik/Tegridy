import { combineReducers } from "redux";
import {
  SET_IS_LOADING_TRUE,
  SET_IS_LOADING_FALSE,
} from "./actions";

import { updateMarkedDatesReducer } from "./reducers/updateMarkedDatesReducer";
import { scheduledDataReducer } from "./reducers/scheduledDataReducer";
import { userPlantsReducer } from "./reducers/userPlantsReducer";
import { userRulesReducer } from "./reducers/userRulesReducer";
let isLoading = false;

const updateIsLoadingReducer = (state = isLoading, action) => {
  switch (action.type) {
    case SET_IS_LOADING_TRUE:
      isLoading = true;
      return { ...state, data: isLoading };
    case SET_IS_LOADING_FALSE:
      isLoading = false;
      return { ...state, data: isLoading };
    default:
      return state;
  }
};

function IsFlagSet(value, flag) {
  return (value & flag) != 0;
}

// Combine all the reducers
const rootReducer = combineReducers({
  scheduledDataReducer: scheduledDataReducer,
  userPlantsReducer: userPlantsReducer,
  userRulesReducer: userRulesReducer,
  updateMarkedDates: updateMarkedDatesReducer,
  isDataLoading: updateIsLoadingReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
