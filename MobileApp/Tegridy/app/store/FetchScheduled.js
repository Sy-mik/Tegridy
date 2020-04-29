import React from "react";
import { fetchScheduled } from "./actions";
import { GetScheduled } from "../services/apiCalls";

export default function FetchScheduled(dispatch) {
    async function fetchData() {
        // You can await here
        await GetScheduled()
          .then((res) => res.json())
          .then((res) => dispatch(fetchScheduled(res)));
      }
      fetchData();
}