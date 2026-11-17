import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type PlantingPlannerCardProps = {
  waterLevel?: number;
  rainChance?: number;
  satelliteHealthy?: boolean;
};

export default function PlantingPlannerCard({
  waterLevel = 14,
  rainChance = 70,
  satelliteHealthy = true,
}: PlantingPlannerCardProps) {
  let title = "Maintain AWD Conditions";
  let recommendation =
    "Delay irrigation until tomorrow morning.";
  let priority = "MEDIUM";
  let priorityColor = Colors.warning;

  if (waterLevel < 10 && rainChance < 40) {
    title = "Irrigate Today";
    recommendation =
      "Water levels are below the AWD threshold and rainfall is unlikely.";
    priority = "HIGH";
    priorityColor = Colors.danger;
  } else if (waterLevel > 20) {
    title = "Inspect Drainage";
    recommendation =
      "Standing water exceeds the recommended AWD range.";
    priority = "HIGH";
    priorityColor = Colors.danger;
  } else if (rainChance >= 70) {
    title = "Delay Irrigation";
    recommendation =
      "Rain is expected soon, so additional irrigation isn't needed today.";
    priority = "MEDIUM";
    priorityColor = Colors.warning;
  } else {
    priority = "LOW";
    priorityColor = Colors.success;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>Today's Recommendation</Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: priorityColor }]}>
          <Text style={styles.badgeText}>{priority}</Text>
        </View>
      </View>

      <Text style={styles.recommendation}>{recommendation}</Text>

      <Text style={styles.reason}>
        Based on SmartPani water readings, today's weather forecast, and satellite verification.
      </Text>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricIcon}>💧</Text>
          <Text style={styles.metricValue}>{waterLevel} cm</Text>
          <Text style={styles.metricLabel}>Water</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricIcon}>🌧️</Text>
          <Text style={styles.metricValue}>{rainChance}%</Text>
          <Text style={styles.metricLabel}>Rain</Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricIcon}>🛰️</Text>
          <Text style={styles.metricValue}>
            {satelliteHealthy ? "Healthy" : "Alert"}
          </Text>
          <Text style={styles.metricLabel}>Satellite</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Next review: 6:00 AM tomorrow
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  subtitle: {
    color: Colors.textLight,
    fontSize: 13,
  },

  title: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 4,
  },

  badge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  badgeText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },

  recommendation: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
  },

  reason: {
    color: Colors.textLight,
    marginTop: 10,
    lineHeight: 20,
  },

  metricsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  metric: {
    flex: 1,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  metricIcon: {
    fontSize: 18,
    marginBottom: 6,
  },

  metricValue: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 16,
  },

  metricLabel: {
    color: Colors.textLight,
    fontSize: 12,
    marginTop: 4,
  },

  footer: {
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  footerText: {
    color: Colors.textLight,
    fontSize: 12,
  },
});