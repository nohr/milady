import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Message from "./Message";
import InputField from "./InputField";
import { MessageText, useChatStore } from "../state/chatStore";
import { shallow } from "zustand/shallow";

function Chat() {
  const [messages, addMessage] = useChatStore(
    (state) => [state.messages, state.addMessage],
    shallow
  );

  // scroll to bottom of chat
  const flatListRef = useRef<FlatList>(null);
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({
      animated: true,
    });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(
          new MessageText("Hey, I'm your music companion. What's up?")
        );
      }, 3000);
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 93 : 20}
      >
        {messages.length > 0 ? (
          <FlatList
            style={{ overflow: "visible", paddingBottom: 10 }}
            ref={flatListRef}
            data={messages}
            renderItem={({ item }) => <Message {...item} />}
            keyExtractor={(item, i) => item.from + i}
          />
        ) : null}
        <InputField />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    margin: 0,
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    backgroundColor: "#00000066",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000af",
  },
});

export default Chat;
