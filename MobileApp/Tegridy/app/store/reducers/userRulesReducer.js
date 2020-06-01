import { FETCH_RULES } from "../actions";

export let userRules = { data: [] };

export const userRulesReducer = (state = userRules, action) => {
  switch (action.type) {
    case FETCH_RULES:
      userRules = action.data;
      return { ...state, data: userRules };
    default:
      return state;
  }
};