import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker({
  isOpen,
  date,
  onSave,
  onCancel,
  onSetDate,
}) {
  let oldDate = date;
  const onChange = (event, selectedDate) => { //
    const currentDate = selectedDate || date;
    onSetDate(currentDate);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <View style={styles.centeredView}>
          <TouchableHighlight
            style={{ width: "100%" }}
            onPress={() => {
              onCancel(false);
            }}
          >
            <View style={{ height: "100%" }}></View>
          </TouchableHighlight>
          <View style={{ ...styles.modalView, width: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignContent: "space-between",
              }}
            >
              <View
                style={{ flex: 1, alignItems: "flex-start", marginRight: 20 }}
              >
                <Button
                  onPress={() => {
                    onSetDate(oldDate);
                    onCancel();
                  }}
                  color="gray"
                  title="Cancel"
                ></Button>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end", marginLeft: 20 }}>
                <Button onPress={() => onSave()} title="Save"></Button>
              </View>
            </View>
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={"datetime"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
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
    padding: 10,
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
});
