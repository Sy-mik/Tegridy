import React, { useState, useEffect } from "react";
import { GetSuggestedActionForPlant } from "../../services/apiCalls";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import TextInputForm from "../../components/TextInputForm";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ScheduledActionForm({
  scheduledDate,
  setScheduledDate,
  amountOfWaterMilliliters,
  setAmountOfWaterMilliliters,
}) {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  console.log(amountOfWaterMilliliters);
  return (
    <View style={{ margin: 10, width: "100%" }}>
      <Text style={{ fontSize: 30, fontWeight: "600" }}>Schedule action </Text>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <TextInputForm
          style={{ flex: 1 }}
          label="Water in mililiters"
          callback={(value) => {
            setAmountOfWaterMilliliters(value);
          }}
          value={amountOfWaterMilliliters.toString()}
        ></TextInputForm>
      </View>
      <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        value={date}
        mode={"datetime"}
        is24Hour={true}
        display="default"
        onChange={onChange}
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
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  pickersContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});
