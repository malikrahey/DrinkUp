import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import styles from '../styles';
import { TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Audio } from 'expo-av';
import { render } from 'react-dom/cjs/react-dom.production.min';
import { AntDesign } from '@expo/vector-icons';

const TimerScreen = ({ navigation }) => {

  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState();
  const [round, setRound] = useState(1);

  let bgColor = 'bg-white';
  let textColor = '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, [])

  useEffect(() => {
    setLoading(false);
    setRound(round)
    console.log('done loading');
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../assets/timerNotification.mp3')
    );
    setSound(sound);
    if (Platform.OS === "ios") {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      })
    };

    console.log('Playing Sound');
    await sound.playAsync();
  }

  const enableAudio = async () => {
    await setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: false,
    })
  }

  const handleBack = () => {
    ScreenOrientation.unlockAsync();
    navigation.navigate("Home")
    return;
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <Text className="text-center font-bold text-5xl">Drink!</Text>;
    }

    return (
      <View className="items-center justify-evenly h-screen">
        <Text className="text-center font-bold text-6xl">{remainingTime}</Text>
      </View>
    );
  };

  const renderTime2 = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <Text className="text-center font-bold text-5xl">Next!</Text>;
    }

    return (
      <View className="items-center justify-evenly h-screen">
        <Text className="text-center font-bold text-5xl">Round {"\n"} {round}</Text>
      </View>
    );
  };

  return (

    <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>
      <ScrollView>

      <View className="items-center py-20 h-screen">
        <AntDesign onPress={handleBack} style={styles.backB} name="leftcircle" size={45} color="black" />
        <Text className="text-center font-bold text-5xl pb-6">Power Hour Timer</Text>

        <CountdownCircleTimer
          isPlaying
          duration={3600}
          size={250}
          isGrowing={true}
          strokeWidth={20}
          rotation={'counterclockwise'}
          colors={['#66bb6a', '#ffea00', '#ffa726', '#ef5350']}
          colorsTime={[3600, 2700, 1200, 300]}
          onComplete={() => [false, 1000]}
        >
          {renderTime2}
        </CountdownCircleTimer>
        <Text className="text-center font-bold font-xl"> {"\n"} </Text>
        <CountdownCircleTimer
          isPlaying
          duration={60}
          size={250}
          strokeWidth={20}
          colors={['#66bb6a', '#ffea00', '#ffa726', '#ef5350']}
          colorsTime={[60, 30, 15, 0]}
          onComplete={() => {
            playSound();
            setRound(round + 1);
            if (round === 59) {
              return { shouldRepeat: false }
            };
            return { shouldRepeat: true, delay: 1 }
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TimerScreen