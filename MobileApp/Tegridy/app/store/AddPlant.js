import React from "react";
import { addPlant, updatePlant } from "./actions";
import { GetRules } from "../services/apiCalls";

export function AddPlant(dispatch, value) {
  dispatch(addPlant(value));
}

