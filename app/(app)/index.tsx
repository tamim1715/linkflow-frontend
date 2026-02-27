import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

import BottomSheet from "../../src/components/BottomSheet";
import FeedbackSheet from "../../src/sheets/FeedbackSheet";
import ReviewPromptSheet from "../../src/sheets/ReviewPromptSheet";
import StoreRedirectSheet from "../../src/sheets/StoreRedirectSheet";

type SheetType = "review" | "feedback" | "store" | null;

export default function Home() {
  const [sheet, setSheet] = useState<SheetType>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      const onboardingDone = await AsyncStorage.getItem("onboardingDone");
      const yesClickedTime = await AsyncStorage.getItem("yesClickedTime");
      const reviewCompleted = await AsyncStorage.getItem("reviewCompleted");

      console.log("onboardingDone:", onboardingDone);
      console.log("yesClickedTime:", yesClickedTime);
      console.log("reviewCompleted:", reviewCompleted);

      // If review already completed → never show again
      if (reviewCompleted === "true") {
        setReady(true);
        return;
      }

      // First time after onboarding → show review prompt
      if (onboardingDone === "true" && !yesClickedTime) {
        setSheet("review");
      }

      // If user clicked Yes before → check 2 days passed
      if (yesClickedTime) {
        const days =
          (Date.now() - new Date(yesClickedTime).getTime()) /
          (1000 * 60 * 60 * 24);

        if (days >= 0) {
          setSheet("store");
        }
      }
    } catch (e) {
      console.log("INIT ERROR:", e);
    }

    setReady(true);
  };

  const handleYes = async () => {
    await AsyncStorage.setItem(
      "yesClickedTime",
      new Date().toISOString()
    );
    // setSheet(null);
    setSheet("store"); // 👈 immediately show store
  };

  const handleReviewComplete = async () => {
    await AsyncStorage.setItem("reviewCompleted", "true");
    setSheet(null);
  };

  // 🧪 RESET FUNCTION (FOR TESTING)
  const handleReset = async () => {
    await AsyncStorage.multiRemove([
      "token",
      "onboardingDone",
      "yesClickedTime",
      "reviewCompleted",
    ]);
    console.log("All storage cleared");
  };

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginTop: 100, textAlign: "center" }}>
        Main App Screen
      </Text>

      {/* 🧪 TEMP RESET BUTTON FOR TESTING */}
      <View style={{ marginTop: 30, alignItems: "center" }}>
        <Button title="Reset App State (Testing)" onPress={handleReset} />
      </View>

      <BottomSheet
        visible={sheet !== null}
        overlayOpacity={sheet === "review" ? 0.6 : 0.8}
        onClose={() => setSheet(null)}
      >
        {sheet === "review" && (
          <ReviewPromptSheet
            onNotYet={() => setSheet("feedback")}
            onYes={handleYes}
          />
        )}

        {sheet === "feedback" && (
          <FeedbackSheet
            onSubmit={() => setSheet(null)}
          />
        )}

        {sheet === "store" && (
          <StoreRedirectSheet
            onLeaveReview={handleReviewComplete}
          />
        )}
      </BottomSheet>
    </View>
  );
}
