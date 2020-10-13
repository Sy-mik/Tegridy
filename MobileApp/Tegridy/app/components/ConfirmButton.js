import * as React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Haptics from "expo-haptics";

import Colors from "../constants/Colors";

export default function ConfirmButton({ text, onPress, loading }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    >
      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator size="small" color="white"></ActivityIndicator>
        ) : (
          <Text style={styles.buttonText}>{text}</Text>
        )}
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
