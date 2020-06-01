import React, { useState, useEffect } from "react";
import { GetSuggestedActionForPlant } from "../../services/apiCalls";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import TextInputForm from "../../components/TextInputForm";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import ScheduleWateringModal from "./ScheduleWateringModal";
export default function ScheduledActionForm({
  plantId,
  scheduledDate,
  amountOfWaterMilliliters,
  disabled,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View>
      <ScheduleWateringModal
        plantId={plantId}
        isOpen={isModalOpen}
        toggle={setIsModalOpen}
        amountOfWaterMilliliters={amountOfWaterMilliliters}
        scheduledDate={scheduledDate}
      ></ScheduleWateringModal>

      <View style={{ margin: 10, width: "100%" }}>
        <Text style={{ fontSize: 30, fontWeight: "600" }}>Choose action</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (!disabled) {
            setIsModalOpen(true);
          } else {
            alert("Choose plant");
          }
        }}
        style={{ ...styles.openButton, alignSelf: "center" }}
      >
        <View style={{ alignContent: "center", flexDirection: "row" }}>
          <Text style={{ ...styles.textStyle, flex: 1, color: "black" }}>
            Watering
          </Text>
          <View>
            <MaterialCommunityIcons name="water" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    width: "100%",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F5F5F5",
    width: 300,
    margin: 5,
    padding: 10,
    borderRadius: 30,
  },
  textStyle: {
    color: "black",
    // fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
