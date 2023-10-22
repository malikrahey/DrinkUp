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

    return (

        <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>
            <View className="flex items-center justify-evenly h-screen">
                <View className="space-y-2">

                    <TouchableOpacity onPress={() => setState({view: 1})} className="w-64 h-16 justify-center border rounded-lg bg-white">
                        <Text className="text-center font-bold">Centurion Challenge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setState({view: 2})} className="w-64 h-16 justify-center border rounded-lg bg-white">
                        <Text className="text-center font-bold">Power Hour Challenge</Text>
                    </TouchableOpacity>

                </View>

                {this.state.view === 1 ? <View1>

                </View1> : ''}

                {this.state.view === 2 ? <View2>

                </View2> : ''}

            </View>
        </SafeAreaView>
    )
}

export default TimerScreen