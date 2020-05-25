import React from "react";
import { fetchScheduled, updateMarkedDates } from "./actions";
import { GetScheduled } from "../services/apiCalls";

export default function FetchScheduled(dispatch) {
  async function fetchData() {
    await GetScheduled()
      .then((res) => res.json())
      .then((res) => {
        console.log('fetched');
        dispatch(fetchScheduled(res));
      });
  }
  return fetchData();
}
