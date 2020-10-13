import { CLOSE_OPERATION_MODAL, OPEN_OPERATION_MODAL } from "../actions";

export let isOpen = false;

export const operationsModalReducer = (state = isOpen, action) => {
  switch (action.type) {
    case OPEN_OPERATION_MODAL:
      isOpen = true;
      return { ...state, isOpen };
    case CLOSE_OPERATION_MODAL:
      isOpen = false;
      return { ...state, isOpen };
    default:
      return state;
  }
};
