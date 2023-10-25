import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import styles from '../styles';
import { TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Audio } from 'expo-av';
import { render } from 'react-dom/cjs/react-dom.production.min';

const TimerScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [sound, setSound] = useState();
    const [round, setRound] = useState(1);

    let bgColor = 'bg-white';
    let textColor = '';

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
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
        const { sound } = await Audio.Sound.createAsync( require('../assets/timerNotification.mp3')
        );
        setSound(sound);
        if (Platform.OS === "ios") {
            await Audio.setAudioModeAsync({
              playsInSilentModeIOS: true,
            })};

        console.log('Playing Sound');
        await sound.playAsync();
    }
    
    const enableAudio = async () => {
        await setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: false,})}

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <Text style={{ fontSize: '80em' }} className="text-center font-bold">Drink!</Text>;
        }
    
    return (
        <View className="items-center justify-evenly h-screen">
            <Text style={{ fontSize: '80em' }} className="text-center font-bold">{remainingTime}</Text>
        </View>
        );
    };

    const renderTime2 = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <Text style={{ fontSize: '80em' }} className="text-center font-bold">Next!</Text>;
        }
    
    return (
        <View className="items-center justify-evenly h-screen">
            <Text style={{ fontSize: '50em' }} className="text-center font-bold">Round {round}</Text>
        </View>
        );
    };

    return (

        <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>
            <View className="items-center justify-evenly h-screen">
            <Text style={{ fontSize: '50em' }} className="text-center font-bold">Round {round}</Text>
            <CountdownCircleTimer
                        isPlaying
                        duration={3600}
                        size={250}
                        isGrowing={true}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[60, 30, 15, 0]}
                        onComplete={() => [false, 1000]}
                >
                        {renderTime2}
                    </CountdownCircleTimer>

                <CountdownCircleTimer
                        isPlaying
                        duration={3}
                        size={250}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[60, 30, 15, 0]}
                        onComplete={() => {playSound()  ;
                            setRound(round + 1) ;
                            if (round === 59){ 
                                return { shouldRepeat: false }
                            } ;
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