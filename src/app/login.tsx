
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

export default function LoginScreen() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Branding Header */}
        <View style={styles.header}>
          <View style={styles.branding}>
            {/* Sprout Logo Only */}
            <Svg width={120} height={120} viewBox="0 0 72 72">
              <Path
                d="M36 54 C36 40 30 34 24 26 C30 30 36 32 36 26 C36 32 42 30 48 26 C42 34 36 40 36 54Z"
                fill="#76A022"
              />
              <Circle cx="30" cy="22" r="3" fill="#D99201" />
              <Circle cx="36" cy="16" r="3" fill="#D99201" />
              <Circle cx="42" cy="22" r="3" fill="#D99201" />
            </Svg>
          </View>

          {/* Curved Cream Wave */}
          <Svg
            width="100%"
            height={65}
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
            style={styles.wave}
          >
            <Path
              d="M0 35 C75 0 115 15 180 43 C245 72 315 55 400 15 L400 80 L0 80 Z"
              fill="#FFFBE8"
            />
          </Svg>
        </View>

        {/* Login Section */}
        <View style={styles.loginSection}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Welcome back!</Text>
            <Text style={styles.description}>
              Log in to continue.
            </Text>
          </View>

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#92977F"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={15}
           />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#92977F"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot Password */}
          <Pressable
            style={styles.forgotContainer}
            onPress={() =>
              Alert.alert(
                "Coming Soon",
                "Password recovery is not available in this prototype."
              )
            }
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          {/* Login Button */}
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </Pressable>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>New to UpRice? </Text>

            <Pressable onPress={() => router.push("/register")}>
              <Text style={styles.registerLink}>Create Account</Text>
            </Pressable>
          </View>

          {/* Footer Divider */}
          <View style={styles.footer}>
            <View style={styles.footerLine} />
            <Text style={styles.footerText}>UPRICE</Text>
            <View style={styles.footerLine} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBE8",
  },

  scrollContent: {
    flexGrow: 1,
  },

  // Branding Header
  header: {
    height: 215,
    backgroundColor: "#193F28",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  branding: {
    alignItems: "center",
    marginTop: 20,
  },

  wave: {
    position: "absolute",
    bottom: -1,
    left: 0,
  },

  // Login Section
  loginSection: {
    flex: 1,
    backgroundColor: "#FFFBE8",
    paddingHorizontal: 28,
    paddingTop: 25,
    paddingBottom: 40,
  },

  headingContainer: {
    alignItems: "center",
    marginBottom: 30,
  },

  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: "#68735B",
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: "#92977F",
    marginTop: 7,
  },

  // Input Fields
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#193F28",
    marginBottom: 9,
    marginTop: 15,
  },

  input: {
    height: 52,
    backgroundColor: "#F0F0E6",
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 14,
    color: "#193F28",
    borderWidth: 1,
    borderColor: "#E1B84A",
  },

  // Forgot Password
  forgotContainer: {
    alignSelf: "flex-end",
    marginTop: 12,
  },

  forgotText: {
    fontSize: 12,
    color: "#B47A00",
    fontWeight: "600",
  },

  // Login Button
  loginButton: {
    height: 53,
    backgroundColor: "#193F28",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 27,
  },

  loginButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f8f7f4",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  // Register
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  registerText: {
    fontSize: 13,
    color: "#68735B",
  },

  registerLink: {
    fontSize: 13,
    fontWeight: "800",
    color: "#193F28",
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 45,
  },

  footerLine: {
    height: 1,
    width: 55,
    backgroundColor: "#D8DDCA",
  },

  footerText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    color: "#92977F",
  },
});
