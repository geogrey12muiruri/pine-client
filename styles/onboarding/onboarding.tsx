import { StyleSheet } from "react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
    responsiveHeight,
    responsiveWidth,
  } from "react-native-responsive-dimensions";
  
export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  shape: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 10,
  },
  titleWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleTextShape: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  titleText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
  },
  subtitleWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleShape: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  subtitleText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  descriptionWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  descriptionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonWrapper: {
    backgroundColor: "#f54748",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "#002D62",
    fontSize: 18,
    textAlign: "center",
  },
      welcomeButtonStyle:{
        backgroundColor: "#2467EC",
        width: responsiveWidth(88),
        height: responsiveHeight(5.5),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      }
});