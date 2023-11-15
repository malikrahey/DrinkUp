import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import TimerScreen from './screens/TimerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Power Hour" component={TimerScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

