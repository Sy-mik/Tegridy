import { FETCH_SCHEDULED, PUSH_SCHEDULED_FROM_RULES } from "../actions";
import { userPlants } from "./userPlantsReducer";
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
  date = new Date(date);
  let nextRulesPeriod = new Date(date);
  nextRulesPeriod.setDate(date.getDate() + 14);
  var d = new Date(date);
  d.setDate(d.getDate() + 1);
  while (d <= nextRulesPeriod) {
    userPlants.forEach((element) => {
      let binaryDay = Math.pow(2, d.getDay());
      if (IsFlagSet(element.rule.days, binaryDay)) {
        let item = createNewScheduledItem(element, d);
        scheduledItems.push(item);
      }
    });
    d.setDate(d.getDate() + 1);
  }
}
// TODO use typescript plz
function createNewScheduledItem(plant, d) {
  let scheduled = new Object();
  scheduled.scheduledDate = new Date(d);
  scheduled.plantId = plant.id;
  scheduled.executionDate = null;
  scheduled.imageUri = plant.imageUri;
  scheduled.imageName = plant.imageName;
  scheduled.amountOfWaterMilliliters = plant.wateringInMililiters;
  scheduled.name = plant.name;

  return scheduled;
}

function IsFlagSet(value, flag) {
  return (value & flag) != 0;
}
