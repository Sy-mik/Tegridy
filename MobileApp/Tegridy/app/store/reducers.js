import { combineReducers } from "redux";

import {
  DATA_AVAILABLE,
  FETCH_SCHEDULED,
  FETCH_PLANTS,
  FETCH_RULES,
  IMPORT_SCHEDULED_FROM_RULES,
  UPDATE_MARKED_DATES,
} from "./actions";

let scheduledItems = { data: [] };
let userPlants = { data: [] };
let userRules = { data: [] };
let markedDates = {};

const scheduledDataReducer = (state = scheduledItems, action) => {
  switch (action.type) {
    case FETCH_SCHEDULED:
      scheduledItems = action.data;
      return { ...state, data: scheduledItems };
    case IMPORT_SCHEDULED_FROM_RULES:
      executeImportScheduledFromRules(action.month);
      return { ...state, data: scheduledItems };
    default:
      return state;
  }
};

const updateMarkedDates = (state = markedDates, action) => {
  switch (action.type) {
    case UPDATE_MARKED_DATES:
      updateMarkedDatesLogic(new Date());
      return { ...state, data: markedDates };
    default:
      return state;
  }
};

function updateMarkedDatesLogic(date) {
  let obj = new Object();
  for (
    var d = new Date(date.getFullYear(), date.getMonth(), 1);
    d <= new Date(date.getFullYear(), date.getMonth(), 31);
    d.setDate(d.getDate() + 1)
  ) {
    let binaryDay = Math.pow(2, d.getDay());
    if (userRules && userRules.length > 0) {
      if (IsFlagSet(userRules[0].days, binaryDay)) {
        obj[d.toISOString().slice(0, 10)] = {
          marked: true,
          dotColor: "blue",
          activeOpacity: 0,
        };
      }
    }
  }
  markedDates = obj;
}

function IsFlagSet(value, flag) {
  return (value & flag) != 0;
}

const userPlantsReducer = (state = userPlants, action) => {
  switch (action.type) {
    case FETCH_PLANTS:
      userPlants = action.data;
      return { ...state, data: userPlants };
    default:
      return state;
  }
};

const userRulesReducer = (state = userRules, action) => {
  switch (action.type) {
    case FETCH_RULES:
      console.log("RULES");
      console.log(action.data); //
      userRules = action.data;
      console.log(userRules); //
      return { ...state, data: userRules };
    default:
      return state;
  }
};

// Combine all the reducers
const rootReducer = combineReducers({
  scheduledDataReducer: scheduledDataReducer,
  userPlantsReducer: userPlantsReducer,
  userRulesReducer: userRulesReducer,
  updateMarkedDates: updateMarkedDates
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
