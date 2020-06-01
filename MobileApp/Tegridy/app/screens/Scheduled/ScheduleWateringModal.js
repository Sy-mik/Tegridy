import React, { Component, useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import DatePicker from "../../components/DatePicker";
import { AddPlantAction } from "../../services/apiCalls";
import FetchScheduled from "../../store/FetchScheduled";
import { useDispatch } from "react-redux";
import { DefaultButton } from "../../components/DefaultButton";
import DaysOfWeek from "./DaysOfWeek";
import InputDialog from "./InputDialog";

export default function ScheduleWateringModal({
  plantId,
  scheduledDate,
  amountOfWaterMilliliters,
  isOpen,
  toggle,
}) {
  let dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [visibleDate, setVisibleDate] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [waterInMililiters, setWaterInMilililiter] = useState(11);
  const [selectedDays, setSelectedDays] = useState(0);

  useEffect(() => {
    setWaterInMilililiter(amountOfWaterMilliliters);
    let d = new Date(scheduledDate);
    setDate(d);
    setVisibleDate(d.toDateString() + " " + d.toLocaleTimeString());
  }, []);

  function openDatePicker() {
    toggle(false);
    setIsDatePickerOpen(true);
  }

  function addAction() {
    let action = {
      plantId: plantId,
      days: selectedDays,
      scheduledDate: scheduledDate,
      amountOfWaterMilliliters: new Number(waterInMililiters),
    };
    AddPlantAction(action).then(() => {
      FetchScheduled(dispatch);
      toggle(false);
    });
  }

  function saveDate() {
    toggle(true);
    setIsDatePickerOpen(false);
  }

  return (
    <View style={{ ...styles.centeredView }}>
      <DatePicker
        date={date}
        onSetDate={setDate}
        onCancel={() => {
          toggle(true);
          setIsDatePickerOpen(false);
        }}
        onSave={saveDate}
        isOpen={isDatePickerOpen}
      ></DatePicker>

      <Modal
        animationType="slide"
        hardwareAccelerated={true}
        transparent={true}
        visible={isOpen}
      >
        <View style={styles.centeredView}>
          {/* Area above modal */}
          <TouchableHighlight
            style={{ width: "100%" }}
            onPress={() => {
              toggle(false);
            }}
          >
            <View style={{ height: "100%" }}></View>
          </TouchableHighlight>

          <InputDialog
            isAlertOpen={isAlertOpen}
            setIsAlertOpen={setIsAlertOpen}
            setWaterInMilililiter={setWaterInMilililiter}
          ></InputDialog>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>Schedule Watering </Text>
            <DefaultButton
              text={"water: " + amountOfWaterMilliliters + "ml"}
              onPress={() => setIsAlertOpen(true)}
            ></DefaultButton>
            {selectedDays > 0 ? null : (
              <DefaultButton
                text={visibleDate}
                onPress={() => openDatePicker()}
              ></DefaultButton>
            )}

            <DaysOfWeek
              setSelectedDays={setSelectedDays}
              selectedDays={selectedDays}
            ></DaysOfWeek>

            <TouchableHighlight
              onPress={() => addAction()}
              style={{ ...styles.openButton, backgroundColor: "black" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.textStyle, color: "white", flex: 1 }}>
                  Add
                </Text>
                <Entypo name="plus" size={24} color="white" />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
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
  modalText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
