import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import RoundTimerScreen from '../screens/RoundTimerScreen';
// import { BoldText } from '../components/styled-text';
// import AddUnsplashImage from '../screens/home/unsplash';

const Stack = createStackNavigator();

const HomeNavigation = () => {
  const { goBack } = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => null,
        headerStyle: {
          borderBottomColor: '#eee',
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontFamily: 'InterBold',
          fontSize: 24,
          color: '#000',
        },
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="round-timer"
        component={RoundTimerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
