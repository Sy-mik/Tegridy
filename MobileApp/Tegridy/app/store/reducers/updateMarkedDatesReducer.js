import { UPDATE_MARKED_DATES } from "../actions";
import { userRules } from "./userRulesReducer";
import moment from "moment";

export let markedDates = {};

export const updateMarkedDatesReducer = (state = markedDates, action) => {
  switch (action.type) {
    case UPDATE_MARKED_DATES:
      console.log(action);
      updateMarkedDatesLogic(action.date);
      return { ...state, data: markedDates };
    default:
      return state;
  }
};

function updateMarkedDatesLogic(date) {
  let obj = new Object();
  var d = new Date(date.getFullYear(), date.getMonth(), 1);
  console.log(d);
  while (d <= new Date(date.getFullYear(), date.getMonth(), 31)) {
    let binaryDay = Math.pow(2, d.getDay());
    if (userRules && userRules.length > 0) {
      if (IsFlagSet(userRules[0].days, binaryDay)) {
        let newDate = moment(d).format("YYYY-MM-DD");
        obj[newDate] = {
          marked: true,
          dotColor: "blue",
          activeOpacity: 0,
        };
      }
    }
    d.setDate(d.getDate() + 1);
  }
  markedDates = obj;
}

function IsFlagSet(value, flag) {
  return (value & flag) != 0;
}
