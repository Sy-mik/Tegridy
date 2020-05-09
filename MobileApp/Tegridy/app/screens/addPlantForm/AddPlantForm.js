import React, { useState, useEffect } from "react";

import { StyleSheet, Button, Text, View } from "react-native";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import HoursPicker from "../../components/HoursPicker";
import MinutesPicker from "../../components/MinutesPicker";
import Colors from "../../constants/Colors";
import TextInputForm from "../../components/TextInputForm";
import { AddPlant } from "../../services/apiCalls";
import FetchPlants from "../../store/FetchPlants";
import ConfirmButton from "../../components/ConfirmButton";

export default function AddPlantForm({ route }) {
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(-1);
  const [selectedName, setSelectedName] = React.useState("");
  const [selectedWatering, setSelectedWatering] = React.useState(0);
  const [selectedWateringPeriod, setSelectedWateringPeriod] = React.useState(0);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);

  useEffect(() => {
    var { plant } = route.params;
    if (plant) {
      setSelected(plant.id);
      setSelectedName(plant.name);
      setSelectedWatering(plant.rule.waterInMilliliters);
      setSelectedWateringPeriod(plant.rule.hoursBetweenWatering);
    }
  }, []);

  async function handleCreateNewPlant() {
    const plant = {
      plantInfoId: selected,
      name: selectedName,
      wateringInMililiters: selectedWatering,
      wateringHour: selectedHour,
      wateringMinute: selectedMinute,
      groupId: 0,
    };
    setLoading(true);
    await AddPlant(plant).then((res) => {
      FetchPlants();
      setLoading(false);
    });
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <ScrollView style={styles.mainContainer}>
        <TextInputForm
          label="Name"
          callback={setSelectedName}
          value={selectedName}
        ></TextInputForm>

        <TextInputForm
          label="Watering in mililiters"
          callback={setSelectedWatering}
          value={selectedWatering.toString()}
          keyboardType="numeric"
        ></TextInputForm>

        <TextInputForm
          label="Hours between watering"
          callback={setSelectedWateringPeriod}
          value={selectedWateringPeriod.toString()}
          keyboardType="numeric"
        ></TextInputForm>
        {/* 
        <View style={{ alignSelf: "center" }}>
          <View style={styles.pickersContainer}>
            <Text> Hour: </Text>
            <HoursPicker>{onHoursChangeCallback}</HoursPicker>
            <Text> Minute: </Text>
            <MinutesPicker>{onMinuteChangeCallback}</MinutesPicker>
          </View>
        </View> */}
      </ScrollView>

      <View>
        <ConfirmButton
          loading={loading}
          text="Add"
          onPress={() => handleCreateNewPlant()}
        ></ConfirmButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
  },
  pickersContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
});
