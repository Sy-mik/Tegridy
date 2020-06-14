import React from "react";
import { View, Text, Modal } from "react-native";
import ScheduledActionForm from "../ScheduledActionForm";
import PlantTypeList from "../../addPlantForm/PlantTypeList";
import ScheduledItemsListContainer from "../containers/scheduledItemsListContainer";
import ScheduledItemsListComponent from "./ScheduledItemsListComponent";
import PlantList from "../../PlantList";
import PlantListComponent from "../../plant/PlantListComponent";

export default function CalendarActionComponent({
  isOpen,
  onDismiss,
  scheduledDate,
  schedeuledItems,
  openModal
}) {
  return (
    <View>
        <View
          style={{
            alignSelf: "center",
            margin: 15,
            backgroundColor: "lightgrey",
            width: 35,
            height: 5,
            borderRadius: 30,
          }}
        ></View>
        <Text
          style={{
            fontSize: 40,
            alignSelf: "center",
            margin: 10,
            fontWeight: "bold",
          }}
        >
          {new Date(scheduledDate).toDateString()}
        </Text>
        <Text style={{ fontSize: 30, marginLeft: 10, fontWeight: "600" }}>
          Planned
        </Text>
        <ScheduledItemsListComponent
          openModal={openModal}
          data={schedeuledItems}
        ></ScheduledItemsListComponent>

        {/* 
        <View style={{ height: 200 }}>
          <PlantTypeList
            list={data}
            selected={selected}
            onSelectItem={selectItem}
          ></PlantTypeList>
        </View>
        <View style={{ flex: 1 }}>
          <ScheduledActionForm
            plantId={selectedPlantId}
            disabled={selected == -1}
            style={{ height: 400 }}
            scheduledDate={scheduledDate}
            amountOfWaterMilliliters={amountOfWaterMilliliters}
          ></ScheduledActionForm>
        </View> */}
    </View>
  );
}
