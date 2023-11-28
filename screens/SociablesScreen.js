import { View, Text, Image, ScrollView, Icon } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
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
  "♣",
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
    "prompt": "Players raise 3 fingers, take turns confessing things you've never done. If someone did it, lower a finger. When 3 fingers are down, game ends, drink for each finger down."
  },
  {
    "value": "6",
    "title": "Question",
    "prompt": "Ask someone around the table a question. If they refuse to answer then they need to finish their drink. "
  },
  {
    "value": "7",
    "title": "Thumb Card",
    "prompt": "You're the 'Thumb Master'. When you put your thumb down on the table it means all others follow suit. Last to do it drinks. Keep going until a new thumb card's drawn."
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
    "prompt": "Start drinking. Player to your right follows your lead, repeating until all are drinking. When it's your turn again, stop. Then, the player to your right stops, continuing around the circle."
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

  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]
  }

  return deck;
}

const CardScreen = ({ navigation }) => {

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
        const deckCard = { ...card }
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
    <SafeAreaView className="bg-blue-400" style={styles.AndroidSafeArea}>

      <View className="flex justify-center h-1/6">
        <AntDesign onPress={handleBack} style={styles.backB} name="leftcircle" size={45} color="black" />

        <View>
          <Swiper
            cards={deck}
            renderCard={(card) => <Card {...card} />}
            cardIndex={0}
            stackSize={2}
            onSwipedAll={handleBack}
          />
        </View>

      </View>

    </SafeAreaView>
  )
}

const Card = ({ value, suit, prompt, title }) => {

  const textColor = suit === "♥" || suit === "♦" ? "text-red-400" : "";

  return (
    <View className="bg-white h-[520px] justify-between rounded-xl p-2">
      <View className="justify-start">
        <Text className={`text-5xl p-3 font-bold ${textColor}`}>{suit} {value}</Text>
      </View>
      <View className="items-center">
        <Text className={`text-4xl p-3 font-bold ${textColor}`}>
          {title}
        </Text>
        <Text className="text-2xl p-3">
          {prompt}
        </Text>
      </View>
      <View className="justify-end">
        <Text className={`rotate-180 text-5xl p-3 font-bold ${textColor}`}>{suit} {value}</Text>
      </View>
    </View>
  )
}

export default CardScreen