import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {
  GetSuggestedActionForPlant,
  AddPlantAction,
  GetScheduled,
  RemovePlant,
  webApiUri,
} from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { fetchScheduled } from "../../store/actions";
import { useNavigation } from "@react-navigation/native";
import ScheduledActionForm from "../Scheduled/ScheduledActionForm";
import ConfirmButton from "../../components/ConfirmButton";

export default function Plant({ route }) {
  const { plant } = route.params;
  const dispatch = useDispatch();
  const imageUri = plant.imageName
    ? webApiUri + "images/" + plant.imageName
    : plant.imageUri;

  const itemName = plant.name;
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [action, setAction] = React.useState();
  const [scheduledDate, setScheduledDate] = React.useState(new Date());
  const [selectedAction, setSelectedAction] = React.useState(0);
  const [
    amountOfWaterMilliliters,
    setAmountOfWaterMilliliters,
  ] = React.useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() =>
            RemovePlant(plant.id.toString()).then((res) => FetchPlants())
          }
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
        .then((res) => res ?? res.json())
        .then((res) => {
          if (res) {
            setAction(res);
            if (res.amountOfWaterMilliliters) {
              setAmountOfWaterMilliliters(res.amountOfWaterMilliliters); //
            }
            if (res.scheduledDate) {
              let date = new Date(res.scheduledDate);
              setScheduledDate(date);
            }
          }
        });
    }
    try {
      fetchData();
    } catch (E) {
      console.log(E);
    }
  }, []);

  function ScheduleWatering() {
    setLoading(true);
    let plantAction = {
      scheduledDate: scheduledDate,
      amountOfWaterMilliliters: new Number(amountOfWaterMilliliters),
      plantId: plant.id,
      userId: 1,
    };
    AddPlant(plantAction);

    async function AddPlant(action) {
      setLoading(true);
      await AddPlantAction(action).then(() => {
        setLoading(false);
        fetchData();
      });
    }
  }

  function fetchData() {
    GetScheduled()
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        dispatch(fetchScheduled(res));
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

        <ScheduledActionForm
          plantId={plant.id}
          selectedAction={selectedAction}
          scheduledDate={scheduledDate}
          amountOfWaterMilliliters={amountOfWaterMilliliters}
        ></ScheduledActionForm>
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
