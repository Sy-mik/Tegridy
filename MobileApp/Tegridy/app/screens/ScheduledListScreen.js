import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, RefreshControl, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { useModalState } from "../hooks/useModalState";
import ScheduledItemsListContainer from "./Scheduled/containers/scheduledItemsListContainer";
import ScheduledItemsCalendarContainer from "./Scheduled/containers/scheduledItemsCalendarContainer";
import ScheduledItemModalContainer from "./Scheduled/containers/scheduledItemModalContainer";
import { AsyncStorage } from "react-native";

export default function ScheduledListScreen({ navigation }) {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useModalState(false);
  const [selectedModalItem, setSelectedModalItem] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isScheduledModalOpen, setIsScheduledModalOpen] = useModalState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefreshing(false);//
  }, [refreshing]);

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
        <ScheduledItemsCalendarContainer
          setIsScheduledModalOpen={setIsScheduledModalOpen}
        ></ScheduledItemsCalendarContainer>
        <ScheduledItemsListContainer
          openModal={openModal}
        ></ScheduledItemsListContainer>
      </ScrollView>
      <View style={{ height: 100 }}>
        <ScheduledItemModalContainer
          setIsScheduledModalOpen={setIsScheduledModalOpen}
          isScheduledModalOpen={isScheduledModalOpen}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedModalItem={selectedModalItem}
        ></ScheduledItemModalContainer>
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
