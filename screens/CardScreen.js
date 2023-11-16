import { View, Text, Image, ScrollView, Icon} from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import { SafeAreaView, Button } from 'react-native'
import styles from '../styles'
import { TouchableOpacity } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { AntDesign } from '@expo/vector-icons';
import prompts from '../prompts/sociables.json';
import Swiper from 'react-native-deck-swiper'

const CardScreen = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
 
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, [])

  const handleBack = () => {
    ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    navigation.navigate("Home")
    return;
    }

    
  return (
    <SafeAreaView className="bg-blue-400 content-center" style={styles.AndroidSafeArea}>

        <View className="flex">
            <AntDesign onPress={handleBack} style={styles.backB} name="leftcircle" size={45} color="black"/>

            <Swiper
                cards={[...Array(56).keys()]}
                promptIndex={0}
                renderCard={(card) => {
                    return (
                        <View className="h-3/4 m-4 rounded-lg border-stone-200 border-2 justify-center bg-neutral-100 p-10">
                            <Text className='text-center text-5xl bg-transparent'>{card}</Text>
                        </View>
                    )
                }}
                onSwiped={(cardIndex) => console.log(cardIndex)}
                cardIndex={0}
                stackSize={2}>
            </Swiper>
        </View>

    </SafeAreaView>
  )
}

export default CardScreen