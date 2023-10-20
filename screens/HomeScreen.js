import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import styles from '../styles'
import { TouchableOpacity } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { Button } from 'react-native'

const HomeScreen = ({navigation}) => {

  const [step, setStep] = useState(0);
  const [names, setNames] = useState(['', '', '']); // Initialize with 3 empty strings

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
 
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, [])

  const handleNameChange = (text, index) => {
    const newNames = [...names];
    newNames[index] = text;
    setNames(newNames);
  };

  const addNewNameField = () => {
    setNames([...names, '']);
  };

  const handleContinue = () => {
    // Here you can send the names somewhere or navigate to another screen
    console.log(names);
  };

  const handleBack = () => {
    setStep(0);
  }



  return (
    <SafeAreaView className="bg-neutral-100" style={styles.AndroidSafeArea}>
      
      <View className="flex items-center justify-evenly h-screen">

        <Text className="text-5xl font-bold text-center mt-4 bg-white p-6 rounded-xl shadow-md">DrinkUp🍻</Text>
        
        {step === 0 && (

          <View className="space-y-2">
            <TouchableOpacity onPress={() => navigation.navigate("Game")} className="w-64 h-16 justify-center border rounded-lg bg-white">
              <Text className="text-center font-bold">Around The Room</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep(1)} className="w-64 h-16 justify-center border rounded-lg bg-white">
              <Text className="text-center font-bold">By Name</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled className="w-64 h-16 justify-center border rounded-lg bg-white">
              <Text className="text-center font-bold">Create Custom Prompts</Text>
            </TouchableOpacity>
          </View>

        )}
        {step === 1 && (
          <ScrollView className="h-full w-full bg-gray-100">
          <View className="p-5">
            {names.map((name, index) => (
              <TextInput
                key={index}
                value={name}
                onChangeText={(text) => handleNameChange(text, index)}
                className="bg-white p-3 my-2 border rounded"
                placeholder={`Name ${index + 1}`}
              />
            ))}
    
              <View className="space-y-2">

              <View className="">
                
                <Button onPress={addNewNameField} title="+" />
              </View>
              <View>  
                <Button onPress={handleContinue} title="Continue" className="mt-4" />
              </View>

              <View>  
                <Button onPress={handleBack} title="Back" className="mt-4" />
              </View>
              </View>
            
          </View>
        </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen