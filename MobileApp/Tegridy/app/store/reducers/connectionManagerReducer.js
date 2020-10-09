import { IS_CONNECTED_TO_SERVER, SET_IS_CONNECTED_TO_SERVER } from "../actions";

export let isConnectedToServer = false;

export const connectionManagerReducer = (state = isConnectedToServer, action) => {
  
  switch (action.type) {
    case IS_CONNECTED_TO_SERVER:
      return { ...state, data: isConnectedToServer };
    case SET_IS_CONNECTED_TO_SERVER:
      isConnectedToServer = action.value;
      return { ...state, data: isConnectedToServer };
    default:
      return state;
  }
};
