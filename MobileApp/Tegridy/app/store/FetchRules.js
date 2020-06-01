import React from "react";
import {
  fetchRules,
  importScheduledFromRules,
  updateMarkedDates,
} from "./actions";
import { GetRules } from "../services/apiCalls";

export default function FetchRules(dispatch) {
  async function fetchData() {
    await GetRules()
      .then((res) => res.json())
      .then((res) => {
        dispatch(fetchRules(res));
        dispatch(updateMarkedDates(new Date()));
      });
  }
  return fetchData();
}
