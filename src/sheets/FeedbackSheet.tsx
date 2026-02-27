import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  onSubmit: () => void;
}

export default function FeedbackSheet({ onSubmit }: Props) {
  const [text, setText] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View>
        <Text style={styles.title}>
          Help us improve Rizon
        </Text>

        <Text style={styles.subtitle}>
          Tell us what didn’t feel right, we read every message.
        </Text>

        <TextInput
          style={styles.input}
          multiline
          placeholder="Type your feedback here..."
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={{ color: "#fff" }}>
            Send feedback
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  input: {
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 14,
    padding: 12,
    height: 100,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
  },
});
