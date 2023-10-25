import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import styles from '../styles';
import { TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const TimerScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [show, toggleShow] = useState(true);
    const [screen, setScreen] = useState(0);

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
        console.log('done loading');
    }, [])

    return (

        <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>
            <View className="flex items-center justify-evenly h-screen">
                {show && <View className="space-y-2">

                    <TouchableOpacity onPress = {() => setScreen(1)} onPressIn = {() => toggleShow(!show)} className="w-64 h-16 justify-center rounded-lg bg-white">
                        <Text className="text-center font-bold text-xl">Centurion Challenge</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setScreen(2)} onPressIn = {() => toggleShow(show)} className="w-64 h-16 justify-center rounded-lg bg-white">
                        <Text className="text-center font-bold text-xl">Power Hour Challenge</Text>
                    </TouchableOpacity>

                </View>}

                <View>

                    {screen == "1" ? (
                        <View>
                            <Text className="text-center font-bold text-xl">Centurion Challenge</Text>
                        </View>

                        ) : screen == "2" ? (
                        <View>
                            <Text className="text-center font-bold text-xl">Power Hour Challenge</Text>
                        </View>

                        ) : (
                        <View>
                    
                        </View>
                        )}

                </View>

            </View>
        </SafeAreaView>
    )
}

export default TimerScreen