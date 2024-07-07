import React, { useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';


export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <View>        
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
     <Stack.Screen name="index" />
     <Stack.Screen name="(routes)/welcome-intro/index" />
     <Stack.Screen name="(routes)/login/index" />
        </Stack>
      )}
    </>
  );
}
