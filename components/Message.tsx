import React from "react";
import { Text } from "react-native";

export default function Message({
  text,
  type = "mes",
  from = "milady",
}: {
  text: string;
  type?: "mes" | "err";
  from?: "milady" | "you";
}) {
  return (
    <>
      <Text
        style={{
          backgroundColor: type === "err" ? "#ff000037" : "#ffffff00",
          color: "#fff",
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: "#fff",
            opacity: 0.5,
            fontStyle: "normal",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 10,
          }}
        >
          {from}
        </Text>{" "}
        <Text
          style={{
            color: "#fff",
            fontStyle: type === "err" ? "italic" : "normal",
          }}
        >
          {text}
        </Text>
      </Text>
    </>
  );
}
