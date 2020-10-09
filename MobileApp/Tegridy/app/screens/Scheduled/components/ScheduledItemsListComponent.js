import React, { useState, useEffect } from "react";

import { View, ScrollView, StyleSheet, Text } from "react-native";
import ScheduledItemCard from "../ScheduledItemCard";
import { FlatList } from "react-native-gesture-handler";

export default function ScheduledItemsListComponent({
  monthOfTheAction,
  dayOfTheAction,
  onScrollScheduledItems,
  data,
  openModal,
}) {

  return (
    <View>
      <Text style={styles.header3}>{monthOfTheAction.toString()}</Text>
      <Text style={styles.header1}>{dayOfTheAction.toString()}</Text>
        <FlatList
          onScroll={(e) => {
            if (onScrollScheduledItems) {
              onScrollScheduledItems(e);
            }
          }}
          horizontal={true}
          data={data}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={(
            { item } //
          ) => (
            <ScheduledItemCard
              item={item}
              onClick={openModal}
            ></ScheduledItemCard>
          )}
        ></FlatList>
    </View>
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
