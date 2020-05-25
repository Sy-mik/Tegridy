import React, { useState, useEffect } from "react";

import { View, ScrollView } from "react-native";

export default function ScheduledItemsComponent() {
  return (
    <View>
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
    </View>
  );
}
