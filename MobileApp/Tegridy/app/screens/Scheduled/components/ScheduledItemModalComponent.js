import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ScheduledItemModalComponent({
  isOpen,
  onDismiss,
  newItem,
  visibleDate,
  markAsDone,
  openDatePicker,
}) {
  let image = "";
  if (newItem) {
    image =
      newItem !== null && newItem.imageName
        ? webApiUri + "images/" + newItem.imageName
        : newItem.imageUri;
  }
  console.log(newItem);
  return (
    <View style={{ height: 0 }}>
      <Modal
        presentationStyle="pageSheet"
        animationType="slide"
        visible={isOpen}
        onDismiss={() => {
          onDismiss();
        }}
        onRequestClose={() => {
          onDismiss();
        }}
      >
        <View style={styles.centeredView}>
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
          <Image
            style={{
              borderRadius: 20,
              width: 200,
              height: 200,
            }}
            source={{
              uri: image,
            }}
          ></Image>

          <Text style={styles.modalText}>{newItem ? newItem.name : null}</Text>

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
            onPress={() => markAsDone()}
            style={{ ...styles.openButton }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ ...styles.textStyle, flex: 1 }}>Mark as done</Text>
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
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
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
