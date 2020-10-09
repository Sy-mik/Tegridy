import React, { Component, useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  View,
  Button,
} from "react-native";
import DaysOfWeek from "../Scheduled/DaysOfWeek";
import ConfirmButton from "../../components/ConfirmButton";

export default function PlantWateringInfoComponent({
  amountOfWaterMilliliters,
  setValuesChanged,
  selectedDays,
  scheduleWatering,
  toggleModal,
  setSelectedDays,
}) {
  return (
    <View>
      <View style={{ alignItems: "flex-start", margin: 15 }}>
        <Button
          onPress={() => toggleModal()}
          title={"Water: " + amountOfWaterMilliliters + "ml"}
        ></Button>
      </View>

      <Text style={{ ...styles.secondaryText, marginLeft: 20 }}>
        Days of watering
      </Text>
      <View style={{ alignItems: "center" }}>
        <DaysOfWeek
          setSelectedDays={setSelectedDays}
          selectedDays={selectedDays}
          isVisible={true}
          setValuesChanged={setValuesChanged}
        ></DaysOfWeek>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#F5F5F5",
    width: "95%",
    margin: 5,
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: "black",
    // fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
