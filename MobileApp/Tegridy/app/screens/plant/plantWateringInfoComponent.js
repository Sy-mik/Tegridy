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
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function PlantWateringInfoComponent({
  amountOfWaterMilliliters,
  setValuesChanged,
  selectedDays,
  scheduleWatering,
  isEditing,
  plantName,
  setSelectedDays,
}) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  return (
    <>
      <View
        style={{
          alignItems: "flex-start",
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <Text style={styles.title}>{plantName}</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            width: "100%",
          }}
        />
        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {/* <Text style={{ fontSize: 25 }}>Watering</Text> */}
          <Ionicons name="ios-water" size={24} color="black" />
          <Text style={{ fontSize: 25 }}> {amountOfWaterMilliliters}ml</Text>
        </View>
        {/* <Button
          onPress={() => toggleModal()}
          title={"Water: " + amountOfWaterMilliliters + "ml"}
        ></Button> */}
      </View>

      <Text style={{ ...styles.secondaryText, marginLeft: 15, paddingTop: 20 }}>
        Days of watering
      </Text>
      <View style={{ alignItems: "center" }}>
        <DaysOfWeek
          setSelectedDays={setSelectedDays}
          selectedDays={selectedDays}
          isEditing={isEditing}
          setValuesChanged={setValuesChanged}
        ></DaysOfWeek>
      </View>
      <Button
        title="Show Date Picker"
        onPress={() => setIsDatePickerVisible(true)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        isDarkModeEnabled={false}
        // onConfirm={handleConfirm}
        onCancel={() => setIsDatePickerVisible(false)}
      />
    </>
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
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
});
