import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {
  GetSuggestedActionForPlant,
  AddPlantAction,
  GetScheduled,
  RemovePlant,
} from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { fetchScheduled } from "../../store/actions";
import { useNavigation } from "@react-navigation/native";
import ScheduledActionForm from "../Scheduled/ScheduledActionForm";
import ConfirmButton from "../../components/ConfirmButton";

export default function Plant({ route }) {
  const { plant } = route.params;
  const dispatch = useDispatch();

  const imageUri = plant.imageUri;
  const itemName = plant.name;
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [scheduledDate, setScheduledDate] = React.useState(new Date());
  const [selectedAction, setSelectedAction] = React.useState(0);
  const [
    amountOfWaterMilliliters,
    setAmountOfWaterMilliliters,
  ] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() => RemovePlant(plant.id).then((res) => FetchPlants())}
          style={{ margin: 10, fontSize: 18, fontWeight: "500" }}
        >
          Remove
        </Text>
      ),
    });
  }, []);

  async function FetchPlants() {
    await GetPlants()
      .then((res) => res.json())
      .then((res) => {
        dispatch(fetchPlants(res));
      });
  }

  React.useLayoutEffect(() => {
    async function fetchData() {
      await GetSuggestedActionForPlant(plant.id)
        .then((res) => res.json())
        .then((res) => {
          setAction(res);
          setAmountOfWaterMilliliters(res.amountOfWaterMilliliters);
          let date = new Date(res.scheduledDate);
          setScheduledDate(date);
        });
    }
    fetchData();
  }, []);

  function ScheduleWatering() {
    setLoading(true);
    action.scheduledDate = scheduledDate;
    action.amountOfWaterMilliliters = amountOfWaterMilliliters;
    // refresh Scheduled list
    AddPlant(action);

    async function AddPlant(action) {
      // You can await here
      setLoading(true);
      await AddPlantAction(action).then((res) => {
        setLoading(false);
        fetchData();
      });
    }

    function fetchData() {
      GetScheduled()
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          dispatch(fetchScheduled(res));
        });
    }
  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ScrollView>
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
          <ScheduledActionForm
            selectedAction={selectedAction}
            setSelectedAction={setSelectedAction}
            scheduledDate={scheduledDate}
            setScheduledDate={(value) => setScheduledDate(value)}
            amountOfWaterMilliliters={amountOfWaterMilliliters}
            setAmountOfWaterMilliliters={(value) => {
              setAmountOfWaterMilliliters(value);
            }}
            action={action}
          ></ScheduledActionForm>
        </View>
      </ScrollView>
      {selectedAction != 0 ? (
        <ConfirmButton
          loading={loading}
          onPress={() => {
            ScheduleWatering();
          }}
          text={"Schedule Action"}
        />
      ) : null}
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
