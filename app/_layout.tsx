import React, { useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { ToastProvider } from 'react-native-toast-notifications';


export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ToastProvider>
      {isLoggedIn ? (
        <View>        
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
     <Stack.Screen name="index" />
     <Stack.Screen name="(routes)/welcome-intro/index" />
     <Stack.Screen name="(routes)/login/index" />
     <Stack.Screen name="(routes)/sign-up/index" />
     <Stack.Screen name="(routes)/forgot-password/index" />
        </Stack>
      )}
    </ToastProvider>
  );
}
