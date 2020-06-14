import React, { useState } from "react";
import { View } from "react-native";
import PlantWateringInfoComponent from "./plantWateringInfoComponent";
import { useDispatch } from "react-redux";
import { AddPlantAction } from "../../services/apiCalls";
import FetchPlants from "../../store/FetchPlants";
import FetchRules from "../../store/FetchRules";
import { useModalState } from "../../hooks/useModalState";
import InputScreenModal from "../../components/InputScreen";
import LoadingModal from "../../components/LoadingModal";
import ConfirmButton from "../../components/ConfirmButton";
export default function PlantWateringInfoContainer({ plant }) {
  const dispatch = useDispatch();
  const [valuesChanged, setValuesChanged] = useState(false);
  const [selectedDays, setSelectedDays] = useState(0);
  const [amountOfWaterMilliliters, setAmountOfWaterMilliliters] = useState("");
  const [isModalOpen, setIsModalOpen] = useModalState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useLayoutEffect(() => {
    setAmountOfWaterMilliliters(plant.wateringInMililiters);
    setSelectedDays(plant.rule.days);
  }, [plant]);

  function ScheduleWatering() {
    setIsLoading(true);
    let val = selectedDays;
    const plantAction = {
      amountOfWaterMilliliters: amountOfWaterMilliliters,
      plantId: plant.id,
      userId: 1,
      days: val,
    };
    AddPlantWateringAction(plantAction);

    async function AddPlantWateringAction(action) {
      await AddPlantAction(action).then(() => {
        setValuesChanged(false);
        setIsLoading(false);
        FetchPlants(dispatch);
        FetchRules(dispatch);
      });
    }
  }

  return (
    <View>
      <LoadingModal
        modalVisible={isLoading}
        setModalVisible={setIsLoading}
      ></LoadingModal>
      <InputScreenModal
        text="Watering"
        setValue={setAmountOfWaterMilliliters}
        value={amountOfWaterMilliliters}
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
      ></InputScreenModal>
      <PlantWateringInfoComponent
        toggleModal={() => setIsModalOpen(true)}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        setValuesChanged={setValuesChanged}
        plantId={plant.id}
        scheduleWatering={ScheduleWatering}
        amountOfWaterMilliliters={amountOfWaterMilliliters}
      ></PlantWateringInfoComponent>
      <View style={{ justifyContent: "flex-end" }}>
        <ConfirmButton
          onPress={() => ScheduleWatering()}
          text="Save"
        ></ConfirmButton>
      </View>
    </View>
  );
}
