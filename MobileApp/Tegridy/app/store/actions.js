import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export const FETCH_SCHEDULED = "FETCH_SCHEDULED";

export const FETCH_PLANTS = "FETCH_PLANTS";

export const FETCH_RULES = "FETCH_RULES";

export const IMPORT_SCHEDULED_FROM_RULES = "IMPORT_SCHEDULED_FROM_RULES";

export const UPDATE_MARKED_DATES = "UPDATE_MARKED_DATES";
export const fetchScheduled = (data) => ({
  type: FETCH_SCHEDULED,
  data,
});

export const fetchPlants = (data) => ({
  type: FETCH_PLANTS,
  data,
});

export const fetchRules = (data) => ({
  type: FETCH_RULES,
  data,
});

export const importScheduledFromRules = (month) => ({
  type: IMPORT_SCHEDULED_FROM_RULES,
  month,
});

export const updateMarkedDates = (month) => ({
  type: UPDATE_MARKED_DATES,
  month,
});
