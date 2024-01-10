import { Stack } from "expo-router";
import Footer from "../components/Footer";
const BaseLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          title: "Blog",
          headerShown: true,
          headerShadowVisible: false,
          animation: "slide_from_right",
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="index" />
      </Stack>
      <Footer />
    </>
  );
};
export default BaseLayout;
