import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { webApiUri } from "../../services/apiCalls";
import PlantWateringInfoContainer from "./plantWateringInfoContainer";
import ConfirmButton from "../../components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";
import PlantHeaderInfoComponent from "./plantHeaderInfoComponent";
import { ScrollView } from "react-native-gesture-handler";

export default function PlantScreen({ route }) {
  const { plant } = route.params;
  const imageUri = plant.imageName
    ? webApiUri + "images/" + plant.imageName
    : plant.imageUri;
  const itemName = plant.name;

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() =>
            RemovePlant(plant.id.toString()).then((res) => FetchPlants())
          }
          style={{ margin: 10, fontSize: 18, fontWeight: "500" }}
        >
          Remove
        </Text>
      ),
    });
  }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <PlantHeaderInfoComponent
        imageUri={imageUri}
        itemName={itemName}
      ></PlantHeaderInfoComponent>
      <PlantWateringInfoContainer plant={plant}></PlantWateringInfoContainer>
    </View>
  );
}
