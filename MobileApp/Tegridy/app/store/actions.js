import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export const FETCH_SCHEDULED = "FETCH_SCHEDULED";

export const FETCH_PLANTS = "FETCH_PLANTS";

export const FETCH_RULES = "FETCH_RULES";

export const PUSH_SCHEDULED_FROM_RULES = "PUSH_SCHEDULED_FROM_RULES";

export const UPDATE_MARKED_DATES = "UPDATE_MARKED_DATES";

export const SET_IS_LOADING_TRUE = "SET_IS_LOADING_TRUE";

export const SET_IS_LOADING_FALSE = "SET_IS_LOADING_FALSE";

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

export const pushScheduledFromRules = (date) => ({
  type: PUSH_SCHEDULED_FROM_RULES,
  date,
});

export const updateMarkedDates = (date) => ({
  type: UPDATE_MARKED_DATES,
  date,
});

export const setIsLoadingTrue = () => ({
  type: SET_IS_LOADING_TRUE,
});


export const setIsLoadingFalse = () => ({
  type: SET_IS_LOADING_FALSE,
});