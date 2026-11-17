import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  waterLevel: number;
  satelliteStatus: "healthy" | "dry" | "flood";
};

export default function FieldStatusCard({
  waterLevel,
  satelliteStatus,
}: Props) {

  const status =
    waterLevel <= 10 || satelliteStatus === "dry"
      ? "Dry Risk"
      : waterLevel > 20 || satelliteStatus === "flood"
      ? "Flood Risk"
      : "Healthy";

  const statusColor =
    status === "Healthy"
      ? Colors.success
      : status === "Dry Risk"
      ? Colors.warning
      : Colors.danger;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Field Status</Text>
          <Text style={styles.subtitle}>Miagao Rice Field • MR-014</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: `${statusColor}22` }]}>
          <Text style={[styles.badgeText, { color: statusColor }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Text style={styles.label}>🛰️ Satellite</Text>
          <Text style={styles.value}>
            {satelliteStatus.charAt(0).toUpperCase() + satelliteStatus.slice(1)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>🌾 SmartPani</Text>
          <Text style={styles.value}>{waterLevel} cm</Text>
        </View>
      </View>

      <Text style={styles.time}>Verified Today • 8:15 AM</Text>

      <Text style={styles.recommendation}>
        {status === "Healthy"
          ? "Field is within the AWD range. Continue monitoring normally."
          : status === "Dry Risk"
          ? "Water level is below the AWD threshold. Consider irrigation."
          : "High water level detected. Inspect the field for possible flooding."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 28,
    padding: 24,
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
  },

  subtitle: {
    color: Colors.textLight,
    marginTop: 4,
  },

  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  badgeText: {
    fontWeight: "700",
  },

  infoBox: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: 20,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    color: Colors.textLight,
  },

  value: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 18,
  },

  time: {
    color: Colors.textLight,
    marginTop: 16,
    fontSize: 13,
  },

  recommendation: {
    color: Colors.text,
    marginTop: 10,
    lineHeight: 22,
  },
});