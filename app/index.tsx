import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";

export default function Index() {
  const { userToken, loading } = useContext(AuthContext);
  const [onboardingSeen, setOnboardingSeen] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    const seen = await AsyncStorage.getItem("onboardingSeen");
    setOnboardingSeen(seen);
    setChecking(false);
  };

  if (loading || checking) return null;

  if (!userToken) {
    return <Redirect href="/login" />;
  }

  if (!onboardingSeen) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/feedback" />;
}