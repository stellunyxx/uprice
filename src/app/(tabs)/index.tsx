import CarbonDashboardCard from "@/components/CarbonDashboardCard";
import FarmerHeader from "@/components/FarmerHeader";
import FieldStatusCard from "@/components/FieldStatusCard";
import PlantingPlannerCard from "@/components/PlantingPlannerCard";
import SmartPaniCard from "@/components/SmartPaniCard";
import WeatherCard from "@/components/WeatherCard";
import { Colors } from "@/constants/colors";
import { useFarmer } from "@/context/FarmerContext";
import { useField } from "@/context/FieldContext";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [lastSync, setLastSync] = useState("5 min ago");
  const [syncing, setSyncing] = useState(false);
  const { farmer } = useFarmer();
  const { currentField, setCurrentField } = useField();

  const [detectedLevel] = useState(currentField.waterLevel);
  const [verifiedLevel, setVerifiedLevel] = useState(currentField.waterLevel);

  const handleSync = () => {
    setSyncing(true);

    setTimeout(() => {
      setLastSync("Just now");
      setSyncing(false);
    }, 1500);
  };
  
  useEffect(() => {
    setVerifiedLevel(currentField.waterLevel);
  }, [currentField]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <FarmerHeader
          name={`${farmer.firstName}!`}
          cooperative={farmer.cooperative}
        />

        <View style={styles.currentFieldCard}>
          <View style={styles.currentFieldTop}>
            <View>
              <Text style={styles.currentFieldLabel}>Current Field</Text>
              <Text style={styles.currentFieldName}>{currentField.name}</Text>
              <Text style={styles.currentFieldId}>
                {currentField.id} • {farmer.municipality}
              </Text>
            </View>

            <View style={styles.fieldInfo}>
              <Text style={styles.currentFieldWater}>{verifiedLevel} cm</Text>

              <Text
                style={[
                  styles.currentFieldStatus,
                  {
                    color:
                      currentField.status === "Healthy"
                        ? Colors.success
                        : currentField.status === "Dry Risk"
                        ? Colors.warning
                        : Colors.danger,
                  },
                ]}
              >
                {currentField.status}
              </Text>
            </View>
          </View>

          <Pressable
            style={[styles.syncButton, syncing && styles.syncButtonDisabled]}
            onPress={handleSync}
            disabled={syncing}
          >
            <Text style={styles.syncButtonText}>
              {syncing ? "⟳ Syncing..." : "🔄 Sync Now"}
            </Text>
          </Pressable>

          <Text style={styles.syncText}>Last synced: {lastSync}</Text>
        </View>

        <WeatherCard
          temperature={29}
          rainChance={70}
          humidity={84}
        />

        <SmartPaniCard
          detectedLevel={detectedLevel}
          verifiedLevel={verifiedLevel}
          battery={92}
          lastSync="5 min ago"
          onCorrect={(value) => {
            setVerifiedLevel(value);

            setCurrentField({
              ...currentField,
              waterLevel: value,
            });
          }}
        />

        <FieldStatusCard
          waterLevel={verifiedLevel}
          satelliteStatus="healthy"
        />

        <PlantingPlannerCard
          waterLevel={verifiedLevel}
          rainChance={70}
          satelliteHealthy={currentField.status === "Healthy"}
        />

        <CarbonDashboardCard waterLevel={verifiedLevel} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Powered by SmartPani • UpRice MVP v1.0
          </Text>
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

  currentFieldCard: {
  backgroundColor: Colors.surface,
  borderRadius: 22,
  padding: 18,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: Colors.border,
  },

  currentFieldTop: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  },

  currentFieldLabel: {
    color: Colors.textLight,
    fontSize: 12,
  },

  currentFieldName: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
  },

  currentFieldId: {
    color: Colors.textLight,
    marginTop: 4,
  },

  fieldInfo: {
    alignItems: "flex-end",
  },

  currentFieldWater: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "700",
  },

  currentFieldStatus: {
    marginTop: 4,
    fontWeight: "700",
    fontSize: 13,
  },

  footer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  footerText: {
    color: Colors.textLight,
    fontSize: 12,
  },

  syncButton: {
  marginTop: 16,
  backgroundColor: Colors.surfaceSoft,
  borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: 14,
  paddingVertical: 12,
  alignItems: "center",
},

syncButtonDisabled: {
  opacity: 0.6,
},

syncButtonText: {
  color: Colors.primary,
  fontWeight: "700",
  fontSize: 14,
},

syncText: {
  marginTop: 8,
  color: Colors.textLight,
  fontSize: 12,
  textAlign: "center",
},

});