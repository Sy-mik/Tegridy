import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GetTypes } from "../services/apiCalls";

import PlantTypeList from "./addPlantForm/PlantTypeList";
import ConfirmButton from "../components/ConfirmButton";

export default function PlantTypes() {
  const [selected, setSelected] = React.useState(-1);
  const [list, setList] = useState([]);
  const navigation = useNavigation();

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

  function onSelectItem(id) {
    setSelected(id);
  }

  return (<View style={{flexDirection:'column', flex:1, alignContent:'space-between'}}>
    <PlantTypeList
      list={list}
      selected={selected}
      onSelectItem={setSelected}
    ></PlantTypeList>
         <ConfirmButton
         onPress={()=>navigation.push('Add Plant', list[0])}
        text="Next"
      ></ConfirmButton>
    </View>
  );
}
