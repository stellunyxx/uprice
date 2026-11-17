
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { FarmerProvider } from "@/context/FarmerContext";
import { FieldProvider } from "@/context/FieldContext";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <FarmerProvider>
        <FieldProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <AnimatedSplashOverlay />

            <Stack
              initialRouteName="index"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </ThemeProvider>
        </FieldProvider>
      </FarmerProvider>
    </SafeAreaProvider>
  );
}
