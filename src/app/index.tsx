import { useRouter } from "expo-router";
import {
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A3F22" />

      {/* Centered Branding */}
      <View style={styles.content}>
        {/* UpRice Logo */}
        <View style={styles.logo}>
          <Svg width="140" height="140" viewBox="0 0 72 72">
            {/* Dark circular background */}
            <Circle
              cx="36"
              cy="36"
              r="34"
              fill="#232B0C"
            />

            {/* Green sprout */}
            <Path
              d="M36 54 C36 40 30 34 24 26 C30 30 36 32 36 26 C36 32 42 30 48 26 C42 34 36 40 36 54Z"
              fill="#76A022"
            />

            {/* Golden seeds */}
            <Circle cx="30" cy="22" r="3" fill="#D99201" />
            <Circle cx="36" cy="16" r="3" fill="#D99201" />
            <Circle cx="42" cy="22" r="3" fill="#D99201" />
          </Svg>
        </View>

        {/* App Name */}
        <Text style={styles.title}>UpRice</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          CLIMATE RESILIENCE FOR RICE
        </Text>

        {/* Decorative Indicators */}
        <View style={styles.indicators}>
          <View style={[styles.dot, styles.mutedDot]} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={[styles.dot, styles.darkDot]} />
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.primaryButtonText}>
            Get Started
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={styles.loginHighlight}>Log In</Text>
          </Text>
        </Pressable>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Powered by SmartPani
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A3F22",
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },

  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
  },

  logo: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    color: "#FFFBE8",
    fontSize: 46,
    fontWeight: "bold",
    marginBottom: 12,
  },

  tagline: {
    color: "#CFC9A4",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.5,
    textAlign: "center",
  },

  indicators: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginTop: 30,
  },

  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },

  mutedDot: {
    backgroundColor: "#79C46A",
  },

  activeDot: {
    backgroundColor: "#E1B84A",
  },

  darkDot: {
    backgroundColor: "#8C6D13",
  },

  actions: {
    width: "100%",
    alignItems: "center",
    gap: 24,
    marginBottom: 45,
  },

  primaryButton: {
    width: "100%",
    backgroundColor: "#E1B84A",
    paddingVertical: 22,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
  },

  primaryButtonText: {
    color: "#193F28",
    fontSize: 22,
    fontWeight: "bold",
  },

  loginText: {
    color: "#D5DDCE",
    fontSize: 17,
    textAlign: "center",
  },

  loginHighlight: {
    color: "#E1B84A",
    fontWeight: "bold",
  },

  footer: {
    color: "#D5D9BD",
    fontSize: 15,
    textAlign: "center",
    marginTop: "auto",
  },
});