import React from "react";

const { View, Image, Text, StyleSheet } = require("react-native");

export default function PlantHeaderInfoComponent({imageUri, itemName}) {
  return (
    <View>
      <Image
        style={styles.modalImage}
        resizeMode="cover"
        source={{ uri: imageUri }}
      ></Image>
      <View style={styles.informationsContainer}>
        <Text style={styles.title}>{itemName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalImage: {
    height: 300,
  },
  informationsContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: -20,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
