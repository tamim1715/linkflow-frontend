import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { sendFeedback } from "../services/feedbackService";

interface FeedbackSheetProps {
  onSubmit?: () => void;
}

export default function FeedbackSheet({ onSubmit }: FeedbackSheetProps) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      await sendFeedback(text);

      alert("Feedback sent!");

      if (onSubmit) {
        onSubmit();
      }

    } catch (error) {
      console.log(error);
      alert("Failed to send feedback");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help us improve Rizon</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Type your feedback here..."
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: "#fff" }}>Send feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 100,
  },
  button: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 20,
    alignItems: "center",
  },
});
