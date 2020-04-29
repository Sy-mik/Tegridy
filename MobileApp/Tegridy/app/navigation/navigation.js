import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Entypo } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import PlantList from '../screens/PlantList';
import AddPlantForm from '../screens/addPlantForm/AddPlantForm';
import { createStackNavigator } from '@react-navigation/stack';
import AddPlantChoosingExisting from '../screens/plant/AddPlantChoosingExisting';
import ScheduledList from '../screens/Scheduled/ScheduledList';
import Plant from '../screens/plant/Plant';
import ScheduledActionForm from '../screens/Scheduled/ScheduledActionForm';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

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
                component={ScheduledList}               
                options={{
                  title: '',
                  tabBarIcon: ({isActive}) => <Entypo 
                  size={24}
                   name="time-slot" />,
                }}
        >
        </BottomTab.Screen>

      <BottomTab.Screen
        name="Links"
        options={{
          title: '',
          tabBarIcon: ({isActive}) => <Entypo size={24}  name="flower" />,
        }}
      >
            {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen name="Plants" component={PlantList} />
              <HomeStack.Screen name="Plant" component={Plant} />
              <HomeStack.Screen name="Choose Type" component={AddPlantChoosingExisting} />
              <HomeStack.Screen name="Add Plant" component={AddPlantForm} />
              <HomeStack.Screen name="Schedule Action" component={ScheduledActionForm} />
            </HomeStack.Navigator>
          )}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );


}


