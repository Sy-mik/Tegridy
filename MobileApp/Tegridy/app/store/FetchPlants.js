import React from "react";
import { fetchPlants, fetchRules, fetchScheduled, isConnectedToServer, pushScheduledFromRules, updateMarkedDates } from "./actions";
import { GetPlants } from "../services/apiCalls";
import AsyncStorage from "@react-native-community/async-storage";
import defaultPlants from "../../assets/plants.json";
import { userPlants } from "./reducers/userPlantsReducer";

async function fetchData(dispatch) {
  await GetPlants()
    .then((res) => res.json())
    .then((res) => {
      dispatch(fetchPlants(res));
    });
}

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log("Could not read data");
    console.log(e);
  }
};

export default function FetchPlants(dispatch) {
  let isConnected = dispatch(isConnectedToServer(false));
  if (!isConnected.value) {
    if (userPlants.length > 0 || userPlants.data?.length > 0) {
      return userPlants;
    }
    try {
      console.log("loading plants");
      loadPlantsFromLocal(dispatch); //
    } catch (e) {
      console.log("problem loading local data");
      console.log(e);
    }
  } else {
    return fetchData(dispatch);
  }
}
function loadPlantsFromLocal(dispatch) {
  let plants;

  const data = getData("@Tegridy_User_Plants");
  data.then((savedPlants) => {
    try {
      if (!savedPlants) {
        // console.log('savedPlants not found')
        plants = defaultPlants;
        storeData("@Tegridy_User_Plants", JSON.stringify(plants));
      } else {
        // console.log('Saved plants loading success')
        plants = savedPlants;
      }
    } catch {
      storeData("@Tegridy_User_Plants", JSON.stringify(defaultPlants));
    }
    plants = JSON.parse(plants);
    dispatch(fetchPlants(plants));
    dispatch(fetchScheduled());
    dispatch(fetchRules());
    dispatch(updateMarkedDates(new Date()));
  });
}
