import React from "react";
import { fetchScheduled, fetchPlants } from "./actions";
import { GetPlants } from "../services/apiCalls";

export default function FetchPlants(dispatch) {
    async function fetchData() {
        // You can await here
        await GetPlants()
          .then((res) => res.json())
          .then((res) => dispatch(fetchPlants(res)));
      }
      fetchData();
}