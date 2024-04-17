import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import TimerScreen from './screens/TimerScreen';
import CardScreen from './screens/SociablesScreen';
import TriviaScreen from './screens/TriviaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Sociables" component={CardScreen} />
        <Stack.Screen name="Trivia" component={TriviaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

