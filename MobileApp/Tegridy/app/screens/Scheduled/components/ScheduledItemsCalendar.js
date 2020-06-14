import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { GetRules } from "../../../services/apiCalls";
import { View, StyleSheet, Text } from "react-native";

export default function ScheduledItemsCalendar({
  setModalVisible,
  setPickedDate,
  markedDates,
  onMonthChange,
}) {
  return (
    <View style={{ height: 380 }}>
      <Text style={{ ...styles.header1, margin: 20 }}>Summary</Text>

      <Calendar
        onDayPress={(date) => {
          setPickedDate(date.dateString);
          setModalVisible(true);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MMMM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(date) => {
          onMonthChange(date);
        }}
        markedDates={{
          // '2020-05-16': {selected: true, marked: true, selectedColor: 'blue'},
          // let markedD = {
          // "2020-05-16": { selected: true, marked: true, selectedColor: "blue" },
          // "2020-05-17": { marked: true },
          // "2020-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
          // "2020-05-19": { disabled: true, disableTouchEvent: true },
          // };

          ...markedDates,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header1: {
    fontSize: 45,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  header3: {
    fontSize: 40,
    fontWeight: "600",
    marginLeft: 20,
    color: "lightgrey",
  },
});
