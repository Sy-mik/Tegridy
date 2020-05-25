import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import ScheduledItemCard from "./Scheduled/ScheduledItemCard";
import { ScrollView } from "react-native-gesture-handler";
import { GetScheduled } from "../services/apiCalls";
import { fetchScheduled } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import FetchScheduled from "../store/FetchScheduled";
import ScheduledItemModal from "./Scheduled/ScheduledItemModal";
import DatePicker from "../components/DatePicker";
import FetchRules from "../store/FetchRules";
import ScheduledItemsCalendar from "../components/ScheduledItemsCalendar";

export default function ScheduledList({ navigation }) {
  const dispatch = useDispatch();
  const [listIndex, setListIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayOfTheAction, setDayOfTheAction] = useState("");
  const [monthOfTheAction, setMonthOfTheAction] = useState("");
  const [list, setList] = useState([]);
  const [selectedModalItem, setSelectedModalItem] = useState();
  const dataReducer = useSelector((state) => state.scheduledDataReducer);
  const { data } = dataReducer;
  const [refreshing, setRefreshing] = React.useState(false);

  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchScheduled(dispatch);
    FetchRules(dispatch);
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    calculateDayOfTheAction();
  }, [data]);

  function calculateDayOfTheAction() {
    let item = data[listIndex];
    if (!item) {
      return;
    }
    let date = new Date(item.scheduledDate);
    setDayOfTheAction(
      weekday[date.getDay()] + " " + parseNumber(date.getDate().toString())
    );
    const month = date.toLocaleString("default", { month: "long" });
    setMonthOfTheAction(month);
  }

  function parseNumber(number) {
    number = new Number(number);
    if (number > 3 && number < 21) {
      return number + "th";
    }
    let date = "";
    let dateNumber = number % 10;
    if (dateNumber == 1) {
      date = number + "st";
    } else if (dateNumber == 2) {
      date += number + "nd";
    } else if (dateNumber == 3) {
      date = number + "rd";
    } else {
      date = number + "th";
    }

    return date;
  }

  function openModal(item) {
    setIsModalOpen(true);
    setSelectedModalItem(item);
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ ...styles.scrollView }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ height: 420 }}>
          <Text style={{ ...styles.header1, margin: 20 }}>Summary</Text>
          <ScheduledItemsCalendar></ScheduledItemsCalendar>
        </View>
        <Text style={styles.header3}>{monthOfTheAction}</Text>
        <Text style={styles.header1}>{dayOfTheAction}</Text>
        <FlatList
          onScroll={(e) => {
            let offset = e.nativeEvent.contentOffset.x;
            let index = parseInt(offset / 190); // your cell height
            setListIndex(index);
            calculateDayOfTheAction();
          }}
          horizontal={true}
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <ScheduledItemCard
              item={item}
              onClick={openModal}
            ></ScheduledItemCard>
          )}
        ></FlatList>
      </ScrollView>
      <View style={{ height: 100 }}>
        <ScheduledItemModal
          isOpen={isModalOpen}
          toggle={setIsModalOpen}
          item={selectedModalItem}
        ></ScheduledItemModal>
      </View>
    </SafeAreaView>
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
