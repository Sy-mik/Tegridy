import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity } from "react-native";

export default function PlantTypeList({ list, selected, onSelectItem }) {
  function PlantTypeItem({ id, title, selected }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSelectItem(id);
        }}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 4,
          marginHorizontal: 16,
          backgroundColor: selected ? "#dcdcd" : "#ffff",
        }}
      >
        <Text style={{ fontSize: 20 }}>{title}</Text>
        <FontAwesome size={24} name={selected ? "circle" : "circle-o"} />
      </TouchableOpacity>
    );
  }
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <PlantTypeItem
          id={item.id}
          title={item.name}
          selected={selected == item.id}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      extraData={selected}
    />
  );
}
