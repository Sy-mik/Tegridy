import React, { Component, useState, useEffect } from "react";
import * as Haptics from "expo-haptics";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { DefaultButton } from "../../components/DefaultButton";
import { Text, View, StyleSheet } from "react-native";

export default function DaysOfWeek({
  selectedDays,
  setSelectedDays,
  isEditing,
  setValuesChanged,
}) {
  function IsFlagSet(value, flag) {
    return (value & flag) != 0;
  }

  var Days = {
    None: 0,
    Sunday: 1,
    Monday: 2,
    Tuesday: 4,
    Wednesday: 8,
    Thursday: 16,
    Friday: 32,
    Saturday: 64,
  };

  let daysOfWeek = [
    { name: "Monday", value: Days.Monday },
    { name: "Tuesday", value: Days.Tuesday },
    { name: "Wednesday", value: Days.Wednesday },
    { name: "Thursday", value: Days.Thursday },
    { name: "Friday", value: Days.Friday },
    { name: "Saturday", value: Days.Saturday },
    { name: "Sunday", value: Days.Sunday },
  ];

  function getIsSelected(value) {
    if (selectedDays == 0) {
      return false;
    } else if (IsFlagSet(selectedDays, value)) {
      return true;
    } else {
      return false;
    }
  }

  function DayOfWeekCircle({ name, isSelected, onSelect }) {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            onSelect();
          }}
          style={{
            ...styles.dayOfWeekContainer,
            backgroundColor: isSelected ? "black" : "white",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: isSelected ? "white" : "black",
            }}
          >
            {name}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  return (
    <FlatList
      data={daysOfWeek}
      numColumns={3}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <DayOfWeekCircle
          onSelect={() => {
            if (!isEditing) return;
            if (IsFlagSet(selectedDays, item.value)) {
              let flag = selectedDays & ~item.value;
              setSelectedDays(flag);
            } else {
              setSelectedDays(selectedDays | item.value);
            }
            setValuesChanged(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          isSelected={getIsSelected(item.value)}
          name={item.name}
        ></DayOfWeekCircle>
      )}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  dayOfWeekContainer: {
    margin: 5,
    width: 110,
    height: 40,

    backgroundColor: "black",
    borderRadius: 100,
    alignContent: "center",
    justifyContent: "center",
  },
});
