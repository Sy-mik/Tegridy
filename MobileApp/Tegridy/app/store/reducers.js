import { combineReducers } from 'redux';

import { DATA_AVAILABLE, FETCH_SCHEDULED, FETCH_PLANTS } from "./actions" //Import the actions types constant we defined in our actions

let dataState = { data: [] };
let userPlants = {data: [] };

const scheduledDataReducer = (state = dataState, action) => {
    switch (action.type) {
        case FETCH_SCHEDULED:
            return {...state, data: action.data};
        default:
            return state;
    }
};

const userPlantsReducer = (state = userPlants, action) => {
    switch (action.type) {
        case FETCH_PLANTS:
            return {...state, data: action.data};
        default:
            return state;
    }
};
// Combine all the reducers
const rootReducer = combineReducers({
    scheduledDataReducer: scheduledDataReducer,
    userPlantsReducer: userPlantsReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;
