import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

export default function ({ label, value, keyboardType, setValue }) {
  return (
    <View >
      <Text style={styles.inputLabel}>{label}</Text>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          width: "100%",
        }}
      >
        <TextInput
          style={styles.textInputField}
          onChangeText={(text) => setValue(text)}
          value={value}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    margin: 2,
    color: "#808080",
  },
  textInputField: {
    height: 40,
    width: "100%",
    borderColor: "white",
    fontSize: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 20,
  },
});
