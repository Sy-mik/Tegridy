import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import {
  GetSuggestedActionForPlant,
  AddPlantAction,
  GetScheduled,
  RemovePlant,
} from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { fetchScheduled } from "../../store/actions";
import { useNavigation } from '@react-navigation/native';
import ScheduledActionForm from "../Scheduled/ScheduledActionForm";

export default function Plant({ route }) {
  const { plant } = route.params;
  const dispatch = useDispatch();

  const imageUri = plant.imageUri;
  const itemName = plant.name;
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [action, setAction] = React.useState("");
  const [scheduledHour, setScheduledHour] = React.useState(0);
  const [scheduledMinute, setScheduledMinute] = React.useState(0);
  const [scheduledDay, setSheduledDay] = React.useState(0);
  const [
    amountOfWaterMilliliters,
    setAmountOfWaterMilliliters,
  ] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() => RemovePlant(plant.id).then(res=>FetchPlants())}
          style={{ margin: 16, fontSize: '18px', fontWeight: 500 }}
        >
          Remove
        </Text>
      ),
    });
  }, []);
  // reducers part

  async function FetchPlants(){
    await GetPlants()
    .then(res=>res.json())
    .then(res=>{
     dispatch(fetchPlants(res))});
    }

  React.useLayoutEffect(() => {
    async function fetchData() {
      await GetSuggestedActionForPlant(plant.id)
        .then((res) => res.json())
        .then((res) => {
          setAction(res);
          setAmountOfWaterMilliliters(res.amountOfWaterMilliliters);
          let date = new Date(res.scheduledDate);
          setScheduledHour(date.getHours());
          setScheduledMinute(date.getMinutes());
          setSheduledDay(getScheduledDay(date));
        });
    }
    fetchData();
  }, []);
  function getScheduledDay(date) {
    new Date().getDate() - date.getDate();
  }

  function ScheduleWatering() {
    let date = new Date();
    date.setHours(scheduledHour);
    date.setMinutes(scheduledMinute);
    if (scheduledDay) {
      let day = Number(date.getDate()) + Number(scheduledDay);
      date.setDate(day);
    }
    action.scheduledDate = date;
    action.amountOfWaterMilliliters = new Number(amountOfWaterMilliliters);
    // refresh Scheduled list
    AddPlant(action);

    async function AddPlant(action) {
      // You can await here
      setLoading(true);
      await AddPlantAction(action).then((res) => {
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
          scheduledHour={scheduledHour}
          scheduledMinute={scheduledMinute}
          scheduledDay={scheduledDay}
          amountOfWaterMilliliters={amountOfWaterMilliliters}
          setScheduledHour={(value) => setScheduledHour(value)}
          setScheduledMinute={(value) => setScheduledMinute(value)}
          setSheduledDay={(value) => setSheduledDay(value)}
          setAmountOfWaterMilliliters={(value) => {
            setAmountOfWaterMilliliters(value);
          }}
          action={action}
        ></ScheduledActionForm>
      </View>

      <Button
        disabled={loading}
        onPress={() => {
          ScheduleWatering();
        }}
        color={Colors.acceptButtonColor}
        title={loading ? "Loading" : "Schedule Action"}
      />
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
