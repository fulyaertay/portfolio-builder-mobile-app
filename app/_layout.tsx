import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { View, useColorScheme } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();
  const colorScheme = useColorScheme();

  return (
    <PortfolioProvider>
      <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#f8fafc' }}>
        <Stack screenOptions={{ 
          headerShown: false,
          contentStyle: { 
            backgroundColor: colorScheme === 'dark' ? '#0f172a' : '#f8fafc' 
          }
        }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </View>
    </PortfolioProvider>
  );
}