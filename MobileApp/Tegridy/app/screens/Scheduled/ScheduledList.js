import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ScheduledItemCard from "./ScheduledItemCard";
import { ScrollView } from "react-native-gesture-handler";
import { GetScheduled } from "../../services/apiCalls";
import { fetchScheduled } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import FetchScheduled from "../../store/FetchScheduled";

export default function ScheduledList() {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const dataReducer = useSelector((state) => state.scheduledDataReducer);
  const { data } = dataReducer;

  useEffect(() => {
    FetchScheduled(dispatch)
  }, []);

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        Scheduled
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <ScheduledItemCard>{item}</ScheduledItemCard>}
      ></FlatList>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
