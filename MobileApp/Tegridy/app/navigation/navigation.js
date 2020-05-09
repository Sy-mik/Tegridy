import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import TabBarIcon from "../components/TabBarIcon";
import PlantList from "../screens/PlantList";
import AddPlantForm from "../screens/addPlantForm/AddPlantForm";
import { createStackNavigator } from "@react-navigation/stack";
import AddPlantChoosingExisting from "../screens/plant/AddPlantChoosingExisting";
import ScheduledList from "../screens/Scheduled/ScheduledList";
import Plant from "../screens/plant/Plant";
import ScheduledActionForm from "../screens/Scheduled/ScheduledActionForm";
import ScheduledItemModal from "../screens/Scheduled/ScheduledItemModal";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlantTypes from "../screens/PlantTypes";
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

const HomeStack = createStackNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  //    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        options={{
          title: "",
          tabBarIcon: ({ isActive }) => (
            <TouchableOpacity>
              <Feather
                style={{ padding: 10 }}
                name="home"
                size={25}
                color="grey"
              />
            </TouchableOpacity>
          ),
        }}
      >
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen
              name="Scheduled items"
              component={ScheduledList}
            />
            <HomeStack.Screen name="Scheduled" component={ScheduledItemModal} />
          </HomeStack.Navigator>
        )}
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Links"
        options={{
          title: "",
          tabBarIcon: ({ isActive }) => (
            <TouchableOpacity>
              <Entypo
                style={{ padding: 10 }}
                color="grey"
                size={25}
                name="list"
              />
            </TouchableOpacity>
          ),
        }}
      >
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Plants" component={PlantList} />
            <HomeStack.Screen name="Plant" component={Plant} />
            <HomeStack.Screen
              name="Choose Type"
              component={AddPlantChoosingExisting}
            />
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
          tabBarIcon: ({ isActive }) => (
            <TouchableOpacity>
              <Ionicons
                style={{ padding: 10 }}
                name="md-flower"
                size={25}
                color="grey"
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
