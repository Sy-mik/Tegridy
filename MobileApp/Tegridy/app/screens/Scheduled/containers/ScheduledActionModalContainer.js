import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CalendarActionComponent from "../components/calendarActionComponent";
import FetchPlants from "../../../store/FetchPlants";
import { useModalState } from "../../../hooks/useModalState";
import { ScheduledItemsFactory } from "../../../services/ScheduleItemFactory";
import PlantListComponent from "../../plant/PlantListComponent";
import { View, Text, Button, Modal } from "react-native";
import ScheduledItemModalContainer from "./scheduledItemModalContainer";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function ScheduleActionModalContainer({
  isOpen,
  onDismiss,
  scheduledDate,
  schedeuledItems,
  data,
}) {
  const [isScheduledModalOpen, setIsScheduledModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = React.useState();

  function openModal(item) {
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
    <View>
      <Modal
        presentationStyle="pageSheet"
        animationType="slide"
        transparent={false}
        visible={isOpen}
        onDismiss={() => {
          onDismiss();
        }}
        onRequestClose={() => {
          onDismiss();
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              padding: 10,
            }}
            onPress={() => {
              onDismiss();
            }}
          >
            <AntDesign name="closecircleo" size={35} color="black" />
          </TouchableOpacity>
          {/* <View
          style={{
            alignSelf: "center",
            margin: 15,
            backgroundColor: "lightgrey",
            width: 35,
            height: 5,
            borderRadius: 30,
          }}
        ></View> */}
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
        </View>
      </Modal>
    </View>
  );
}
