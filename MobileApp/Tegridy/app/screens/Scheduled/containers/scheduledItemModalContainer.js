import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View } from "react-native";
import DatePicker from "../../../components/DatePicker";
import ScheduledItemModalComponent from "../components/ScheduledItemModalComponent";
import { useModalState } from "../../../hooks/useModalState";

export default function ScheduledItemModalContainer({
  selectedModalItem,
  isModalOpen,
  setIsModalOpen,
}) {
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [visibleDate, setVisibleDate] = useState("");
  let name = "";
  let dispatch = useDispatch();
  let newItem = selectedModalItem;

  useEffect(() => {
    if (selectedModalItem) {
      newItem = selectedModalItem;
      name = selectedModalItem.name;
      let d = new Date(selectedModalItem.scheduledDate);
      setDate(d);
      setVisibleDate(d.toDateString() + " " + d.toLocaleTimeString());
    }
  }, [selectedModalItem]);

  function dismissModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    let d = date;
    setVisibleDate(d.toDateString() + " " + d.toLocaleTimeString());
  }, [date]);

  function openDatePicker() {
    toggle(false);
    setIsDatePickerOpen(true);
  }

  function saveDate() {
    toggle(true);
    setIsDatePickerOpen(false);
    UpdatePlantActionDate(selectedModalItem.id, date).then(() => {
    });
  }
  function MarkAsDone() {
    UpdatePlantActionStatus(selectedModalItem.id).then(() => {
      toggle(false);
    });
  }

  return (
    <View style={{ height: 0 }}>
      <DatePicker
        date={date}
        onSetDate={setDate}
        onCancel={() => {
          toggle(true);
          setIsDatePickerOpen(false);
        }}
        onSave={saveDate}
        isOpen={isDatePickerOpen}
      ></DatePicker>

      <ScheduledItemModalComponent
        isOpen={isModalOpen}
        newItem={newItem}
        onDismiss={dismissModal}
        visibleDate={visibleDate}
        markAsDone={MarkAsDone}
        openDatePicker={openDatePicker}
      ></ScheduledItemModalComponent>
    </View>
  );
}
