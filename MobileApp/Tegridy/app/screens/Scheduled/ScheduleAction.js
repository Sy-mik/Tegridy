import React, { useEffect } from "react";
import { View, Text, Modal } from "react-native";
import ScheduledActionForm from "./ScheduledActionForm";
import { useSelector, useDispatch } from "react-redux";
import FetchPlants from "../../store/FetchPlants";
import PlantTypeList from "../addPlantForm/PlantTypeList";

export default function ScheduleAction({ isOpen, onDismiss, scheduledDate }) {
  const [selected, setSelected] = React.useState(-1);
  const dispatch = useDispatch();
  const dataReducer = useSelector((state) => state.userPlantsReducer);
  const [selectedPlantId, setSelectedPlantId] = React.useState(0);
  const { data } = dataReducer;

  function selectItem(id) {
    setSelected(id);
    setSelectedPlantId(id);
  }

  const [
    amountOfWaterMilliliters,
    setAmountOfWaterMilliliters,
  ] = React.useState(""); //

  useEffect(() => {
    if (data.length == 0) {
      FetchPlants(dispatch);
    }
  }, []);

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

        <Text style={{ fontSize: 30, margin: 10, fontWeight: "600" }}>
          Choose plant
        </Text>

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
        </View>
      </Modal>
    </View>
  );
}
