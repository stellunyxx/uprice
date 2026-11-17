import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type AlertsCardProps = {
  waterLevel: number;
};

export default function AlertsCard({ waterLevel }: AlertsCardProps) {
  const alert =
    waterLevel <= 10
      ? {
          color: Colors.warning,
          icon: "🟡",
          title: "Water level below AWD threshold",
          message: "Consider irrigation if rainfall does not arrive.",
        }
      : waterLevel <= 20
      ? {
          color: Colors.success,
          icon: "🟢",
          title: "Field is within the AWD range",
          message: "Continue monitoring normally.",
        }
      : {
          color: Colors.danger,
          icon: "🔴",
          title: "High water level detected",
          message: "Inspect the field for possible flooding.",
        };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Field Alert</Text>

      <View style={[styles.alertBox, { borderLeftColor: alert.color }]}>
        <Text style={styles.title}>
          {alert.icon} {alert.title}
        </Text>
        <Text style={styles.message}>{alert.message}</Text>
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

  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 16,
  },

  alertBox: {
    borderLeftWidth: 5,
    paddingLeft: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },

  message: {
    color: Colors.textLight,
    lineHeight: 20,
  },
});