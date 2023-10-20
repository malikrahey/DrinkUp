import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import prompts from '../prompts/around-the-room-classic.json';
import { SafeAreaView } from 'react-native';
import styles from '../styles';
import { TouchableOpacity } from 'react-native';

const GameScreen = ({navigation}) => {

  
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  
  let bgColor = 'bg-white';
  let textColor = '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const handleNext = () => {
    const nextIndex = currentIndex+1;
    if (nextIndex >= prompts.length) {
      navigation.navigate("Home")
      return;
    }
    setCurrentIndex(nextIndex);
    setCurrentPrompt(prompts[nextIndex])
  }


  switch (currentPrompt?.type) {
    case "game":
      bgColor = 'bg-green-400';
      break;
    case "jury":
      bgColor = 'bg-purple-400';
      break;
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View className={`${bgColor} flex items-center h-full`}>
        <TouchableOpacity onPress={handleNext}>
          {currentPrompt?.type !== 'general' ? (
           <Text className='text-2xl font-bold'>{currentPrompt?.title}</Text> 
          ) : null}
          <Text className="text-lg">
            {currentPrompt?.prompt}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default GameScreen