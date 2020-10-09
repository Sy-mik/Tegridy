import React from "react";
import { fetchRules, fetchScheduled, updateMarkedDates, updatePlant } from "./actions";
import { userPlants } from "./reducers/userPlantsReducer";

export default function  UpdatePlantDays(dispatch, value, setLoading) {
  let plant = userPlants.find((x) => x.id === value.plantId);
  if (plant) {
    console.log('NEW RULE');
    console.log(value);
    plant.rule = value;
    dispatch(updatePlant(plant));
    dispatch(fetchRules());
    dispatch(fetchScheduled());
    dispatch(updateMarkedDates(new Date()));
  }
  setLoading();
}
