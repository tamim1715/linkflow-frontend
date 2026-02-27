import * as Linking from "expo-linking";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  onLeaveReview: () => void;
};

export default function StoreRedirectSheet({ onLeaveReview }: Props) {
  const openStore = async () => {
    const url =
      Platform.OS === "ios"
        ? "https://apps.apple.com/app/idYOUR_ID"
        : "https://play.google.com/store/apps/details?id=YOUR_PACKAGE";

    try {
      // ✅ Mark review as completed
      onLeaveReview();

      // ✅ Open store
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Cannot open store URL");
      }
    } catch (error) {
      console.log("Store redirect error:", error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>
        Got a minute to help us grow?
      </Text>

      <Text style={styles.subtitle}>
        It takes less than a minute and helps us a lot.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openStore}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Leave a review
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#8E8E93",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
  },
});
