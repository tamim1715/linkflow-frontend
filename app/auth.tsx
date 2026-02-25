import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../src/context/AuthContext";

export default function Auth() {
  const { token } = useLocalSearchParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (token && typeof token === "string") {
      login(token);
      router.replace("/");
    }
  }, [token]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Authenticating...</Text>
    </View>
  );
}
