import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

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

      console.log("onboardingDone:", onboardingDone);
      console.log("yesClickedTime:", yesClickedTime);

      if (onboardingDone === "true" && !yesClickedTime) {
        setSheet("review");
      }

      if (yesClickedTime) {
        const days =
          (Date.now() - new Date(yesClickedTime).getTime()) /
          (1000 * 60 * 60 * 24);

        if (days >= 2) {
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
    setSheet(null);
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

        {sheet === "store" && <StoreRedirectSheet />}
      </BottomSheet>
    </View>
  );
}
