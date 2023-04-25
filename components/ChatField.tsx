import React from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import Message from "./Message";

export class MessageText {
  constructor(
    public text: string,
    public type: "mes" | "err" = "mes",
    private from: "milady" | "you" = "milady"
  ) {}

  print() {
    console.log(this.text);
  }

  add(feed: MessageText[]) {
    feed.push(this);
  }
}

function ChatField() {
  const chatFeed = [
    new MessageText("hey"),
    new MessageText("hey"),
    new MessageText("say something first!", "err"),
    new MessageText("say something first!", "err"),
    new MessageText("what are you up to?", "mes", "you"),
  ];

  const nw = new MessageText("hello", "err");

  return (
    <SafeAreaView
      style={{
        width: "100%",
        margin: 0,
        paddingTop: 10,
        paddingBottom: 10,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#00000066",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000000af",
      }}
    >
      <FlatList
        data={chatFeed}
        renderItem={({ item }) => <Message {...item} />}
        keyExtractor={(item, i) => item.text + i}
      />
    </SafeAreaView>
  );
}

export default ChatField;
