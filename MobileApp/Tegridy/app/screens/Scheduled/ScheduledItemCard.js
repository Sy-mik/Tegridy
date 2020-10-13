import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { webApiUri } from "../../services/apiCalls";
import { Feather } from "@expo/vector-icons";
import Colors from "./../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ScheduledItemCard({ item, onClick }) {
  function parseNumber(number) {
    number = new Number(number);
    if (number > 3 && number < 21) {
      return number + "th";
    }
    let date = "";
    let dateNumber = number % 10;
    if (dateNumber == 1) {
      date = number + "st";
    } else if (dateNumber == 2) {
      date += number + "nd";
    } else if (dateNumber == 3) {
      date = number + "rd";
    } else {
      date = number + "th";
    }

    return date;
  }

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

  let convertedWeekDay =
    weekday[date.getDay()] + " " + parseNumber(date.getDate());

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: 160, height: 155, marginLeft: 30 }}
      onPress={() => {
        onClick(item);
      }}
    >
      <View
        style={{
          width: 160,
          height: 155,
        }}
      >
        <Image
          style={styles.cardImage}
          source={{
            uri: item.imageUri,
          }}
        />
        <View>
          {/* <Feather
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
          /> */}
        </View>
        <View style={styles.iconsInfo}>
          <Text style={styles.cardTitle}>{item.name.toString()} </Text>
        </View>
        <View style={styles.iconsInfo}>
          <Text style={styles.dayOfWeekText}>
            {convertedWeekDay.toString()}
          </Text>
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
    paddingTop: 5,
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
