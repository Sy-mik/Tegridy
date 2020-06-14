import { FETCH_SCHEDULED, PUSH_SCHEDULED_FROM_RULES } from "../actions";
import { userPlants } from "./userPlantsReducer";
import { ScheduledItemsFactory } from "../../services/ScheduleItemFactory";
let scheduledItems = { data: [] };

export const scheduledDataReducer = (state = scheduledItems, action) => {
  switch (action.type) {
    case FETCH_SCHEDULED:
      scheduledItems = action.data;
      return { ...state, data: scheduledItems };
    case PUSH_SCHEDULED_FROM_RULES:
      isLoading = true;
      executePushScheduledFromRules(action.date);
      isLoading = false;
      return { ...state, data: scheduledItems };
    default:
      return state;
  }
};

function executePushScheduledFromRules(date) {
  const itemFactory = new ScheduledItemsFactory();

  date = new Date(date);
  let nextRulesPeriod = new Date(date);
  nextRulesPeriod.setDate(date.getDate() + 14);
  var d = new Date(date);
  d.setDate(d.getDate() + 1);
  while (d <= nextRulesPeriod) {
    userPlants.forEach((element) => {
      let binaryDay = Math.pow(2, d.getDay());
      if (IsFlagSet(element.rule.days, binaryDay)) {
        let item = itemFactory.CreateNewScheduledItem(element, d);
        scheduledItems.push(item);
      }
    });
    d.setDate(d.getDate() + 1);
  }

  scheduledItems.sort(function (a, b) {
    var dateA = new Date(a.release),
      dateB = new Date(b.release);
    return dateA - dateB;
  });
}

function IsFlagSet(value, flag) {
  return (value & flag) != 0;
}
