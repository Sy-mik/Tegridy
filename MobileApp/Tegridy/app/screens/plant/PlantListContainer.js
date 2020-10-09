import React, { useEffect, useState } from "react";
import { Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import PlantListComponent from "./PlantListComponent";
import FetchPlants from "../../store/FetchPlants";

export default function PlantListContainer() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dataReducer = useSelector((state) => state.userPlantsReducer);
  const { data } = dataReducer;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchPlants(dispatch);
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    FetchPlants(dispatch);
  }, []);

  function onPressItem(item) {
    navigation.push("Plant", { plant: item });
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() => navigation.navigate("Choose Type")}
          style={{ marginRight: 16, fontSize: 18, fontWeight: "500" }}
        >
          Add
        </Text>
      ),
    });
  }, []);

  return (
    <PlantListComponent
      onRefresh={onRefresh}
      data={data}
      onPressItem={onPressItem}
      refreshing={refreshing}
    ></PlantListComponent>
  );
}
