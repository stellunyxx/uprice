import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function SatelliteMapCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Field Monitoring</Text>
          <Text style={styles.subtitle}>
            Satellite + SmartPani verification
          </Text>
        </View>
        <Text style={styles.icon}>🛰️</Text>
      </View>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapEmoji}>🌾</Text>
        <Text style={styles.mapText}>Miagao Rice Field</Text>
        <>
          <Text style={styles.mapSubtext}>Field ID: MR-014</Text>
          <Text style={styles.mapSubtext}>Verified Today • 8:15 AM</Text>
        </>
      </View>

      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: Colors.success }]} />
          <Text style={styles.legendText}>Healthy</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: Colors.warning }]} />
          <Text style={styles.legendText}>Dry Risk</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: Colors.danger }]} />
          <Text style={styles.legendText}>Flood Risk</Text>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
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
  },

  icon: {
    fontSize: 24,
  },

  mapPlaceholder: {
    height: 170,
    borderRadius: 22,
    backgroundColor: Colors.surfaceSoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  mapEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },

  mapText: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    textAlign: "center",
  },

  mapSubtext: {
    fontSize: 13,
    color: "#BFC49A",
    marginTop: 6,
    textAlign: "center",
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  legendText: {
    fontSize: 12,
    color: "#BFC49A",
  },
});