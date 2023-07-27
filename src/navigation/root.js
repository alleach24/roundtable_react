import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
// import AuthNavigation from "./auth";
import { NavigationContainer } from '@react-navigation/native';

import HomeNavigation from './home';

const Stack = createStackNavigator();

const RootNavigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen name="home-stack" component={HomeNavigation} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigation;
