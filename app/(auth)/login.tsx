import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { requestMagicLink } from "../../src/services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      await requestMagicLink(email);

      console.log("Request link sent!");

      Alert.alert("Success", "Magic link generated in backend log.");

      router.replace("/(auth)/onboarding");

    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Error", "Failed to send magic link.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
});


// Remove comment section for real deep link

// import { useState } from "react";
// import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
// import { requestMagicLink } from "../../src/services/authService";

// export default function LoginScreen() {
//   const [email, setEmail] = useState("");

//   const handleLogin = async () => {
//     try {
//       console.log("Calling request-link API...");

//       await requestMagicLink(email);

//       console.log("Request link sent!");

//       Alert.alert(
//         "Check your email",
//         "Click the magic link from backend log."
//       );
//     } catch (error) {
//       console.log("Login error:", error);
//       Alert.alert("Error", "Failed to send magic link.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />

//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//   },
//   input: {
//     borderWidth: 1,
//     padding: 12,
//     marginBottom: 20,
//     borderRadius: 8,
//   },
// });