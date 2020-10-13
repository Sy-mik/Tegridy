import React, { useEffect, useState } from "react";
import { Text, ActionSheetIOS } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import PlantListComponent from "./PlantListComponent";
import FetchPlants from "../../store/FetchPlants";
import RemovePlant from "../../store/RemovePlant";

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

  const openMenu = (item) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Remove", "Cancel"],
        title: item.name,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 2) {
          // cancel action
        } else if (buttonIndex === 1) {
          console.log(item);
        } else if (buttonIndex === 0) {
          RemovePlant(dispatch, item.id);
        }
      }
    );

  function onPressItem(item) {
    navigation.push("Plant", { plant: item });
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onLongPress={() => {
            onPress();
          }}
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
      onLongPressItem={openMenu}
    ></PlantListComponent>
  );
}
