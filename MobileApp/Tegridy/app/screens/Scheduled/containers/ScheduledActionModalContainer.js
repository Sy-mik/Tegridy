import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CalendarActionComponent from "../components/calendarActionComponent";
import FetchPlants from "../../../store/FetchPlants";
import { useModalState } from "../../../hooks/useModalState";
import { ScheduledItemsFactory } from "../../../services/ScheduleItemFactory";
import PlantListComponent from "../../plant/PlantListComponent";
import { View, Modal, Text } from "react-native";
import ScheduledItemModalContainer from "./scheduledItemModalContainer";

export default function ScheduleActionModalContainer({
  isOpen,
  onDismiss,
  scheduledDate,
  schedeuledItems,
  data,
  openModal,
}) {
  const [isScheduledModalOpen, setIsScheduledModalOpen] = useModalState(false);
  const [selectedItem, setSelectedItem] = React.useState();

  function openModal(item) {
    console.log("OPENING MODAL");
    console.log(item);
    setSelectedItem(item);
    setIsScheduledModalOpen(true);
  }

  function openModalMappingFromPlant(item) {
    let itemFactory = new ScheduledItemsFactory();
    var item = itemFactory.CreateNewScheduledItem(item, scheduledDate);
    setSelectedItem(item);
    setIsScheduledModalOpen(true);
  }

  return (
    <View style={{ height: 0 }}>
      <Modal
        presentationStyle="pageSheet"
        animationType="slide"
        transparent={false}
        onDismiss={() => {
          onDismiss();
        }}
        onRequestClose={() => {
          onDismiss();
        }}
        visible={isOpen}
      >
        <CalendarActionComponent
          isOpen={isOpen}
          onDismiss={onDismiss}
          scheduledDate={scheduledDate}
          schedeuledItems={schedeuledItems}
          openModal={openModal}
        ></CalendarActionComponent>

        <Text style={{ fontSize: 30, margin: 10, fontWeight: "600" }}>
          All plants
        </Text>

        <PlantListComponent
          refreshing={false}
          onRefresh={() => {}}
          data={data}
          onPressItem={openModalMappingFromPlant}
        ></PlantListComponent>

        <ScheduledItemModalContainer
          isModalOpen={isScheduledModalOpen}
          setIsModalOpen={setIsScheduledModalOpen}
          selectedModalItem={selectedItem}
        ></ScheduledItemModalContainer>
      </Modal>
    </View>
  );
}
