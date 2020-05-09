import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import PlantTypeItem from "../addPlantForm/PlantTypeItem";
import { GetTypes } from "../../services/apiCalls";
import ConfirmButton from "../../components/ConfirmButton";

export default function () {
  const navigation = useNavigation();

  const [selected, setSelected] = React.useState(-1);
  const [selectedName, setSelectedName] = React.useState("");
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

  function onSelectItem(id, name) {
    setSelected(id);
    setSelectedName(name);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "600", marginTop: 5 }}>
          Pick Existing
        </Text>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <PlantTypeItem
              id={item.id}
              title={item.name}
              selected={selected == item.id}
              onSelectItem={onSelectItem}
            />
          )}
          keyExtractor={(item) => item.id}
          extraData={selected}
        />
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
