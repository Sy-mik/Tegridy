import * as React from "react";
import { useDispatch } from "react-redux";
import * as signalR from "@aspnet/signalr";

export const webApiUri = "http://ca78c6305619.ngrok.io/";
//const webApiUri = 'http://localhost:5000/'

const plantsActionsHub = "plantsActionsHub/";
const plantsUri = "Plants/";
const userUri = "user/";
const scheduledActionsUri = "scheduledActions/";
const rulesUri = "rules/";
const typesUri = "types/";

export function RemoveScheduled(id) {
  return fetch(webApiUri + scheduledActionsUri + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export async function InvokeAction(actionId) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(webApiUri + plantsActionsHub)
    .build();

  await connection.start();

  connection.on("updateActionResult", (data) => {
    listenOnActionResult(data);
  });

  connection.invoke("invokeAction", actionId).then(() => {});
}

export async function listenOnActionResult(data) {
  // Update View
}

export function InvokeWatering(wateringId) {
  return fetch(webApiUri + scheduledActionsUri + wateringId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function GetSuggestedActionForPlant(plantId) {
  return fetch(webApiUri + scheduledActionsUri + plantsUri + plantId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function RemovePlant(plantId) {
  return fetch(webApiUri + plantsUri + plantId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function AddPlantAction(action) {
  action.userId = getUserId();
  return fetch(webApiUri + scheduledActionsUri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action),
  });
}

export function UpdatePlantActionDate(id, date) {
  let userId = getUserId();
  return fetch(webApiUri + scheduledActionsUri + id + "/ScheduledDate", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scheduledDate: date,
    }),
  });
}

export function GetRules() {
  let userId = getUserId();
  return fetch(webApiUri + rulesUri + userUri + userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function UpdatePlantActionStatus(id) {
  let userId = getUserId();
  return fetch(webApiUri + scheduledActionsUri + id + "/Status", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
}

export function AddPlant(plant, image) {
  plant.userId = getUserId();
  const data = new FormData();
  data.append("photo", {
    name: "image",
    type: image.type,
    base64: image.base64,
  });

  Object.keys(plant).forEach((key) => {
    data.append(key, plant[key]);
  });

  return fetch(webApiUri + plantsUri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    body: data,
  });
}

export function GetPlants() {
  return fetch(webApiUri + plantsUri + userUri + getUserId(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function GetTypes() {
  return fetch(webApiUri + plantsUri + typesUri, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function GetScheduled() {
  return fetch(webApiUri + scheduledActionsUri + userUri + getUserId(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export function CheckConnection() {
  return fetch(webApiUri + "Ping", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

function getUserId() {
  return 1;
}
