import * as React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import {  InvokeAction } from "../../services/apiCalls";
import { RemoveScheduled } from "../../services/apiCalls";
import FetchScheduled from "../../store/FetchScheduled";
import { useDispatch } from "react-redux";

export default function ScheduledItemModal({ route, navigation }) {
  const { item } = route.params;
  const imageUri = item.imageUri;
  const itemName = item.name;
  const dispatch = useDispatch();

  function RemoveItem(auditId) {
    RemoveScheduled(auditId).then((res) => {
      FetchScheduled(dispatch);
      navigation.goBack();
    });
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.modalImage}
          resizeMode="cover"
          source={{ uri: imageUri }}
        ></Image>
        <View style={styles.informationsContainer}>
          <Text style={styles.title}>{itemName}</Text>
          <Text>Information:</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Button
          color="#808080"
          title="Remove"
          onPress={() => RemoveItem(item.auditId)}
        />
        <Button title="Start" onPress={() => InvokeAction(item.auditId)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  modalImage: {
    height: 300,
  },

  informationsContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: -20,
    padding: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
