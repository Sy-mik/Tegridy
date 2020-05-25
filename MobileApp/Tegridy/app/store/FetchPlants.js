import React from "react";
import { fetchPlants } from "./actions";
import { GetPlants } from "../services/apiCalls";

export default function FetchPlants(dispatch) {
  async function fetchData() {
    await GetPlants()
      .then((res) => res.json())
      .then((res) => {
        dispatch(fetchPlants(res));
      });
  }
  return fetchData();
}
