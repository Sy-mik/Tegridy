import React, { useState } from "react";
import { View } from "react-native";
import PlantWateringInfoComponent from "./plantWateringInfoComponent";
import { useDispatch } from "react-redux";
import UpdatePlantAction from "../../store/UpdatePlantAction";
import { useModalState } from "../../hooks/useModalState";
import InputScreenModal from "../../components/InputScreen";
import LoadingModal from "../../components/LoadingModal";
import ConfirmButton from "../../components/ConfirmButton";
import UpdatePlantDays from "../../store/UpdatePlantAction";
import { OpenOperationsModal } from "../../store/ModalOperations";

export default function PlantWateringInfoContainer({ plant, isEditing }) {
  const dispatch = useDispatch();
  const [valuesChanged, setValuesChanged] = useState(false);
  const [selectedDays, setSelectedDays] = useState(0);
  const [amountOfWaterMilliliters, setAmountOfWaterMilliliters] = useState("");
  const [isModalOpen, setIsModalOpen] = useModalState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useLayoutEffect(() => {
    console.log("PLANT RULE");
    console.log(plant);
    setAmountOfWaterMilliliters(plant.rule.wateringInMililiters);
    setSelectedDays(plant.rule.days);
  }, [plant]);

  function SavePlant() {
    let val = selectedDays;
    const plantAction = {
      wateringInMililiters: amountOfWaterMilliliters,
      plantId: plant.id,
      userId: 1,
      days: val,
    };
    UpdatePlantDays(dispatch, plantAction, () => setIsLoading(false));
  }

  return (
    <View>
      <LoadingModal
        modalVisible={isLoading}
        setModalVisible={setIsLoading}
      ></LoadingModal>
      <InputScreenModal
        keyboardType="numeric"
        text="Watering"
        setValue={setAmountOfWaterMilliliters}
        value={amountOfWaterMilliliters.toString()}
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
      ></InputScreenModal>
      <PlantWateringInfoComponent
        toggleModal={() => setIsModalOpen(true)}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        setValuesChanged={setValuesChanged}
        scheduleWatering={SavePlant}
        isEditing={isEditing}
        plantName={plant.name}
        amountOfWaterMilliliters={amountOfWaterMilliliters.toString()}
      ></PlantWateringInfoComponent>
      {isEditing ? (
        <ConfirmButton
          loading={false}
          onPress={() => {
            //SavePlant();
          }}
          text="Save"
        ></ConfirmButton>
      ) : null}
    </View>
  );
}
