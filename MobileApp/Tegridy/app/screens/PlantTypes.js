import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GetPlants } from "../services/apiCalls";
import { fetchScheduled, fetchPlants } from "../store/actions";

import { useDispatch, useSelector } from "react-redux";
import FetchPlants from "../store/FetchPlants";

export default function PlantTypes() {
  return <View></View>;
}
