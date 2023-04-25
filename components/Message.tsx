import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Message({
  text,
  type = "mes",
  from = "milady",
  time,
}: {
  text: string;
  type?: "mes" | "err";
  from?: "milady" | "you";
  time?: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: type === "err" ? "#ff000037" : "#ffffff00",
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        padding: 8,
        borderRadius: 5,
        display: "flex",
        gap: 8,
        flexDirection: "row",
        justifyContent: from !== "milady" ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          opacity: 0.5,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text style={styles.sender}>{from}</Text>
        <Text style={styles.sender}>@{time}</Text>
      </View>
      <Text
        style={{
          color: "#fff",
          fontStyle: type === "err" ? "italic" : "normal",
        }}
        selectable
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sender: {
    color: "#fff",
    fontStyle: "normal",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 10,
    textAlignVertical: "center",
  },
});
