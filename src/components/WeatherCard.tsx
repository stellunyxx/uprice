import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type WeatherCardProps = {
  temperature: number;
  rainChance: number;
  humidity: number;
};

export default function WeatherCard({
  temperature,
  rainChance,
  humidity,
}: WeatherCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today's Weather</Text>
          <Text style={styles.subtitle}>Cloudy with high humidity</Text>
        </View>

        <Text style={styles.icon}>⛅</Text>
      </View>

      <Text style={styles.temp}>{temperature}°C</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🌧</Text>
          <Text style={styles.statValue}>{rainChance}%</Text>
          <Text style={styles.statLabel}>Rain Chance</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statIcon}>💧</Text>
          <Text style={styles.statValue}>{humidity}%</Text>
          <Text style={styles.statLabel}>Humidity</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    marginTop: 2,
  },

  icon: {
    fontSize: 30,
  },

  temp: {
    color: "white",
    fontSize: 46,
    fontWeight: "bold",
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  statIcon: {
    fontSize: 18,
    marginBottom: 6,
  },

  statValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  statLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 2,
  },
});