import React from "react";
import {
  closeOperationModal,
  fetchRules,
  fetchScheduled,
  openOperationModal,
  updateMarkedDates,
  updatePlant,
} from "./actions";
import { Plant } from "./AddPlant";
import { userPlants } from "./reducers/userPlantsReducer";

export default function UpdatePlantDays(dispatch, value, setLoading) {
  let plant: Plant = userPlants.find((x) => x.id === value.plantId);
  if (plant) {
    plant.rule = value;
    dispatch(openOperationModal(value));
    dispatch(updatePlant(plant));
    dispatch(fetchRules());
    dispatch(fetchScheduled());
    dispatch(updateMarkedDates(new Date()));
    dispatch(closeOperationModal(false));
  }
  setLoading();
}
