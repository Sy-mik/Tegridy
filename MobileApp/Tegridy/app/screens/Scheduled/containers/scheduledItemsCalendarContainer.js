import React, { useState, useEffect } from "react";

import ScheduledItemsCalendar from "../components/ScheduledItemsCalendar.js";
import { useDispatch, useSelector } from "react-redux";
import { useModalState } from "../../../hooks/useModalState";
import { updateMarkedDates } from "../../../store/actions";
import CalendarActionContainer from "./calendarActionContainer";
import { View } from "react-native";

export default function ScheduledItemsCalendarContainer({
  setIsScheduledModalOpen, // Wokaorund for problem with modals
}) {
  let dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [pickedDate, setPickedDate] = React.useState(new Date());

  const dates = useSelector((state) => state.updateMarkedDates);
  const markedDates = dates.data;

  function dismissModal() {
    setModalVisible(false);
  }

  function onMonthChange(date) {
    let d = new Date(date.dateString);
    dispatch(updateMarkedDates(d));
  }

  return (
    <View>
      <ScheduledItemsCalendar
        setIsScheduledModalOpen={setIsScheduledModalOpen}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pickedDate={pickedDate}
        setPickedDate={setPickedDate}
        markedDates={markedDates}
        dismissModal={dismissModal}
        onMonthChange={onMonthChange}
      ></ScheduledItemsCalendar>

      <CalendarActionContainer
        scheduledDate={pickedDate}
        onDismiss={dismissModal}
        isOpen={modalVisible}
      ></CalendarActionContainer>
    </View>
  );
}
