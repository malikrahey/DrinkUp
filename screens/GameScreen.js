import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import prompts from '../prompts/around-the-room-classic.json';
import { SafeAreaView } from 'react-native';
import styles from '../styles';
import { TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AntDesign } from '@expo/vector-icons';


const randomizeIndexList = (maxIndex) => {
  const list = Array.from({ length: maxIndex }, (_, i) => i);

  for (let i = list.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [list[i], list[j]] = [list[j], list[i]]
  }

  return list;
}

const GameScreen = ({navigation}) => {

  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexList, setIndexList] = useState([]);
  const [loading, setLoading] = useState(true);

  
  let bgColor = 'bg-white';
  let textColor = '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

  }, [])

  useEffect(() => {
    const generatedIndexOrder = randomizeIndexList(prompts.length);
    setIndexList(generatedIndexOrder);
    setCurrentPrompt(prompts[generatedIndexOrder[currentIndex]]);
    setLoading(false);
    console.log('done loading');
  }, [])

  const handleNext = () => {
    const nextIndex = currentIndex+1;
    if (nextIndex >= prompts.length) {
      ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      navigation.navigate("Home")
      return;
    }
    setCurrentIndex(nextIndex);
    setCurrentPrompt(prompts[indexList[nextIndex]])
  }

  const handleBack = () => {
    ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    navigation.navigate("Home")
    return;
  }

  switch (currentPrompt?.type) {
    case "game":
      bgColor = 'bg-green-400';
      break;
    case "jury":
      bgColor = 'bg-purple-400';
      break;
    case "vote":
      bgColor = 'bg-blue-400'
      break;
    case "virus":
      bgColor = 'bg-yellow-400'
      break;
  }

  return (
    <View>
      {loading ? (
       <>
       </> 
      ) : (
      <TouchableOpacity onPress={handleNext} className={`${bgColor} flex items-center h-full justify-center rounded-b-lg`}>
        <AntDesign onPress={handleBack} style={styles.backB} name="leftcircle" size={45} color="black" />
        <TouchableOpacity onPress={handleNext}>
          {currentPrompt?.type !== 'general' ? (
           <Text className='text-4xl font-bold text-center'>{currentPrompt?.title}</Text> 
          ) : null}
          <Text className="text-2xl m-4 font-semibold">
            {currentPrompt?.prompt}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      )}
      
    </View>
  )
}

export default GameScreen