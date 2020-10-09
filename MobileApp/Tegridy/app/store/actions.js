import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

export const FETCH_SCHEDULED = "FETCH_SCHEDULED";

export const FETCH_PLANTS = "FETCH_PLANTS";

export const FETCH_RULES = "FETCH_RULES";

export const ADD_PLANT = "ADD_PLANT";

export const UPDATE_PLANT = "UPDATE_PLANT";

export const IS_CONNECTED_TO_SERVER = "IS_CONNECTED_TO_SERVER";

export const SET_IS_CONNECTED_TO_SERVER = "SET_IS_CONNECTED_TO_SERVER";

export const PUSH_SCHEDULED_FROM_RULES = "PUSH_SCHEDULED_FROM_RULES";

export const UPDATE_MARKED_DATES = "UPDATE_MARKED_DATES";

export const SET_IS_LOADING_TRUE = "SET_IS_LOADING_TRUE";

export const SET_IS_LOADING_FALSE = "SET_IS_LOADING_FALSE";

export const isConnectedToServer = (value) => ({
  type: IS_CONNECTED_TO_SERVER,
  value,
});

export const addPlant = (value) => ({
  type: ADD_PLANT,
  value,
});

export const updatePlant = (value) => ({
  type: UPDATE_PLANT,
  value,
});

export const setIsConnectedToServer = (value) => ({
  type: SET_IS_CONNECTED_TO_SERVER,
  value,
});

export const fetchScheduled = () => ({
  type: FETCH_SCHEDULED,
});

export const fetchPlants = (data) => ({
  type: FETCH_PLANTS,
  data,
});

export const fetchRules = () => ({
  type: FETCH_RULES,
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
