import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Feedback() {
  const resetApp = async () => {
    await AsyncStorage.clear();
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feedback Screen</Text>
      <Button title="Reset App (Dev Only)" onPress={resetApp} />
    </View>
  );
}
