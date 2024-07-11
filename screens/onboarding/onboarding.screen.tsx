import { View, Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from '@/styles/onboarding/onboarding'
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from "expo-router";

export default function onBoardingScreen() {
let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
});

if (!fontsLoaded && !fontError) {
    return null;
}

  return (
    <LinearGradient colors={["#002D62", "#002D62"]} style={{flex: 1, alignItems: "center", justifyContent: "center" }}>
       <View style={styles.container}>

        <View>
            <Image
            source={require("@/assets/onboarding/pinehouse.png")}
            style={styles.logo}
             />

             <Image
            source={require("@/assets/onboarding/shape_9.png")} />
        </View>

        <View style={styles.titleWrapper}>
            <Image
           style={styles. titleTextShape}
            source={require("@/assets/onboarding/shape_3.png")}
            />
            <Text style={[styles.titleText,  {fontFamily: "Raleway_700Bold"}]}>PineHouse Suits & Apparel</Text>

            <Image
            style={styles. titleTextShape}
            source={require("@/assets/onboarding/shape_2.png")}
            />


        </View>

        <View>
            <Image
            style={styles. titleTextShape}
            source={require("@/assets/onboarding/shape_6.png")}
            />

            <Text style={[styles.titleText, {fontFamily: "Nunito_400Regular"}]}>Get The Best Fit</Text>
        </View>

        <View style={styles.descriptionWrapper}>
            <Text style={[styles.descriptionText, {fontFamily: "Nunito_400Regular"}]}>Explore elegance and style </Text>
            <Text style={[styles.descriptionText, {fontFamily: "Nunito_400Regular"}]}>Official, Casual and Work OutFit..</Text>
        </View>
        <TouchableOpacity
         style={styles.buttonWrapper}
         onPress={() => router.push("/(routes)/welcome-intro")}
         
         >
           <Text 
           style={[styles.buttonText, {fontFamily: "Nunito_700Bold"}]}>
                Get Started
           </Text>
        </TouchableOpacity>


       </View>
    </LinearGradient>
  )
}