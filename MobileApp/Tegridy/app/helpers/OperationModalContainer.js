import React, { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
// @ts-ignore
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";

export default function OperationModalContainer() {
  const data = useSelector((state) => state.operationsModalReduce);
  const [isOpen, setIsOpen] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const val = data.isOpen;
    if (val) {
      setIsOpen(val);
      setIsLoading(true);
    } else if (val == false) {
      setIsOpen(true);
      setIsLoading(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }, [data]);
  return (
    <Modal
      testID={"modal"}
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      style={styles.view}
    >
      <View
        style={{
          height: 300,
          backgroundColor: "white",
          justifyContent: "center",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderTopStartRadius: 25,
        }}
      >
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" />
            <Text style={{ alignSelf: "center" }}>Loading</Text>
          </View>
        ) : (
          <View>
            <AntDesign
              style={{ alignSelf: "center", margin: 20 }}
              name="checkcircleo"
              size={80}
              color="#4BB543"
            />
            <Text style={{ alignSelf: "center", fontSize: 25 }}>
              Value Updated
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
