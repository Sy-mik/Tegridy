import React, { useState, useEffect } from "react";
import { GetSuggestedActionForPlant } from "../../services/apiCalls";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import TextInputForm from "../../components/TextInputForm";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
export default function ScheduledActionForm({
  selectedAction,
  setSelectedAction,
  scheduledDate,
  setScheduledDate,
  amountOfWaterMilliliters,
  setAmountOfWaterMilliliters,
}) {
  const [collapsed, setCollapsed] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setScheduledDate(currentDate);
  };

  const data = [
    {
      id: 1,
      title: "Watering",
    },
    {
      id: 2,
      title: "Soil measurment",
    },
    {
      id: 3,
      title: "Replanting",
    },
  ];

  function ActionType({ item, selected }) {
    return (
      <TouchableWithoutFeedback
        onPress={() => setSelectedAction(item.id)}
        style={{
          borderColor: "black",
          backgroundColor: selected ? "black" : "white",
          borderWidth: 1,
          padding: 10,
          margin: 5,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: selected ? "white" : "black",
          }}
        >
          {item.title}
        </Text>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={{ margin: 10, width: "100%" }}>
      <Text
        onPress={() => setCollapsed(!collapsed)}
        style={{ fontSize: 30, fontWeight: "600" }}
      >
        Schedule action
      </Text>
      <FlatList
        horizontal={true}
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <ActionType
            item={item}
            selected={selectedAction == item.id}
          ></ActionType>
        )}
      ></FlatList>
      {selectedAction == 1 ? (
        <View style={{ flexDirection: "column", flex: 1 }}>
          <TextInputForm
            style={{ flex: 1 }}
            label="Water in mililiters"
            callback={(value) => {
              setAmountOfWaterMilliliters(value);
            }}
            value={amountOfWaterMilliliters.toString()}
          ></TextInputForm>
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={scheduledDate}
            mode={"datetime"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
