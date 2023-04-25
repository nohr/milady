import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import InputField from "./components/InputField";
import ChatField from "./components/ChatField";
import Logo from "./components/Logo";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
          display: "flex",
          backgroundColor: "#2e2529",
          padding: 10,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
        <StatusBar style="light" />
        <ChatField />
        <InputField />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
