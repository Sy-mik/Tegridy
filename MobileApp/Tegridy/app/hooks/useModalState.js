import React, { useEffect } from "react";

export const useModalState = (initialState) => {
  const [modalVisible, setModalVisible] = React.useState(initialState);
  const [forceModalVisible, setForceModalVisible] = React.useState(false);

  const setModal = (modalState) => {
    if (modalState && modalVisible) {
      setForceModalVisible(true);
    }
    setModalVisible(modalState);
  };

  useEffect(() => {
    if (forceModalVisible && modalVisible) {
      setModalVisible(false);
    }
    if (forceModalVisible && !modalVisible) {
      setForceModalVisible(false);
      setModalVisible(true);
    }
  }, [forceModalVisible, modalVisible]);

  return [modalVisible, setModal];
};
