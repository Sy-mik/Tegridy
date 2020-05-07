import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  RefreshControl,
} from "react-native";
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
  const [refreshing, setRefreshing] = React.useState(false);

  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchScheduled(dispatch);
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    FetchScheduled(dispatch);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
          <Text style={styles.header1}>This week</Text>
        <FlatList
          horizontal={true}
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <ScheduledItemCard>{item}</ScheduledItemCard>
          )}
        ></FlatList>
        <Text style={styles.header1}>Summary</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header1: {
    flex: 5,
    fontSize: 50,
    margin: 20,
    fontWeight: "bold",
  },
  header3: {
    fontSize: 20,
    fontWeight: "600",
    color: "lightgrey",
  },
});
