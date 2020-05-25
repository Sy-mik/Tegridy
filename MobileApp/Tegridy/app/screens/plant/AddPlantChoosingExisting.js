import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GetTypes } from "../../services/apiCalls";
import ConfirmButton from "../../components/ConfirmButton";
import PlantTypeList from "../addPlantForm/PlantTypeList";

export default function () {
  const navigation = useNavigation();

  const [selected, setSelected] = React.useState(-1);
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await GetTypes()
        .then((res) => res.json())
        .then((res) => {
          setList(res);
        });
    }
    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "600", marginTop: 5 }}>
          Pick Existing
        </Text>
        <PlantTypeList list={list} onSelectItem={setSelected}></PlantTypeList>
      </View>
      <ConfirmButton
        text="Next"
        onPress={() => {
          var plant = list.find((x) => x.id == selected);
          if (selected != -1) {
            var plant = list.find((x) => x.id == selected);
          }
          navigation.push("Add Plant", { plant: plant });
        }}
      ></ConfirmButton>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
