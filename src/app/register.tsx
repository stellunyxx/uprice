
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

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"Farmer" | "Agricultural Officer">("Farmer");

  const handleRegister = () => {
    if (
      !fullName.trim() ||
      !phoneNumber.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Missing Information", "Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Your passwords do not match.");
      return;
    }

    Alert.alert(
      "Registration Preview",
      `Name: ${fullName}\nPhone Number: ${phoneNumber}\nRole: ${role}\n\nAccount creation is not connected yet.`
    );
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

        {/* Registration Form */}
        <View style={styles.form}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.description}>
              Join us in building climate-resilient rice communities.
            </Text>
          </View>

          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#92977F"
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
          />

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
            placeholder="Create a password"
            placeholderTextColor="#92977F"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            placeholderTextColor="#92977F"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Role Selection */}
          <Text style={styles.label}>I am a...</Text>

          <View style={styles.roleContainer}>
            <Pressable
              style={[
                styles.roleButton,
                role === "Farmer" && styles.selectedRole,
              ]}
              onPress={() => setRole("Farmer")}
            >
              <Text
                style={[
                  styles.roleText,
                  role === "Farmer" && styles.selectedRoleText,
                ]}
              >
                Farmer
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.roleButton,
                role === "Agricultural Officer" && styles.selectedRole,
              ]}
              onPress={() => setRole("Agricultural Officer")}
            >
              <Text
                style={[
                  styles.roleText,
                  role === "Agricultural Officer" && styles.selectedRoleText,
                ]}
              >
                Agricultural Officer
              </Text>
            </Pressable>
          </View>

          {/* Register Button */}
          <Pressable
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Create Account</Text>
          </Pressable>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.loginLink}>Log In</Text>
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

  // Registration Form
  form: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 28,
    paddingTop: 25,
  },

  headingContainer: {
    alignItems: "center",
    marginBottom: 20,
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
    textAlign: "center",
    lineHeight: 21,
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

  // Role Selection
  roleContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 3,
  },

  roleButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: "#F0F0E6",
  },

  selectedRole: {
    backgroundColor: "#193F28",
  },

  roleText: {
    color: "#52604B",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  selectedRoleText: {
    color: "#FFFBE8",
  },

  // Register Button
  registerButton: {
    height: 53,
    backgroundColor: "#193F28",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 27,
  },

  registerButtonText: {
    color: "#FFFBE8",
    fontSize: 16,
    fontWeight: "700",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  // Login Link
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  loginText: {
    color: "#68735B",
    fontSize: 13,
  },

  loginLink: {
    color: "#193F28",
    fontSize: 13,
    fontWeight: "800",
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 40,
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
