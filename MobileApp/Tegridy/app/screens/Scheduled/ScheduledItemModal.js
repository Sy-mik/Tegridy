import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { InvokeAction } from "../../services/apiCalls";
import { RemoveScheduled } from "../../services/apiCalls";
import FetchScheduled from "../../store/FetchScheduled";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import ConfirmButton from "../../components/ConfirmButton";

export default function ScheduledItemModal({ route, navigation }) {
  const { item } = route.params;
  const imageUri = item.imageUri;
  const itemName = item.name;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(item.scheduledDate);
  let convertedDate =
    weekday[date.getDay()] + " " + date.getHours() + ":" + date.getMinutes();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() => RemoveItem(item.id)}
          style={{ margin: 10, fontSize: 18, fontWeight: "500" }}
        >
          Remove
        </Text>
      ),
    });
  }, []);

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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "space-between",
            }}
          >
            <Text style={styles.title}>{itemName}</Text>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                alignContent: "flex-end",
              }}
            >
              <Feather
                size={20}
                // color="white"
                name="cloud-drizzle"
              />
            </View>
          </View>
          <View style={{ flex: 5 }}>
            <Text style={{ fontSize: 16 }}>{convertedDate}</Text>
          </View>
        </View>
      </View>

      <ConfirmButton
        loading={loading}
        text={"Confirm"}
        onPress={() => {
          setLoading(true);
          InvokeAction(item.auditId);
        }}
      ></ConfirmButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  modalImage: {
    height: 300,
  },

  informationsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: -20,
    padding: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    flex: 1,
    margin: 5,
    fontSize: 30,
    fontWeight: "bold",
  },
});
