import * as React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PlantWateringInfoContainer from "./plantWateringInfoContainer.js";
import PlantHeaderInfoComponent from "./plantHeaderInfoComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import ConfirmButton from "../../components/ConfirmButton.js";

export default function PlantScreen({ route }) {
  const { plant } = route.params;
  const itemName = plant.name;
  const [isEditing, setIsEditing] = React.useState(false);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !isEditing ? (
          <TouchableOpacity
            onLongPress={() => {
              onPress();
            }}
            onPress={() => setIsEditing(true)}
          >
            <Text style={{ marginRight: 16, fontSize: 18, fontWeight: "500" }}>
              Edit
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onLongPress={() => {
              onPress();
            }}
            onPress={() => {
              setIsEditing(false);
            }}
          >
            <Text style={{ marginRight: 16, fontSize: 18, fontWeight: "500" }}>
              Cancel
            </Text>
          </TouchableOpacity>
        ),
    });
  }, [isEditing]);

  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        // justifyContent: "space-between",
      }}
    >
      <PlantHeaderInfoComponent
        imageUri={plant.imageUri}
        itemName={itemName}
        isEditing={isEditing}
        item={
          <PlantWateringInfoContainer
            isEditing={isEditing}
            plant={plant}
          ></PlantWateringInfoContainer>
        }
      ></PlantHeaderInfoComponent>
    </View>
  );
}
