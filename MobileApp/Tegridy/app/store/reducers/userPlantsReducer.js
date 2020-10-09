import AsyncStorage from "@react-native-community/async-storage";
import { FETCH_PLANTS, ADD_PLANT, UPDATE_PLANT } from "../actions";

export let userPlants = { data: [] };

export const userPlantsReducer = (state = userPlants, action) => {
  switch (action.type) {
    case ADD_PLANT:
      userPlants.push(action.value);
      storeDataPlants(userPlants);
      return { ...state, data: userPlants };
    case UPDATE_PLANT:
      const index = userPlants.findIndex((x) => x.id === action.value.id);
      if (index >= 0) {
        let plants = userPlants;
        plants[index] = action.value;
        userPlants = plants;
      }
      // SAVE IT HERE
      storeDataPlants(userPlants);
      return { ...state, data: userPlants };
    case FETCH_PLANTS: //
      userPlants = action.data;
      return { ...state, data: userPlants };
    default:
      return state;
  }
};

function storeDataPlants(plants) {
  try {
    // console.log('savedPlants not found')
    storeData("@Tegridy_User_Plants", JSON.stringify(plants));
  } catch (e) {
    console.log("CANT STORE");
    console.log(e);
  }
}

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("ERROR");
    console.log(e);
  }
};
