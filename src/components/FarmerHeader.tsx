import { Colors } from "@/constants/colors";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


type FarmerHeaderProps = {
  name: string;
  cooperative: string;
};

export default function FarmerHeader({
  name,
  cooperative,
}: FarmerHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.greeting}>Good Morning ☀️</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.coop}>{cooperative}</Text>
      </View>

      <View style={styles.rightSection}>
        <Pressable
          style={styles.settingsButton}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </Pressable>

        <Text style={styles.logo}>🌾</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  textSection: {
    flex: 1,
    paddingTop: 8,
  },

  greeting: {
    color: Colors.textLight,
    fontSize: 16,
    marginBottom: 6,
  },

  name: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 4,
  },

  coop: {
    color: Colors.textLight,
    fontSize: 15,
  },

  rightSection: {
    alignItems: "center",
    gap: 10,
  },

  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  settingsIcon: {
    fontSize: 20,
  },

  logo: {
    fontSize: 34,
  },
});