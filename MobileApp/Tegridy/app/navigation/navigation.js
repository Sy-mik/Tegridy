import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import PlantList from "../screens/PlantList";
import AddPlantForm from "../screens/addPlantForm/AddPlantForm";
import { createStackNavigator } from "@react-navigation/stack";
import ScheduledActionForm from "../screens/Scheduled/ScheduledActionForm";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlantTypes from "../screens/PlantTypes";
import ScheduledListScreen from "../screens/ScheduledListScreen";
import PlantScreen from "../screens/plant/PlantScreen";
import { StatusBar } from "react-native";
const BottomTab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  //    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      options={{
        title: "",
        title: "My home",
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={ScheduledListScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          tabBarIcon: ({ focused }) => (
            <TouchableOpacity>
              <Feather
                style={{ padding: 10 }}
                name="home"
                size={25}
                color={focused ? "green" : "grey"}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <BottomTab.Screen
        name="Links"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity>
              <Entypo
                style={{ padding: 10 }}
                size={25}
                name="list"
                color={focused ? "green" : "grey"}
              />
            </TouchableOpacity>
          ),
        }}
      >
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Plants" component={PlantList} />
            <HomeStack.Screen name="Plant" component={PlantScreen} />
            <HomeStack.Screen name="Choose Type" component={PlantTypes} />
            <HomeStack.Screen name="Add Plant" component={AddPlantForm} />
            <HomeStack.Screen
              name="Schedule Action"
              component={ScheduledActionForm}
            />
          </HomeStack.Navigator>
        )}
      </BottomTab.Screen>
      <BottomTab.Screen
        name="Plant types"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity>
              <Ionicons
                style={{ padding: 10 }}
                name="md-flower"
                size={25}
                color={focused ? "green" : "grey"}
              />
            </TouchableOpacity>
          ),
        }}
      >
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Plant types" component={PlantTypes} />
          </HomeStack.Navigator>
        )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}
