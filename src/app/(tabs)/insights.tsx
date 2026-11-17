import { Colors } from "@/constants/colors";
import { useField } from "@/context/FieldContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const weeklyData = [
  { day: "Mon", rain: 12, water: 18 },
  { day: "Tue", rain: 0, water: 14 },
  { day: "Wed", rain: 22, water: 21 },
  { day: "Thu", rain: 5, water: 16 },
  { day: "Fri", rain: 9, water: 15 },
  { day: "Sat", rain: 3, water: 13 },
  { day: "Sun", rain: 18, water: 19 },
];

const plantingDate = new Date("2026-06-20");
const seasonLength = 120;

function getCurrentStage(days: number) {
  if (days < 15) return "Seedling";
  if (days < 40) return "Vegetative";
  if (days < 70) return "Reproductive";
  if (days < 100) return "Ripening";
  return "Harvest Ready";
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getSeasonInsight(data: typeof weeklyData) {
  const safeDays = data.filter(d => d.water >= 10 && d.water <= 20).length;
  const floodDays = data.filter(d => d.water > 20).length;
  const droughtDays = data.filter(d => d.water < 10).length;

  if (floodDays >= 2) {
    return "Flood conditions persisted for multiple days. Inspect drainage before the next rainfall.";
  }

  if (droughtDays >= 2) {
    return "Water levels fell below the AWD threshold several times. Additional irrigation may be needed.";
  }

  if (safeDays >= 5 && floodDays === 1) {
    return "Water levels stayed within the recommended AWD range for most of the week. One day exceeded the flood threshold after heavy rainfall.";
  }

  if (safeDays >= 5) {
    return "Your field maintained AWD conditions for most of the week, supporting efficient water use.";
  }

  return "Field conditions were mixed this week. Continue monitoring SmartPani readings.";
}

function getSeasonStatus(data: typeof weeklyData) {
  const safeDays = data.filter(d => d.water >= 10 && d.water <= 20).length;
  const floodDays = data.filter(d => d.water > 20).length;
  const droughtDays = data.filter(d => d.water < 10).length;

  if (floodDays >= 2 || droughtDays >= 2) {
    return { label: "OFF TRACK", color: Colors.danger };
  }

  if (safeDays >= 5) {
    return { label: "ON TRACK", color: Colors.success };
  }

  return { label: "NEEDS ATTENTION", color: Colors.warning };
}

export default function InsightsScreen() {
  const { currentField } = useField();

  const seasonInsight = getSeasonInsight(weeklyData);
  const seasonStatus = getSeasonStatus(weeklyData);
  const today = new Date("2026-07-13"); // Demo date
  const daysSincePlanting = Math.floor(
    (today.getTime() - plantingDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const currentStage = getCurrentStage(daysSincePlanting);
  const harvestDate = addDays(plantingDate, seasonLength);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Insights</Text>
        <Text style={styles.subheading}>
          Performance overview for {currentField.name}
        </Text>

        {/* Season Summary */}

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>78%</Text>
            <Text style={styles.summaryLabel}>AWD</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>3.2 t</Text>
            <Text style={styles.summaryLabel}>CO₂ Saved</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>₱1,240</Text>
            <Text style={styles.summaryLabel}>Rewards</Text>
          </View>
        </View>

        {/* Seasonal Planning */}

        <View style={styles.card}>
          <View style={styles.rewardHeader}>
            <View>
              <Text style={styles.cardTitle}>Seasonal Planning</Text>
              <Text style={styles.caption}>2026 Wet Season</Text>
            </View>

            <View
            style={[
                styles.onTrackBadge,
                { backgroundColor: seasonStatus.color },
            ]}
            >
            <Text style={styles.onTrackText}>{seasonStatus.label}</Text>
            </View>
          </View>

          <View style={styles.timeline}>
            <View style={styles.timelineLine} />

            <View style={styles.timelineRow}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Planting</Text>
                <Text style={styles.timelineText}>
                  {formatDate(plantingDate)}
                </Text>
              </View>
            </View>

            <View style={styles.timelineRow}>
              <View style={[styles.timelineDot, styles.currentDot]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Current Stage</Text>
                <Text style={styles.timelineText}>
                  {currentStage} • Day {daysSincePlanting}
                </Text>
              </View>
            </View>

            <View style={styles.timelineRow}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Next Milestone</Text>
                <Text style={styles.timelineText}>
                  Maintain AWD water level
                </Text>
              </View>
            </View>

            <View style={styles.timelineRow}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Expected Harvest</Text>
                <Text style={styles.timelineText}>
                  {formatDate(harvestDate)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sapBox}>
            <Text style={styles.sapTitle}>Future SAP Forecast</Text>
            <Text style={styles.sapText}>
              As verified SmartPani and satellite data accumulate, SAP Analytics
              Cloud can refine planting windows using historical rainfall
              patterns and cooperative-wide seasonal trends.
            </Text>
          </View>
        </View>

        {/* Weekly Water Trend */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Water Trend</Text>

          <View style={styles.chart}>
            {weeklyData.map(item => (
              <View
                key={item.day}
                style={[
                  styles.bar,
                  {
                    height: item.water * 5,
                    backgroundColor:
                      item.water > 20
                        ? Colors.danger
                        : item.water < 10
                        ? Colors.warning
                        : Colors.success,
                  },
                ]}
              />
            ))}
          </View>

          <View style={styles.dayLabels}>
            {weeklyData.map(item => (
              <Text key={item.day} style={styles.dayText}>
                {item.day}
              </Text>
            ))}
          </View>

          <Text style={styles.caption}>
            SmartPani readings over the last 7 days.
          </Text>
        </View>

        {/* Rainfall vs Water */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rainfall vs Water Level</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Day</Text>
            <Text style={styles.tableHeaderText}>Rain</Text>
            <Text style={styles.tableHeaderText}>Water</Text>
          </View>

          {weeklyData.map(item => (
            <View key={item.day} style={styles.tableRow}>
              <Text style={styles.tableText}>{item.day}</Text>
              <Text style={styles.tableText}>{item.rain} mm</Text>
              <Text style={styles.tableText}>{item.water} cm</Text>
            </View>
          ))}
        </View>

        {/* Carbon Rewards */}

        <View style={styles.card}>
          <View style={styles.rewardHeader}>
            <View>
              <Text style={styles.cardTitle}>Carbon Rewards Progress</Text>
              <Text style={styles.caption}>Estimated this growing season</Text>
            </View>

            <Text style={styles.rewardAmount}>₱1,240</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.caption}>₱0</Text>
            <Text style={styles.caption}>Target ₱2,000</Text>
          </View>

          <View style={styles.rewardInfo}>
            <Text style={styles.rewardInfoTitle}>Reward Driver</Text>
            <Text style={styles.rewardInfoText}>
              Maintaining AWD conditions for more days increases verified
              emissions reductions, contributing to estimated carbon reward
              eligibility.
            </Text>
          </View>
        </View>

        {/* Generated Season Insight */}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Season Insight</Text>
          <Text style={styles.infoText}>{seasonInsight}</Text>
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

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
  },

  subheading: {
    color: Colors.textLight,
    marginTop: 4,
    marginBottom: 24,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  summaryValue: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  summaryLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 4,
    textAlign: "center",
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 16,
  },

  rewardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  onTrackBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  onTrackText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
  },

  timeline: {
    position: "relative",
    marginTop: 8,
  },

  timelineLine: {
    position: "absolute",
    left: 9,
    top: 8,
    bottom: 8,
    width: 2,
    backgroundColor: Colors.border,
  },

  timelineRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginRight: 16,
    zIndex: 1,
  },

  currentDot: {
    backgroundColor: "#C7A227",
  },

  timelineContent: {
    flex: 1,
  },

  timelineTitle: {
    color: Colors.text,
    fontWeight: "700",
    marginBottom: 2,
  },

  timelineText: {
    color: Colors.textLight,
  },

  sapBox: {
    backgroundColor: Colors.surfaceSoft,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  sapTitle: {
    color: Colors.text,
    fontWeight: "700",
    marginBottom: 6,
  },

  sapText: {
    color: Colors.textLight,
    lineHeight: 20,
  },

  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
  },

  bar: {
    width: 24,
    borderRadius: 12,
  },

  dayLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  dayText: {
    width: 24,
    textAlign: "center",
    fontSize: 11,
    color: Colors.textLight,
  },

  caption: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.textLight,
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  tableHeaderText: {
    flex: 1,
    fontWeight: "700",
    color: Colors.text,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  tableText: {
    flex: 1,
    color: Colors.text,
  },

  rewardAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },

  progressTrack: {
    height: 10,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    width: "62%",
    height: "100%",
    backgroundColor: "#C7A227",
    borderRadius: 999,
  },

  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  rewardInfo: {
    marginTop: 16,
    backgroundColor: Colors.surfaceSoft,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  rewardInfoTitle: {
    color: Colors.text,
    fontWeight: "700",
    marginBottom: 4,
  },

  rewardInfoText: {
    color: Colors.textLight,
    lineHeight: 20,
  },

  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },

  infoText: {
    color: Colors.textLight,
    lineHeight: 22,
  },
});