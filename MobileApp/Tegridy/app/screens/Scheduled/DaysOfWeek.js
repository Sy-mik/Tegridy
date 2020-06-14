import React, { Component, useState, useEffect } from "react";

import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { DefaultButton } from "../../components/DefaultButton";
import { Text, View, StyleSheet } from "react-native";

export default function DaysOfWeek({
  selectedDays,
  setSelectedDays,
  isVisible,
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
    { name: "M", value: Days.Monday },
    { name: "T", value: Days.Tuesday },
    { name: "W", value: Days.Wednesday },
    { name: "T", value: Days.Thursday },
    { name: "F", value: Days.Friday },
    { name: "S", value: Days.Saturday },
    { name: "S", value: Days.Sunday },
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
        {name == "cancelButton" ? (
          <DefaultButton
            onPress={() => setSelectedDays(Days.None)}
            text="Cancel"
          ></DefaultButton>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => onSelect()}
            style={{
              ...styles.dayOfWeekContainer,
              backgroundColor: isSelected ? "black" : "white",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                color: isSelected ? "white" : "black",
              }}
            >
              {name}
            </Text>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }

  return (
    <FlatList
      data={daysOfWeek}
      numColumns={7}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <DayOfWeekCircle
          onSelect={() => {
            if (IsFlagSet(selectedDays, item.value)) {
              let flag = selectedDays &~ item.value;
              setSelectedDays(flag);
            } else {
              setSelectedDays(selectedDays | item.value);
            }
            setValuesChanged(true);
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
    width: 40,
    height: 40,

    backgroundColor: "black",
    borderRadius: 100,
    alignContent: "center",
    justifyContent: "center",
  },
});
