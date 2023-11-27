import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import prompts from '../prompts/trivia.json';
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


const TriviaScreen = ({navigation}) => {
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexList, setIndexList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  
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

    if (step < 2) {
      setStep(step+1);
    }
    else {

      const nextIndex = currentIndex+1;
      if (nextIndex >= prompts.length) {
        ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        navigation.navigate("Home")
        return;
      }
      setCurrentIndex(nextIndex);
      setCurrentPrompt(prompts[indexList[nextIndex]]);
      setStep(0);

    }
  }

  const handleBack = () => {
    ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    navigation.navigate("Home")
    return;
  }

  switch (currentPrompt?.category) {
    case "Geography":
      bgColor = 'bg-yellow-400';
      break;
    case "History":
      bgColor = 'bg-amber-400';
      break;
    case "Science":
      bgColor = 'bg-green-400'
      break;
    case "Literature":
      bgColor = 'bg-blue-400'
      break;
    case "Sports":
      bgColor = 'bg-orange-400'
      break;
    case "Technology":
      bgColor = 'bg-blue-200'
      break;
    case "Pop Culture":
      bgColor = 'bg-pink-400'
      break;
    case "Music":
      bgColor = 'bg-teal-400'
      break;
  }

  return (
    <SafeAreaView  className={`${bgColor}`} style={styles.AndroidSafeArea}>
      {loading ? (
       <>
       </> 
      ) : (
      <TouchableOpacity onPress={handleNext} className={`${bgColor} flex items-center h-full justify-center rounded-b-xl`}>
        <AntDesign onPress={handleBack} style={styles.backB} name="leftcircle" size={45} color="black" />
        <TouchableOpacity className="text-center" onPress={handleNext}>
          <Text className='text-4xl font-bold text-center'>{currentPrompt?.category}</Text> 
          
          {step > 0 && (
            <View>
              <Text className="text-3xl m-4 font-semibold">
                {currentPrompt?.question}
              </Text>
            </View>
          )}

          {step > 1 && (
            <Text className="text-neutral-800 text-3xl m-4 font-semibold text-center">
              {currentPrompt?.answer}
            </Text>
          )}

          
        </TouchableOpacity>
      </TouchableOpacity>
      )}
      
    </SafeAreaView>
  )
}

export default TriviaScreen