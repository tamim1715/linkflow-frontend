import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onNotYet: () => void;
  onYes: () => void;
}

export default function ReviewPromptSheet({
  onNotYet,
  onYes,
}: Props) {
  return (
    <View>
      <Text style={styles.title}>
        Enjoying Rizon so far?
      </Text>

      <Text style={styles.subtitle}>
        Your feedback helps us build a better money experience.
      </Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.secondary} onPress={onNotYet}>
          <Text>Not yet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primary} onPress={onYes}>
          <Text style={{ color: "#fff" }}>Yes, loving it</Text>
        </TouchableOpacity>
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondary: {
    backgroundColor: "#E5E5EA",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  primary: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
