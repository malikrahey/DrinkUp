import { View, Text, Image, ScrollView, Icon} from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import { SafeAreaView } from 'react-native'
import styles from '../styles'
import { TouchableOpacity } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import logo from '../assets/logo.png';

const HomeScreen = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
 
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, [])

  return (
    <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>
    
      <ScrollView>

      <View className="flex items-center justify-evenly h-screen">
        
      <Image style={styles.logo} source={logo}></Image>

        <View className="space-y-2">
          <TouchableOpacity onPress={() => navigation.navigate("Game")} className="w-64 h-16 justify-center rounded-lg bg-white">
            <Text className="text-center font-bold text-xl">Around The Room</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled className="w-64 h-16 justify-center rounded-lg bg-white">
            <Text className="text-center font-bold text-xl">By Name</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled className="w-64 h-16 justify-center rounded-lg bg-white">
            <Text className="text-center font-bold text-xl">Create Custom Prompts</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Power Hour")} className="w-64 h-16 justify-center rounded-lg bg-white">
            <Text className="text-center font-bold text-xl">Power Hour</Text>
          </TouchableOpacity>

        </View>
        
      </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen