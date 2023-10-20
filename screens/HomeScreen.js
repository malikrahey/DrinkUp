import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native'
import styles from '../styles'
import { TouchableOpacity } from 'react-native'

const HomeScreen = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>
      
      <View className="flex items-center justify-evenly h-screen">

        <Text className="text-5xl font-bold text-center mt-4 bg-white p-6 rounded-xl shadow-md">DrinkUp🍻</Text>
        
        <View className="space-y-2">
          <TouchableOpacity onPress={() => navigation.navigate("Game")} className="w-64 h-16 justify-center border rounded-lg bg-white">
            <Text className="text-center font-bold">Around The Room</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled className="w-64 h-16 justify-center border rounded-lg bg-white">
            <Text className="text-center font-bold">By Name</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled className="w-64 h-16 justify-center border rounded-lg bg-white">
            <Text className="text-center font-bold">Create Custom Prompts</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen