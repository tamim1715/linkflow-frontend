import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Onboarding() {
  const completeOnboarding = async () => {
  await AsyncStorage.setItem("onboardingDone", "true");
  router.replace("/");
};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Onboarding Screen</Text>
      <Button title="Continue" onPress={completeOnboarding} />
    </View>
  );
}
