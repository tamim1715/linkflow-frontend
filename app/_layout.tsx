import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";
import { verifyToken } from "../src/services/authService";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      const parsed = Linking.parse(url);
      const token = parsed.queryParams?.token;

      if (token) {
        try {
          const jwt = await verifyToken(token as string);

          await AsyncStorage.setItem("token", jwt);

          router.replace("/(app)");
        } catch (e) {
          console.log("Verify failed", e);
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => subscription.remove();
  }, []);

  return <Slot />;
}
