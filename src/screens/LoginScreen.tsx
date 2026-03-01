import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { requestMagicLink } from "../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      await requestMagicLink(email);
      alert("Check your email for login link");
    } catch (error) {
      console.log(error);
      alert("Failed to send link");
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Send Magic Link" onPress={handleLogin} />
    </View>
  );
}
