import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import StepIndicator from 'react-native-step-indicator';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { router } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import OnboardingSlider from '@/components/home/home.banner.slider';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
};

const labels = ["Create Your Profile", "Add Your Measurement", "Add Design", "Place Order"];

export default function OnBoardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = useSharedValue(0);

  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  progress.value = withTiming(currentStep, { duration: 300 });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value === currentStep ? 1 : 0.5,
      transform: [{ scale: progress.value === currentStep ? 1 : 0.9 }],
    };
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleDone = () => {
    router.push('/login');
  };

  const handleSkip = () => {
    router.push('/login');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={["#002D62", "#002D62"]} style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Top Section */}
          <View>
            {/* Top Left Logo and Title */}
            <View style={styles.logoAndTitleWrapper}>
              <Image source={require("@/assets/onboarding/pinehouse.png")} style={styles.logo} />
              <Text style={[styles.titleText, { fontFamily: " Nunito_400Regular" }]}>PineHouse Suits & Apparel</Text>
            </View>
            {/* Header Section */}
            <View style={styles.headerWrapper}>
              <Image source={require("@/assets/onboarding/shape_9.png")} style={styles.headerImage} />
              <Text style={[styles.headerText, { fontFamily: "Nunito_400Regular" }]}>Get The Best Fit</Text>
            </View>

            {/* Onboarding Slider */}
            <OnboardingSlider  />
            
          </View>

          {/* Steps Section */}
          <View>
            <View style={styles.stepsWrapper}>
              <Text style={[styles.stepsTitle, { fontFamily: "Nunito_700Bold" }]}>Get a Custom Design, Its Easy! </Text>
              <Animated.View style={[styles.stepIndicatorWrapper, animatedStyle]}>
                <StepIndicator
                  customStyles={customStyles}
                  currentPosition={currentStep}
                  labels={labels}
                  stepCount={4}
                />
              </Animated.View>
              <View style={styles.stepsContainer}>
                <TouchableOpacity onPress={() => router.push("/(routes)/sign-up")}>
                  <View style={styles.step}>
                    <FontAwesome5 name="user" size={24} color="#fe7013" />
                    <Text style={styles.stepText}>Profile</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity >
                  <View style={styles.step}>
                    <FontAwesome5 name="ruler" size={24} color="#fe7013" />
                    <Text style={styles.stepText}>Measurements</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/(routes)/design")}>
                  <View style={styles.step}>
                    <FontAwesome5 name="pen" size={24} color="#fe7013" />
                    <Text style={styles.stepText}>Design</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/(routes)/place-order")}>
                  <View style={styles.step}>
                    <FontAwesome5 name="shopping-cart" size={24} color="#fe7013" />
                    <Text style={styles.stepText}>Order</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Get Started Button */}
          <View>
            <TouchableOpacity style={styles.buttonWrapper} onPress={() => router.push("/(routes)/welcome-intro")}>
              <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoAndTitleWrapper: {
      flexDirection: 'row', // Align items horizontally
      alignItems: 'center', // Align items vertically in the center
      justifyContent: 'flex-start', // Align items to the start of the container
      marginRight: 20, // Adjust the gap between the logo and the title
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  titleText: {
    fontSize: 20,
    color: '#ffffff',
  },
  headerWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerImage: {
    marginVertical: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#ffffff',
  },
  stepsWrapper: {
    marginVertical: 10,
  },
  stepsTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  stepIndicatorWrapper: {
    marginBottom: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  step: {
    alignItems: 'center',
  },
  stepText: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
  },
  buttonWrapper: {
    backgroundColor: '#fe7013',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});
