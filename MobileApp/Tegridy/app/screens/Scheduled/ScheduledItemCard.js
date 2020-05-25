import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { webApiUri } from "../../services/apiCalls";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Colors from "./../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ScheduledItemCard({item, onClick}) {
  const imageUri = item.imageName
    ? webApiUri + "images/" + item.imageName
    : item.imageUri;

  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(item.scheduledDate);
  let convertedDate =
    weekday[date.getDay()] + " " + date.getHours() + ":" + date.getMinutes();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: 160, height: 150, marginLeft: 30 }}
      onPress={() => onClick(item) }
    >
      <View
        style={{
          width: 160,
          height: 150,
        }}
      >
        <Image
          style={styles.cardImage}
          source={{
            uri: item.imageName
              ? webApiUri + "images/" + item.imageName
              : item.imageUri,
          }}
        />
        <View>
          <Feather
            style={{
              position: "absolute",
              bottom: 5,
              color: "white",
              marginLeft: 5,
              marginRight: "auto",
            }}
            size={20}
            // color="white"
            name="cloud-drizzle"
          />
        </View>
        <View style={styles.iconsInfo}>
          <Text style={styles.cardTitle}>{item.name} </Text>
        </View>
        <View style={styles.iconsInfo}>
          <Text style={styles.dayOfWeekText}>{convertedDate} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconsInfo: {
    marginLeft: 5,
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
  },
  dayOfWeekText: {
    color: Colors.lessImportantText,
  },

  cardHighlight: {
    width: 150,
    height: 120,
    borderRadius: 10,
  },
  cardImage: {
    borderRadius: 10,
    width: 160,
    height: 100,
  },
  cardTitle: {
    flex: 1,
    fontSize: 20,
  },
});
