import { FETCH_PLANTS, FETCH_RULES, UPDATE_MARKED_DATES } from "../actions";
import moment from "moment";
import { userPlants } from "./userPlantsReducer";

export let markedDates = {};
export let userRules = { data: [] };

export const updateMarkedDatesReducer = (state = markedDates, action) => {
  switch (action.type) {
    case FETCH_RULES:
      userRules = userPlants.map((x) => x.rule);
      console.log("RULES");
      console.log(userRules);
      return { ...state, data: markedDates };
    case UPDATE_MARKED_DATES:
      updateMarkedDatesLogic(action.date);
      return { ...state, data: markedDates };
    default:
      return state;
  }
};

function updateMarkedDatesLogic(date) {
  let obj = new Object();
  var d = new Date(date.getFullYear(), date.getMonth(), 1);
  while (d <= new Date(date.getFullYear(), date.getMonth(), 31)) {
    let binaryDay = Math.pow(2, d.getDay());
    if (userPlants && userRules.length > 0) {
      userRules.forEach(x=>{
        if (IsFlagSet(x.days, binaryDay)) {
          let newDate = moment(d).format("YYYY-MM-DD");
          obj[newDate] = {
            marked: true,
            dotColor: "blue",
            activeOpacity: 0,
          };
        }
      });
      
    }
    d.setDate(d.getDate() + 1);
  }
  markedDates = obj;
}

function IsFlagSet(value, flag) {
  return (value & flag) != 0;
}
