import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { AuthContext } from "../../src/context/AuthContext";

export default function LoginScreen() {
  console.log("start to login-------")
  const [email, setEmail] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    console.log("dummy token set---")
    await AsyncStorage.setItem("token", "dummy-token");
    console.log("now redirect to onboarding")
    router.replace("/onboarding");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Button title="Login (Test)" onPress={handleLogin} />
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
  },
});
