import React, { Component, useState, useEffect } from "react";
import Dialog from "react-native-dialog";

export default function InputDialog({isAlertOpen, setIsAlertOpen, setWaterInMilililiter}) {
    return (
      <Dialog.Container visible={isAlertOpen}>
        <Dialog.Title>Set value</Dialog.Title>
        <Dialog.Input
          onChangeText={(value) => setWaterInMilililiter(value)}
        ></Dialog.Input>

        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setIsAlertOpen(false);
          }}
        />
        <Dialog.Button
          label="Ok"
          onPress={() => {
            setIsAlertOpen(false);
            setWaterInMilililiter();
          }}
        />
      </Dialog.Container>
    );
  }