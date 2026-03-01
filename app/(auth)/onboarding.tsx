import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { verifyToken } from "../../src/services/authService";

export default function OnboardingScreen() {
  const [input, setInput] = useState("");

  const extractToken = (value: string) => {
    // If user pastes full URL
    if (value.includes("token=")) {
      const parts = value.split("token=");
      return parts[1];
    }

    // If user pastes only token
    return value;
  };

  const handleVerify = async () => {
    try {
      const token = extractToken(input.trim());

      if (!token) {
        Alert.alert("Error", "Please paste valid link or token");
        return;
      }

      const jwt = await verifyToken(token);

      await AsyncStorage.setItem("token", jwt);
      await AsyncStorage.setItem("onboardingDone", "true");

      Alert.alert("Success", "Logged in successfully");

      router.replace("/(app)");
    } catch (error) {
      console.log("Verify failed:", error);
      Alert.alert("Error", "Verification failed");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Paste magic link or token here"
        value={input}
        onChangeText={setInput}
        style={styles.input}
        multiline
      />

      <Button title="Verify & Continue" onPress={handleVerify} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    minHeight: 80,
  },
});

// Remove comment for real deep link 

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";
// import { Button, Text, View } from "react-native";

// export default function Onboarding() {
//   const completeOnboarding = async () => {
//   await AsyncStorage.setItem("onboardingDone", "true");
//   router.replace("/(app)");
// };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Onboarding Screen</Text>
//       <Button title="Continue" onPress={completeOnboarding} />
//     </View>
//   );
// }