import * as React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function ConfirmButton({ text, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.acceptButtonColor,
    padding: 10,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
});
