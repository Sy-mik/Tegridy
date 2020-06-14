import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GetPlants, webApiUri } from "../services/apiCalls";
import { fetchScheduled, fetchPlants } from "../store/actions";

import { useDispatch, useSelector } from "react-redux";
import FetchPlants from "../store/FetchPlants";
import PlantListContainer from "./plant/PlantListContainer";

export default function PlantList() {
  return (<PlantListContainer></PlantListContainer>);
}
