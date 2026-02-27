import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [status, setStatus] = useState<"loading" | "auth" | "app">("loading");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    const onboardingDone = await AsyncStorage.getItem("onboardingDone");

    if (!token || !onboardingDone) {
      setStatus("auth");
    } else {
      setStatus("app");
    }
  };

  if (status === "loading") {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "auth") {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)" />;
}
