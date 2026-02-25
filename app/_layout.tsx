// import { Stack } from "expo-router";
// import { AuthProvider } from "../src/context/AuthContext";

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Stack screenOptions={{ headerShown: false }} />
//     </AuthProvider>
//   );
// }

import * as Linking from "expo-linking";
import { Stack, router } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "../src/context/AuthContext";

function RootNavigation() {
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", async (event) => {
      const url = event.url;

      const parsed = Linking.parse(url);
      const token = parsed.queryParams?.token as string;

      if (token) {
        await login(token);
        router.replace("/");
      }
    });

    return () => subscription.remove();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
