import { Alert, Button, SafeAreaView, ScrollView, Text } from "react-native";
import { useChatStore } from "../state/chatStore";
import * as Application from "expo-application";

export default function Settings() {
  const onPressLearnMore = () => {
    Alert.alert("Sign up / Log in");
  };
  const clearMessages = useChatStore((state) => state.clearMessages);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Button
          onPress={onPressLearnMore}
          title="Sign Up / Log In"
          accessibilityLabel="Sign up"
        />
        <Text>{Application.applicationId}</Text>
        <Text>{Application.applicationName}</Text>
        <Text>{Application.nativeBuildVersion}</Text>
        <Button
          color={"red"}
          onPress={clearMessages}
          title="Clear Chat History"
          accessibilityLabel="Clear Chat History"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
