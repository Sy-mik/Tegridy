import { FETCH_PLANTS } from "../actions";

export let userPlants = { data: [] };

export const userPlantsReducer = (state = userPlants, action) => {
  switch (action.type) {
    case FETCH_PLANTS:
      userPlants = action.data;
      return { ...state, data: userPlants };
    default:
      return state;
  }
};
