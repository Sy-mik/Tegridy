import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import store from './app/store/store'; 
import { Provider } from 'react-redux';
import configureStore from './app/store/store';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './app/navigation/navigation';
import ScheduledItemModal from './app/screens/Scheduled/ScheduledItemModal';
import AddPlantForm from './app/screens/addPlantForm/AddPlantForm';


const RootStack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const  [toggleFetchData, setToggleFetchData] = React.useState();
  const containerRef = React.useRef();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        //SplashScreen.preventAutoHide(sŚSŚŚ);

        // Load our initial navigation state
      //  setInitialNavigationState(await getInitialState());

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
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer theme={MyTheme} ref={containerRef} initialState={initialNavigationState}>
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
    backgroundColor: '#fff',
  },
});
const tintColor = '#2f95dc';

const MyTheme = {
  dark: false,
  colors: {
    primary: tintColor,
    background: '#fff',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: '#DCDCDC',
  },
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  backgroundColor: '#fff'
};
