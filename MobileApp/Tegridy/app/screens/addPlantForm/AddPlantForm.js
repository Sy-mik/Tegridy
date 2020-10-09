import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { StyleSheet, Button, Image, Text, View } from "react-native";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import TextInputForm from "../../components/TextInputForm";
import { PostPlant } from "../../services/apiCalls";
import FetchPlants from "../../store/FetchPlants";
import ConfirmButton from "../../components/ConfirmButton";
import { useDispatch } from "react-redux";
import { AddPlant } from "../../store/AddPlant";
import { v4 as uuidv4 } from "uuid";

export default function AddPlantForm({ route }) {
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState(-1);
  const [selectedName, setSelectedName] = React.useState("");
  const [selectedWatering, setSelectedWatering] = React.useState(0);
  const [selectedWateringPeriod, setSelectedWateringPeriod] = React.useState(0);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    var { plant } = route.params;
    if (plant) {
      setSelected(plant.id);
      setSelectedName(plant.name);
      setSelectedWatering(plant.rule.waterInMilliliters);
      setSelectedWateringPeriod(plant.rule.hoursBetweenWatering);
    }
    getPermissionAsync();
  }, []);

  let getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  async function pickImageBase64() {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage(result); //
      }
    } catch (E) {
      console.log(E);
    }
  }

  async function handleCreateNewPlant() {
    console.log('handleCreateNewPlant');
    const plant = {
      plantInfoId: selected,
      name: selectedName,
      wateringInMililiters: selectedWatering,
      wateringHour: selectedHour,
      wateringMinute: selectedMinute,
      groupId: 0,
      imageName: uuidv4(),
    };
    setLoading(true);
    console.log(image);

    try {
      AddPlant(dispatch, plant, image);
      // await PostPlant(plant, image).then(() => {
      //   //
      // });
    } catch (E) {
      //display message failed
      console.log(E);
    }
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
          keyboardType="default"
          label="Name"
          setValue={setSelectedName}
          value={selectedName}
        ></TextInputForm>

        <TextInputForm
          label="Watering in mililiters"
          setValue={setSelectedWatering}
          value={selectedWatering.toString()}
          keyboardType="numeric"
        ></TextInputForm>

        <TextInputForm
          label="Hours between watering"
          setValue={setSelectedWateringPeriod}
          value={selectedWateringPeriod.toString()}
          keyboardType="numeric"
        ></TextInputForm>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            margin: 5,
            justifyContent: "center",
          }}
        >
          <Button
            title="Pick an image from camera roll"
            onPress={pickImageBase64}
          />
          {image && (
            <Image source={image} style={{ width: 200, height: 200 }} />
          )}
        </View>
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
    alignSelf: "center",
    width: "70%",
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
