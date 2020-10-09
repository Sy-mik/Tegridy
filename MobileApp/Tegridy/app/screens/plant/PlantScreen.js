import * as React from 'react';
import { View } from "react-native";
import { webApiUri } from "../../services/apiCalls";
import PlantWateringInfoContainer from "./plantWateringInfoContainer.js";
import PlantHeaderInfoComponent from "./plantHeaderInfoComponent";

export default function PlantScreen({ route }) {
  const { plant } = route.params;
  const imageUri = plant.imageName
    ? webApiUri + "images/" + plant.imageName
    : plant.imageUri;
  const itemName = plant.name;


  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Text
  //         style={{ margin: 10, fontSize: 18, fontWeight: "500" }}
  //       >
  //         History
  //       </Text>
  //     ),
  //   });
  // }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <PlantHeaderInfoComponent
        imageUri={imageUri}
        itemName={itemName}
      ></PlantHeaderInfoComponent>
      <PlantWateringInfoContainer plant={plant}></PlantWateringInfoContainer>
    </View>
  );
}
