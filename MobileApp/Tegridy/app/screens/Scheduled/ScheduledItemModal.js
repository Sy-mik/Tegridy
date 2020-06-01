import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "../../components/DatePicker";
import {
  UpdatePlantActionDate,
  UpdatePlantActionStatus,
  RemoveScheduled,
} from "../../services/apiCalls";
import FetchScheduled from "../../store/FetchScheduled";
import { useDispatch } from "react-redux";

export default function ScheduledItemModal({
  item,
  isOpen,
  toggle,
  onDismiss,
}) {
  let name = "";
  let dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [visibleDate, setVisibleDate] = useState("");
  let newItem = item;

  useEffect(() => {
    if (item) {
      newItem = item;
      name = item.name;
      let d = new Date(item.scheduledDate);
      setDate(d);
      setVisibleDate(d.toDateString() + " " + d.toLocaleTimeString());
    }
  }, [item]);

  useEffect(() => {
    let d = date;
    setVisibleDate(d.toDateString() + " " + d.toLocaleTimeString());
  }, [date]);

  function openDatePicker() {
    toggle(false);
    setIsDatePickerOpen(true);
  }

  function saveDate() {
    toggle(true);
    setIsDatePickerOpen(false);
    UpdatePlantActionDate(item.id, date).then(() => {
      FetchScheduled(dispatch);
    });
  }
  function MarkAsDone() {
    UpdatePlantActionStatus(item.id).then(() => {
      FetchScheduled(dispatch);
      toggle(false);
    });
  }

  function RemoveItem() {
    RemoveScheduled(item.id).then(() => {
      FetchScheduled(dispatch);
      toggle(false);
    });
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
        transparent={true}
        // presentationStyle="pageSheet"
        visible={isOpen}
        onDismiss={() => {
          console.log("closin1");
          onDismiss();
        }} //
        onRequestClose={() => {
          console.log("closin2");
          onDismiss();
        }}
      >
        <View style={styles.centeredView}>
          <TouchableHighlight
            style={{ width: "100%" }}
            onPress={() => {
              toggle(false);
            }}
          >
            <View style={{ height: "100%" }}></View>
          </TouchableHighlight>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {newItem ? newItem.name : null}
            </Text>

            <TouchableHighlight
              onPress={() => {
                // toggle(false);
              }}
              style={{ ...styles.openButton }}
            >
              <Text style={{ ...styles.textStyle, color: "black" }}>
                Water: 100ml
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                openDatePicker();
              }}
              style={{ ...styles.openButton }}
            >
              <Text style={{ ...styles.textStyle, color: "black" }}>
                {visibleDate}
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                RemoveItem();
              }}
              style={{ ...styles.openButton }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.textStyle, flex: 1, color: "red" }}>
                  Remove
                </Text>
                <FontAwesome5 name="trash-alt" size={20} color="red" />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => MarkAsDone()}
              style={{ ...styles.openButton }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.textStyle, flex: 1 }}>
                  Mark as done
                </Text>
                <FontAwesome5 name="check" size={20} color="black" />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "black" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.textStyle, color: "white", flex: 1 }}>
                  Run
                </Text>
                <FontAwesome5 name="check" size={20} color="white" />
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
