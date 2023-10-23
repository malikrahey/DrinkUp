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
});

export default styles;