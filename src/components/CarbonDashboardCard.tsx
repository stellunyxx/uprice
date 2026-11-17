import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type CarbonDashboardCardProps = {
  waterLevel: number;
};

export default function CarbonDashboardCard({
  waterLevel,
}: CarbonDashboardCardProps) {

  const compliance =
    waterLevel <= 10
      ? 45
      : waterLevel <= 20
      ? Math.round(60 + waterLevel * 2)
      : 35;

  const rewards =
    waterLevel <= 10
      ? 620
      : waterLevel <= 20
      ? 620 + (waterLevel - 10) * 116
      : 480;

  const co2 =
    waterLevel <= 10
      ? 1.5
      : waterLevel <= 20
      ? (2 + waterLevel / 10).toFixed(1)
      : 1.2;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Carbon Dashboard</Text>

      <Text style={styles.subtitle}>
        Estimated from verified SmartPani AWD records
      </Text>

      <View style={styles.rewardCard}>
        <Text style={styles.rewardLabel}>Estimated Carbon Rewards</Text>
        <Text style={styles.rewardAmount}>₱{rewards}</Text>
        <Text style={styles.rewardCaption}>This growing season</Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{compliance}%</Text>
          <Text style={styles.metricLabel}>AWD Compliance</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{co2} t</Text>
          <Text style={styles.metricLabel}>Estimated CO₂ Saved</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 2,
    marginBottom: 18,
  },

  rewardCard: {
    backgroundColor: "#7FA51B",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  rewardLabel: {
    color: "white",
    fontSize: 14,
  },

  rewardAmount: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
    marginVertical: 6,
  },

  rewardCaption: {
    color: "rgba(255,255,255,0.8)",
  },

  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },

  metricCard: {
    flex: 1,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  metricValue: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.text,
  },

  metricLabel: {
    fontSize: 12,
    color: "#BFC49A",
    textAlign: "center",
    marginTop: 6,
  },
});