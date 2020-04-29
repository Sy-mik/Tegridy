
import * as React from 'react';
import { useDispatch } from "react-redux";

const webApiUri = 'http://localhost:8080/'
const plantsUri = 'Plants/';
const userUri = 'user/';
const scheduledActionsUri = 'ScheduledActions/';
const typesUri = 'types/'

export function RemoveScheduled(auditId){
  return fetch(webApiUri + scheduledActionsUri + auditId, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function InvokeWatering(wateringId) {
  return fetch(webApiUri + scheduledActionsUri + wateringId, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function GetSuggestedActionForPlant(plantId) {
  return fetch(webApiUri + scheduledActionsUri + plantsUri + plantId, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function RemovePlant(plantId) {
  return fetch(webApiUri + plantsUri + plantId, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function AddPlantAction(action){
  action.userId = getUserId();
  return fetch(webApiUri + scheduledActionsUri, {
    method: 'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      },
      body:JSON.stringify(action)
  });
}

export function AddPlant(plant){
  // plant.userId = getUserId();
  return fetch(webApiUri + plantsUri, {
    method: 'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      },
      body:JSON.stringify(plant)
  });
}
export function GetPlants() {
  return fetch(webApiUri + plantsUri + userUri + getUserId(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

export function GetTypes() {
  return fetch(webApiUri + plantsUri + typesUri, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

export function GetScheduled() {
  return fetch(webApiUri + scheduledActionsUri + userUri + getUserId(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

function getUserId() {
  return 1;
}