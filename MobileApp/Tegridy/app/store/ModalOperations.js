import { closeOperationModal, openOperationModal } from "./actions";

export function  OpenOperationsModal(dispatch, value) {
    dispatch(openOperationModal(value));
}

export function  CloseOperationsModal(dispatch, value) {
    dispatch(closeOperationModal(value));
}
