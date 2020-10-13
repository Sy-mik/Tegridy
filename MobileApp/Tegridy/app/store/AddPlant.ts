import React from "react";
import {
  addPlant,
  closeOperationModal,
  openOperationModal,
  updatePlant,
} from "./actions";
import { GetRules } from "../services/apiCalls";
import AsyncStorage from "@react-native-community/async-storage";
import * as FileSystem from "expo-file-system";

export function AddPlant(dispatch, value, image) {
  value.imageUri = fileUri(value.imageName);
  dispatch(openOperationModal(value));

  storeData(value.imageName, image.base64);
  dispatch(addPlant(value));
  dispatch(closeOperationModal(value));
}
const dir = FileSystem.cacheDirectory + "plants/";

const storeData = async (id, value) => {
  await ensureDirExists(dir);
  await FileSystem.writeAsStringAsync(fileUri(id), value, {
    encoding: FileSystem.EncodingType.Base64,
  });
  console.log(`stored image in ${fileUri(id)}`);
}; //

const fileUri = (id) => dir + `${id}.jpg`;

async function ensureDirExists(dir) {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

// Deletes whole giphy directory with all its content
export async function deleteAllGifs() {
  console.log("Deleting all GIF files...");
  await FileSystem.deleteAsync(dir);
}

export class Plant {
  public wateringInMililiters: number;
  public plantId: string;
  public userId: number;
  public days: number;
  public rule: Rule;
  constructor() {
    this.rule = new Rule();
  }
}

export class Rule {}
