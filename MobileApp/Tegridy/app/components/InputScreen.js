import React, { useState, useEffect } from "react";

import { View, Modal, StyleSheet, Text } from "react-native";
import TextInputForm from "./TextInputForm";
import ConfirmButton from "./ConfirmButton";
import { TextInput } from "react-native-gesture-handler";

export default function InputScreenModal({
  text,
  value,
  setValue,
  isOpen,
  toggle,
  keyboardType,
}) {
  const [tempValue, setTempValue] = useState("");
  useEffect(() => {
    setTempValue(value.toString());
  }, [value]);

  return (
    <Modal
      presentationStyle="pageSheet"
      animationType="slide"
      onDismiss={() => {
        toggle();
      }}
      onRequestClose={() => {
        toggle();
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
      <View
        style={{
          margin: 20,
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: 40 }}>{text}</Text>
        <View style={{ flexDirection: "row"}}>
          <TextInput
            style={styles.textInputField}
            onChangeText={(text) => setTempValue(text)}
            autoFocus={true}
            value={tempValue}
            keyboardType="numeric"
          />

          <Text style={{ fontSize: 40 }}>ml</Text>
        </View>
      </View>
      <ConfirmButton
        onPress={() => {
          setValue(tempValue);
          toggle();
        }}
        text="Accept"
      ></ConfirmButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    margin: 2,
    color: "#808080",
  },
  textInputField: {
    height: 40,
    fontSize: 40,
  },
});
