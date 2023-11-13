import { StyleSheet, Platform, StatusBar } from 'react-native'

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  logo: {
    width: 322,
    height: 310,
  },

  backB: {
    position: 'absolute',
    left:     0,
    top:      0,
    padding: 15,
    zIndex: 3, // works on ios
    elevation: 3, // works on android
  },
  
});

export default styles;