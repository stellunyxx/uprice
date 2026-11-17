import { Colors } from "@/constants/colors";
import { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

type SmartPaniCardProps = {
  detectedLevel: number;
  verifiedLevel: number;
  battery: number;
  lastSync: string;
  onCorrect: (value: number) => void;
};

export default function SmartPaniCard({
  detectedLevel,
  verifiedLevel,
  battery,
  lastSync,
  onCorrect,
}: SmartPaniCardProps) {

const [isVerifying, setIsVerifying] = useState(false);
const [tempLevel, setTempLevel] = useState(verifiedLevel);

const status =
  verifiedLevel <= 10
    ? "drought"
    : verifiedLevel <= 20
    ? "safe"
    : "flood";

const statusColor =
  status === "safe"
    ? Colors.success
    : status === "drought"
    ? Colors.warning
    : Colors.danger;

const barColor =
  status === "safe"
    ? Colors.success
    : status === "drought"
    ? Colors.warning
    : Colors.danger;

  const statusIcon =
    status === "safe"
      ? "🟢"
      : status === "drought"
      ? "🟡"
      : "🔴";

  const progress =
    Math.min(Math.max((verifiedLevel / 20) * 100, 10), 100);

  return (
    <>
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>SmartPani Sensor</Text>
          <Text style={styles.subtitle}>Live field monitoring</Text>
        </View>

        <View style={styles.badge}>
          <Text style={[styles.badgeText, { color: statusColor }]}>
            {statusIcon} {status.toUpperCase()}
          </Text>
        </View>
      </View>

      <>
        <Text style={styles.water}>{verifiedLevel} cm</Text>

        <Text style={styles.detected}>
            SmartPani detected: {detectedLevel} cm
        </Text>
      </>

      <View style={styles.barBackground}>
        <View
            style={[
            styles.barFill,
            {
                width: `${progress}%`,
                backgroundColor: barColor,
            },
            ]}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🔋</Text>
          <Text style={styles.statValue}>{battery}%</Text>
          <Text style={styles.statLabel}>Battery</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statIcon}>📡</Text>
          <Text style={styles.statValue}>{lastSync}</Text>
          <Text style={styles.statLabel}>Last Sync</Text>
        </View>
      </View>
      <Pressable
        style={styles.verifyButton}
        onPress={() => {
            setTempLevel(verifiedLevel);
            setIsVerifying(true);
        }}
        >
        <Text style={styles.verifyButtonText}>✔ Verify Reading</Text>
        </Pressable>

        <Text style={styles.caption}>
        SmartPani automatically detects the AWD water level. Verify the reading if mud,
        debris, or field conditions affect detection.
        </Text>
      </View>
      <Modal
        visible={isVerifying}
        transparent
        animationType="slide"
        >
        <View style={styles.modalOverlay}>
            <View style={styles.modal}>
            <Text style={styles.modalTitle}>Verify Water Level</Text>

            <Text style={styles.modalReading}>
                {tempLevel} cm
            </Text>

            <View style={styles.actions}>
                <Pressable
                style={styles.button}
                onPress={() => setTempLevel(Math.max(0, tempLevel - 1))}
                >
                <Text style={styles.buttonText}>-1</Text>
                </Pressable>

                <Pressable
                style={styles.button}
                onPress={() => setTempLevel(tempLevel + 1)}
                >
                <Text style={styles.buttonText}>+1</Text>
                </Pressable>
            </View>

            <Pressable
                style={styles.confirmButton}
                onPress={() => {
                onCorrect(tempLevel);
                setIsVerifying(false);
                }}
            >
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </Pressable>
            </View>
        </View>
        </Modal>
        </>
      
  );
}

const styles = StyleSheet.create({
  verifyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 18,
    },

  verifyButtonText: {
    color: "white",
    fontWeight: "700",
    },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
    },

  modal: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    },

  modalReading: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginVertical: 20,
    },

  confirmButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 18,
    },

  confirmButtonText: {
    color: "white",
    fontWeight: "700",
    },
  
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
    marginBottom: 12,
  },

  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    color: Colors.textLight,
    fontSize: 13,
    marginTop: 2,
  },

  water: {
    color: Colors.text,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 12,
  },

  barBackground: {
    height: 12,
    backgroundColor: "#394214",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 20,
  },

  barFill: {
    height: "100%",
    borderRadius: 999,
  },

  badge: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  badgeText: {
    fontWeight: "700",
    fontSize: 13,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statBox: {
    flex: 1,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  statIcon: {
    fontSize: 18,
    marginBottom: 6,
  },

  statValue: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "700",
  },

  statLabel: {
    color: Colors.textLight,
    fontSize: 12,
    marginTop: 2,
  },
  
  detected: {
    color: Colors.textLight,
    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },

  button: {
    flex: 1,
    backgroundColor: Colors.textLight,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.surface,
    fontWeight: "900",
    fontSize: 22,
  },

  caption: {
    color: Colors.textLight,
    fontSize: 12,
    marginTop: 10,
  },
});