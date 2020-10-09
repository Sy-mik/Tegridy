import React from "react";
import { View, Text, Modal } from "react-native";
import ScheduledItemsListComponent from "./ScheduledItemsListComponent";

export default function CalendarActionComponent({
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
          dayOfTheAction={""}
          monthOfTheAction={""}
          onScrollScheduledItems={()=>{}}
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
