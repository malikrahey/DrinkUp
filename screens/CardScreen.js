import { View, Text, Image, ScrollView, Icon} from 'react-native'
import React, { useLayoutEffect, useState} from 'react'
import { SafeAreaView, Button } from 'react-native'
import styles from '../styles'
import { TouchableOpacity } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { AntDesign } from '@expo/vector-icons';
import prompts from '../prompts/sociables.json';
import Swiper from 'react-native-deck-swiper'
import { useEffect } from 'react'

const suits = [
  "♠",
  "♥",
  "♦",
  "♣"
];

const cards = [
  {
    "value": "A",
    "title": "Sociables",
    "prompt": "Everybody drinks!"
  },
  {
    "value": "2",
    "title": "Give Two",
    "prompt": "Give a player two drinks, or two players one drink."
  }, 
  {
    "value": "3",
    "title": "Take Two",
    "prompt": "Take two drinks. Obviously."
  },
  {
    "value": "4",
    "title": "Buddy System",
    "prompt": "Pick a buddy. When one drinks, so does their buddy until the next buddy system card is drawn."
  },
  {
    "value": "5",
    "title": "Never Have I Ever",
    "prompt": "All players raise three fingers. Go around in a circle confessing something you have never done. If someone has done it put a finger down. When someone has three fingers down the game ends, drink as many times as you have fingers down."
  },
  {
    "value": "6",
    "title": "Question",
    "prompt": "Ask someone around the table a question. If they refuse to answer then they need to finish their drink. "
  }, 
  {
    "value": "7",
    "title": "Thumb Card",
    "prompt": "You are now the 'Thumb Master'. Any time you place your thumb on the table, every other player must immediately place their thumb on the table as well. The last person to do so must take a drink. This can be done repeatedly until another thumb card is drawn."
  },
  {
    "value": "8",
    "title": "Categories",
    "prompt": "Selects a category. All players go around the circle naming items that are from that category. The first player to fail to name an item must drink."
  },
  {
    "value": "9",
    "title": "Rule Card",
    "prompt": "Create a new rule. Rules can be anything. If a player fails to follow the rule, they must drink. This rule remains in effect until another Rule Card is drawn."
  },
  {
    "value": "10",
    "title": "Waterfall",
    "prompt": "Begin drinking. The player clockwise to you must begin drinking immediately after you, and then the next player around the circle until all players are drinking. Once it comes back to you, stop drinking. Then the player clockwise to you may stop drinking, and so on until the end of the circle."
  },
  {
    "value": "J",
    "title": "Men Drink",
    "prompt": "If you are a guy take a drink!"
  },
  {
    "value": "Q",
    "title": "Women Drink",
    "prompt": "If you are a lady take a drink!"
  },
  {
    "value": "K",
    "title": "King's Cup",
    "prompt": "Pour some of your drink in the cup of the middle. If you are the last to draw the card, finish the drink!"
  },
]

const randomizeDeck = (deck) => {
  const list = Array.from({ length: deck.length }, (_, i) => i);

  for (let i = list.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [deck[i], deck[j]] = [deck[j], deck[i]]
  }

  return deck;
}

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

  const [deck, setDeck] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const newDeck = [];
    suits.forEach(suit => {
      cards.forEach(card => {
        const deckCard = {...card}
        deckCard["suit"] = suit;
        newDeck.push(deckCard);
      }
      )
    })


    const shuffledDeck = randomizeDeck(newDeck);
    setLoading(false);
    setDeck(shuffledDeck);
    console.log('done loading');
  }, [])

    
  return (
    <SafeAreaView className="bg-blue-400 content-center" style={styles.AndroidSafeArea}>

        <View className="flex">
            <AntDesign onPress={handleBack} style={styles.backB} name="leftcircle" size={45} color="black"/>

            <Swiper
                cards={deck}
                renderCard={(card) => <Card {...card} />}
                
                cardIndex={0}
                stackSize={2}>
            </Swiper>
        </View>

    </SafeAreaView>
  )
}

const Card = ({value, suit, prompt, title}) => {

  const textColor = suit === "♥" || suit ==="♦" ? "text-red-400" : "";

  return (
    <View className="bg-white h-[520px] justify-between rounded-xl p-2">
      <View className="justify-start">
        <Text className={`text-3xl font-bold ${textColor}`}>{suit} {value}</Text>
      </View>
      <View className="items-center">
        <Text className="text-4xl font-bold">
          {title}
        </Text>
        <Text className="text-xl">
          {prompt}
        </Text>
      </View>
      <View className="justify-end">
        <Text className={`rotate-180 text-3xl font-bold ${textColor}`}>{suit} {value}</Text>
      </View>
    </View>
  )
}

export default CardScreen