import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import styles from '../styles';
import { TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const TimerScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(true);

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

    const handleBack = () => {
          navigation.navigate("Home")
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
          return;
      }

    return (

        <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>

            <View className="flex items-center justify-evenly h-screen">

                <View className="space-y-2">

                    <TouchableOpacity disabled className="w-64 h-16 justify-center border rounded-lg bg-white">
                        <Text className="text-center font-bold">Centurion Challenge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled className="w-64 h-16 justify-center border rounded-lg bg-white">
                        <Text className="text-center font-bold">Power Hour Challenge</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    )
}

export default TimerScreen