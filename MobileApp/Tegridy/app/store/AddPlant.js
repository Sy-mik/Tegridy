import React from "react";
import { addPlant, updatePlant } from "./actions";
import { GetRules } from "../services/apiCalls";

export function AddPlant(dispatch, value, image) {
  console.log('Adding plant');
  console.log(value);
  dispatch(addPlant(value));
  storeData(value.imageName, image);
  setLoading(false);
}

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};
