
import { Tabs } from "expo-router";
import { Image } from "react-native";


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFBE8",
        tabBarInactiveTintColor: "#8D9570",
        tabBarStyle: {
          backgroundColor: "#151C05",
          borderTopWidth: 0,
          height: 76,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 3,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="insights" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Fields",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="fields" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="profile" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  name,
  color,
  size,
}: {
  name: "home" | "insights" | "fields" | "profile";
  color: import("react-native").ColorValue;
  size: number;
}) {
  const icons = {
    home: require("@/assets/images/tabIcons/home.png"),
    insights: require("@/assets/images/tabIcons/insights.png"),
    fields: require("@/assets/images/tabIcons/fields.png"),
    profile: require("@/assets/images/tabIcons/profile.png"),
  };

  return (
    <Image
      source={icons[name]}
      style={{ width: size, height: size, tintColor: color }}
      resizeMode="contain"
    />
  );
}
