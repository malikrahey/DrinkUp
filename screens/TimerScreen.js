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
  const [round, setRound] = useState(0);
  const [start, setStart] = useState(false);
  const [isVisible, setVisible] = useState();
  const [time, setTime] = useState(0);
  const [mode, setMode] = useState(0);

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

  const handlePH = () => {
    setTime(3660)
    setMode(59)
    setStart(true)
    setVisible('hidden')
    return;
  }

  const handleCC = () => {
    setTime(6060)
    setMode(89)
    setStart(true)
    setVisible('hidden')
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
      return <Text className="text-center font-bold text-5xl">Done!</Text>;
    }
    if (round === 0) {
      return <Text className="text-center font-bold text-5xl">Get {"\n"} Ready!</Text>;
    }

    return (
      <View className="items-center justify-evenly h-screen">
        <Text className="text-center font-bold text-5xl">Round {"\n"} {round}</Text>
      </View>
    );
  };

  return (

    <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>
      <View className={isVisible}>
        <View className="items-center py-20 h-screen justify-center position-fixed">
        <AntDesign onPress={handleBack} style={styles.backB} name="leftcircle" size={45} color="black" />
        
        <Text className="text-center font-bold text-3xl pb-6">Select your mode:</Text>

        <View className="space-y-3 p-8">
          <TouchableOpacity onPress={handlePH} className="w-64 h-16 justify-center rounded-lg bg-white">
            <Text className="text-center font-bold text-2xl">Power Hour</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCC} className="w-64 h-16 justify-center rounded-lg bg-white">
            <Text className="text-center font-bold text-2xl">Centurion Challenge</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>


      <View className="items-center py-20 h-screen position-fixed">
        <AntDesign onPress={handleBack} style={styles.backB} name="leftcircle" size={45} color="black" />
        <Text className="text-center font-bold text-5xl pb-6">Power Hour Timer</Text>

        <CountdownCircleTimer
          isPlaying={start}
          duration={time}
          size={250}
          isGrowing={true}
          strokeWidth={20}
          rotation={'counterclockwise'}
          colors={['#66bb6a', '#ffea00', '#ffa726', '#ef5350']}
          colorsTime={[6039, 4455, 728, 496]}
          onComplete={() => [false, 1000]}
        >
          {renderTime2}
        </CountdownCircleTimer>
        <Text className="text-center font-bold font-xl"> {"\n"} </Text>
        <CountdownCircleTimer
          isPlaying={start}
          duration={60}
          size={250}
          strokeWidth={20}
          colors={['#66bb6a', '#ffea00', '#ffa726', '#ef5350']}
          colorsTime={[60, 30, 15, 0]}
          onComplete={() => {
            playSound();
            setRound(round + 1);
            if (round === mode) {
              return { shouldRepeat: false }
            };
            return { shouldRepeat: true, delay: 1 }
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </View>
    </SafeAreaView>
  )
}

export default TimerScreen