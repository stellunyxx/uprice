import { Colors } from "@/constants/colors";
import { useFarmer } from "@/context/FarmerContext";
import { useField } from "@/context/FieldContext";
import { useEffect, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [editing, setEditing] = useState(false);
  const { farmer, setFarmer } = useFarmer();
  const { currentField } = useField();

  const [draftFarmer, setDraftFarmer] = useState(farmer);
  
  useEffect(() => {
    setDraftFarmer(farmer);
  }, [farmer]);

  const InputField = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (text: string) => void;
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      {editing ? (
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.input}
          placeholder={label}
          placeholderTextColor={Colors.textLight}
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👩‍🌾</Text>
          </View>

          <Text style={styles.name}>
            {farmer.firstName} {farmer.lastName}
          </Text>
          <Text style={styles.coop}>{farmer.cooperative}</Text>

          <Pressable
            style={styles.editButton}
            onPress={() => {
                if (editing) {
                  setFarmer(draftFarmer);
                  setEditing(false);
                } else {
                  setDraftFarmer(farmer);
                  setEditing(true);
                }
            }}
          >
            <Text style={styles.editButtonText}>
                {editing ? "Save Profile" : "Edit Profile"}
            </Text>
          </Pressable>
        </View>

        {/* Farmer Information */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Farmer Information</Text>

          <InputField
            label="First Name"
            value={draftFarmer.firstName}
            onChange={(text) =>
              setDraftFarmer({ ...draftFarmer, firstName: text })
            }
          />

          <InputField
            label="Last Name"
            value={draftFarmer.lastName}
            onChange={(text) =>
              setDraftFarmer({ ...draftFarmer, lastName: text })
            }
          />

          <InputField
            label = "Cooperative"
            value={draftFarmer.cooperative}
            onChange={(text) =>
              setDraftFarmer({ ...draftFarmer, cooperative: text })
            }
          />

          <InputField
            label = "Municipality"
            value={draftFarmer.municipality}
            onChange={(text) =>
              setDraftFarmer({ ...draftFarmer, municipality: text })
            }
          />

          <InputField
            label = "Phone Number"
            value={draftFarmer.phone}
            onChange={(text) =>
              setDraftFarmer({ ...draftFarmer, phone: text })
            }
          />
        </View>

        {/* Farm Settings */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Farm Settings</Text>

          <InputField
            label="Rice Variety"
            value={draftFarmer.variety}
            onChange={(text) =>
              setDraftFarmer({ ...draftFarmer, variety: text })
            }
          />

          <InputField
            label="Farm Size"
            value={draftFarmer.farmSize}
            onChange={(text) =>
              setDraftFarmer({ ...draftFarmer, farmSize: text })
            }
          />
        </View>

        {/* Quick Stats */}

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Current Field</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentField.waterLevel} cm</Text>
            <Text style={styles.statLabel}>Water Level</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>₱1,240</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </View>
        </View>

        {/* App Info */}

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>UpRice MVP</Text>
          <Text style={styles.footerText}>
            SmartPani + Satellite Verified Climate Resilience Platform
          </Text>

          <Text style={styles.version}>Version 1.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  profileCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.surfaceSoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  avatarText: {
    fontSize: 40,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
  },

  coop: {
    color: Colors.textLight,
    marginTop: 4,
    marginBottom: 18,
  },

  editButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },

  editButtonText: {
    color: "white",
    fontWeight: "700",
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    color: Colors.textLight,
    fontSize: 12,
    marginBottom: 6,
  },

  value: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  statValue: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
  },

  statLabel: {
    color: Colors.textLight,
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },

  footerCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },

  footerTitle: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 18,
  },

  footerText: {
    color: Colors.textLight,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },

  version: {
    color: Colors.textLight,
    marginTop: 16,
    fontSize: 12,
  },
});