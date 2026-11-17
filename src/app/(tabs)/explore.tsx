import { Colors } from "@/constants/colors";
import { useField } from "@/context/FieldContext";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const fields = [
  {
    id: "MR-014",
    name: "Miagao Rice Field",
    status: "Healthy",
    waterLevel: 14,
  },
  {
    id: "MR-015",
    name: "Cabatuan Plot",
    status: "Dry Risk",
    waterLevel: 8,
  },
  {
    id: "MR-016",
    name: "San Joaquin Field",
    status: "Flood Risk",
    waterLevel: 24,
  },
];

export default function FieldsScreen() {
  const { currentField, setCurrentField } = useField();
  const orderedFields = [...fields].sort((a, b) => {
    if (a.id === currentField.id) return -1;
    if (b.id === currentField.id) return 1;
    return 0;
  });
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>My Fields</Text>
            <Text style={styles.subheading}>
              Manage every rice field in one place.
            </Text>
          </View>

          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        {orderedFields.map((field) => {
          const badgeColor =
            field.status === "Healthy"
              ? "#DCFCE7"
              : field.status === "Dry Risk"
              ? "#FEF3C7"
              : "#FEE2E2";

          const textColor =
            field.status === "Healthy"
              ? "#166534"
              : field.status === "Dry Risk"
              ? "#92400E"
              : "#991B1B";

          return (
            <Pressable key={field.id} style={styles.fieldCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.fieldName}>{field.name}</Text>
                  <Text style={styles.location}>{field.id}</Text>
                </View>

                <View style={styles.badgeColumn}>
                  {currentField.id === field.id && (
                    <View style={styles.currentBadge}>
                      <Text style={styles.currentBadgeText}>CURRENT</Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: badgeColor },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: textColor }]}>
                      {field.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.mapPreview}>
                <Text style={styles.mapEmoji}>🌾</Text>
                <Text style={styles.mapLabel}>Satellite Verified</Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{field.waterLevel} cm</Text>
                  <Text style={styles.statLabel}>Water</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.statValue}>29°C</Text>
                  <Text style={styles.statLabel}>Temp</Text>
                </View>

                <View style={styles.stat}>
                  <Text style={styles.statValue}>92%</Text>
                  <Text style={styles.statLabel}>Battery</Text>
                </View>
              </View>

              {currentField.id !== field.id && (
                <Pressable
                  style={styles.currentButton}
                  onPress={() => setCurrentField(field)}
                >
                  <Text style={styles.currentButtonText}>
                    Set as Current
                  </Text>
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  badgeColumn: {
    alignItems: "flex-end",
    gap: 8,
  },
  
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
  },

  subheading: {
    color: Colors.textLight,
    marginTop: 4,
    fontSize: 14,
  },

  addButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: Colors.surface,
    fontSize: 28,
    fontWeight: "700",
  },

  fieldCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 18,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  fieldName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  location: {
    color: Colors.textLight,
    marginTop: 2,
  },

  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  statusText: {
    fontWeight: "700",
    fontSize: 12,
  },

  currentBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  currentBadgeText: {
    color: Colors.surface,
    fontWeight: "700",
    fontSize: 12,
  },

  mapPreview: {
    height: 160,
    borderRadius: 20,
    backgroundColor: Colors.surfaceSoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  mapEmoji: {
    fontSize: 42,
    marginBottom: 8,
  },

  mapLabel: {
    color: Colors.text,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stat: {
    alignItems: "center",
    flex: 1,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  statLabel: {
    color: Colors.textLight,
    fontSize: 12,
    marginTop: 4,
  },

  currentButton: {
    marginTop: 18,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  currentButtonText: {
    color: Colors.surface,
    fontWeight: "700",
    fontSize: 15,
  },
});