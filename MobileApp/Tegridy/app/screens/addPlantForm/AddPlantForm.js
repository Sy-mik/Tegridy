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

export default function AddPlantForm({ route }) {
  const [selected, setSelected] = React.useState(-1);
  const [selectedName, setSelectedName] = React.useState("");
  const [selectedWatering, setSelectedWatering] = React.useState();
  const [selectedWateringPeriod, setselectedWateringPeriod] = React.useState();
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);

  useEffect(() => {
    var { plant } = route.params;
    if (plant) {
      setSelected(plant.id);
      setSelectedName(plant.name);
      setSelectedWatering(plant.rule.waterInMilliliters);
      setselectedWateringPeriod(plant.rule.hoursBetweenWatering);
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
    await AddPlant(plant).then((res) => FetchPlants());
  }

  var onMinuteChangeCallback = (text) => {
    setSelectedMinute(text);
  };

  var onHoursChangeCallback = (text) => {
    setSelectedHour(text);
  };

  function onChangeWateringPeriod(text) {
    var newText = getParsedNumbers(text, selectedWateringPeriod);
    setselectedWateringPeriod(newText);
  }

  function onChangeWatering(text) {
    var newText = getParsedNumbers(text, selectedWatering);
    setSelectedWatering(newText);
  }

  function getParsedNumbers(text, original) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        newText = original;
      }
    }
    return newText;
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
        <Text style={{ fontSize: 30, fontWeight: "600", marginTop: 5 }}>
          Specify
        </Text>

        <TextInputForm
          label="Name"
          callback={setSelectedName}
          value={selectedName}
        ></TextInputForm>

        <TextInputForm
          label="Watering in mililiters"
          callback={onChangeWatering}
          value={selectedWatering}
        ></TextInputForm>

        <TextInputForm
          label="Hours between watering"
          callback={onChangeWateringPeriod}
          value={selectedWateringPeriod}
        ></TextInputForm>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.pickersContainer}>
            <Text> Hour: </Text>
            <HoursPicker>{onHoursChangeCallback}</HoursPicker>
            <Text> Minute: </Text>
            <MinutesPicker>{onMinuteChangeCallback}</MinutesPicker>
          </View>
        </View>
      </ScrollView>

      <View>
        <Button
          onPress={() => handleCreateNewPlant()}
          color={Colors.acceptButtonColor}
          title="Add"
        />
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
