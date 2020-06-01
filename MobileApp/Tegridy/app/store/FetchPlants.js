import React from "react";
import { fetchPlants, setIsLoadingTrue, setIsLoadingFalse } from "./actions";
import { GetPlants } from "../services/apiCalls";

export default function FetchPlants(dispatch) {
  setIsLoadingTrue();
  async function fetchData() {
    await GetPlants()
      .then((res) => res.json())
      .then((res) => {
        dispatch(fetchPlants(res));
      });
  }
  return fetchData();
}
