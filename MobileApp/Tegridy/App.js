import * as React from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import store from "./app/store/store";
import { Provider, useDispatch } from "react-redux";
import configureStore from "./app/store/store";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./app/navigation/navigation";
import AddPlantForm from "./app/screens/addPlantForm/AddPlantForm";
import FetchPlants from "./app/store/FetchPlants";
import FetchScheduled from "./app/store/FetchScheduled";
import FetchRules from "./app/store/FetchRules";

import { GetPlants, GetScheduled } from "./app/services/apiCalls";
import {
  fetchPlants,
  fetchScheduled,
  updateMarkedDates,
} from "./app/store/actions";

const RootStack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [toggleFetchData, setToggleFetchData] = React.useState();
  const containerRef = React.useRef();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        //SplashScreen.preventAutoHide(sŚSŚŚ);
        // await SplashScreen.preventAutoHideAsync();
        await prepareResources();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  prepareResources = async () => {
    await Promise.all([
      FetchRules(store.dispatch),
      FetchScheduled(store.dispatch),
      FetchPlants(store.dispatch),
    ]);
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <View style={{ width: "100%", padding: 10, alignItems: "center" }}>
          <Image
            style={{
              marginTop: -40,
              padding: 10,
              width: 200,
              height: 200,
              borderRadius: 20,
            }}
            source={require("./assets/splash/icon.png")}
          />
          <Text style={{ padding: 10, fontSize: 50, fontWeight: "bold" }}>
            Tegridy
          </Text>
          <ActivityIndicator style={{ padding: 10 }} size="large" />
        </View>
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <NavigationContainer
            theme={MyTheme}
            ref={containerRef}
            initialState={initialNavigationState}
          >
            <RootStack.Navigator mode="modal" headerMode="none">
              <RootStack.Screen name="Main" component={BottomTabNavigator} />
            </RootStack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
const tintColor = "#2f95dc";

const MyTheme = {
  dark: false,
  colors: {
    primary: tintColor,
    background: "#fff",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "#DCDCDC",
  },
  tintColor,
  tabIconDefault: "#ccc",
  tabIconSelected: tintColor,
  tabBar: "#fefefe",
  errorBackground: "red",
  errorText: "#fff",
  warningBackground: "#EAEB5E",
  warningText: "#666804",
  noticeBackground: tintColor,
  noticeText: "#fff",
  backgroundColor: "#fff",
};
