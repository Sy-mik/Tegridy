import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { GetRules } from "../services/apiCalls";
import ScheduleAction from "../screens/Scheduled/ScheduleAction";
import { View } from "react-native";
import FetchRules from "../store/FetchRules";

export const useModalState = (initialState) => {
  const [modalVisible, setModalVisible] = React.useState(initialState);
  const [forceModalVisible, setForceModalVisible] = React.useState(false);

  const setModal = (modalState) => {
    if (modalState && modalVisible) {
      setForceModalVisible(true);
    }
    setModalVisible(modalState);
  };

  useEffect(() => {
    if (forceModalVisible && modalVisible) {
      setModalVisible(false);
    }
    if (forceModalVisible && !modalVisible) {
      setForceModalVisible(false);
      setModalVisible(true);
    }
  }, [forceModalVisible, modalVisible]);

  return [modalVisible, setModal];
};
export default function ScheduledItemsCalendar() {
  const [modalVisible, setModalVisible] = useModalState(false);
  const [pickedDate, setPickedDate] = React.useState(new Date());

  const dates = useSelector((state) => state.updateMarkedDates);
  const markedDates = dates.data;

  function dismissModal() {
    setModalVisible(false);
  }

  return (
    <View>
      <ScheduleAction
        scheduledDate={pickedDate}
        onDismiss={dismissModal}
        isOpen={modalVisible}
      ></ScheduleAction>
      {dates != null ? (
        <Calendar
          onDayPress={(date) => {
            setPickedDate(date.dateString);
            setModalVisible(true);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MMMM"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            // let d = new Date(date);
            // d.setMonth(month);
            // setDate(d);
            // console.log("month changed", month);
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
      ) : null}
    </View>
  );
}
