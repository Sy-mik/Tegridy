import React from "react";
import {
  fetchRules,
  fetchScheduled,
  removePlant,
  updateMarkedDates,
  updatePlant,
} from "./actions";
import { userPlants } from "./reducers/userPlantsReducer";

export default function RemovePlant(dispatch, plantId) {
  dispatch(removePlant(plantId));
  dispatch(fetchRules());
  dispatch(fetchScheduled());
  dispatch(updateMarkedDates(new Date()));
}
