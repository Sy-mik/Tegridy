import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ScheduledItemCard(item) {
  const navigation = useNavigation();
  item = item.children;
  let date = new Date(item.scheduledDate);

  let convertedDate = date.getDate() + "/" +
    date.getMonth() + " " +date.getHours() + ":" + date.getMinutes();

  return (
    <View style={styles.card}>
      <TouchableHighlight
        underlayColor="#fff"
        style={styles.cardHighlight}
        onPress={() => navigation.navigate("MyModal", { item })}
      >
        <View>
          <Image
            style={styles.cardImage}
            resizeMode="cover"
            source={{ uri: item.imageUri }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardTitle}>{convertedDate}</Text>
            <Text style={styles.cardTitle}>
              {item.amountOfWaterMilliliters}ml
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginBottom: 20,
    margin: "auto",
    height: 450,
    width: 400,
    borderRadius: 30,
    borderColor: "#323232",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 25,
  },
  cardHighlight: {
    height: 450,
    width: 400,
    borderRadius: 30,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  cardImage: {
    width: 400,
    height: 400,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
  },
  cardTitle: {
    fontSize: 20,
    padding: 10,
    marginRight: 20,
  },
});
