import React, { useState, useEffect } from "react";
import { GetSuggestedActionForPlant } from "../../services/apiCalls";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import TextInputForm from "../../components/TextInputForm";
import HoursPicker from "../../components/HoursPicker";
import MinutesPicker from "../../components/MinutesPicker";
import DaysPicker from "../../components/DaysPicker";
export default function ScheduledActionForm({
  scheduledHour,
  scheduledDay,
  scheduledMinute,
  amountOfWaterMilliliters,
  setScheduledHour,
  setScheduledMinute,
  setSheduledDay,
  setAmountOfWaterMilliliters,
}) {
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 30, fontWeight: "600" }}>Schedule action</Text>
      <TextInputForm
        label="Water in mililiters"
        callback={(value) => {
          setAmountOfWaterMilliliters(value);
        }}
        value={amountOfWaterMilliliters}
      ></TextInputForm>
      <View>
        <View style={styles.pickersContainer}>
          <Text>Hour: </Text>
          <HoursPicker
            callBack={(value) => {
              setScheduledHour(value);
            }}
            value={scheduledHour}
          ></HoursPicker>
          <Text> Minute: </Text>
          <MinutesPicker
            callBack={(value) => {
              setScheduledMinute(value);
            }}
            value={scheduledMinute}
          ></MinutesPicker>
        </View>
        <View style={styles.pickersContainer}>
          <Text> Day: </Text>
          <DaysPicker
            callBack={(value) => setSheduledDay(value)}
            value={scheduledDay}
          ></DaysPicker>
        </View>
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
  pickersContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
});
