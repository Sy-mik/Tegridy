import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

export default function PlantListComponent({
  refreshing,
  onRefresh,
  data,
  onPressItem,
  onLongPressItem,
}) {
  function Item({ item }) {
    return (
      <TouchableOpacity
        onLongPress={() => {
          if (!onLongPressItem) {
            return;
          }
          onLongPressItem(item);
        }}
        onPress={() => {
          onPressItem(item);
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              style={{ width: 80, height: 80, borderRadius: 15 }}
              source={{ uri: item.imageUri }}
            />
            <View style={{ alignSelf: "center" }}>
              <Text style={{ fontSize: 20, marginLeft: 20 }}>{item.name}</Text>
            </View>
          </View>

          <View style={{ alignSelf: "center" }}>
            <AntDesign color="gray" name="right" size={24}></AntDesign>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={data}
      renderItem={({ item }) => <Item item={item}></Item>}
      keyExtractor={(item, index) => index + item.id} // might be wrong
    />
  );
}
