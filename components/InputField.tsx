import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { MessageText, useChatStore } from "../state/chatStore";

type Inputs = {
  query: string;
};

function InputField() {
  const addMessage = useChatStore((state) => state.addMessage);
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      query: "",
    },
  });
  const url =
    "https://hivsmippb9.execute-api.us-east-1.amazonaws.com/default/miladyFetchLyric";

  const [loading, setLoading] = React.useState(false);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    addMessage(new MessageText(data.query, "mes", "you"));
    setValue("query", "");
    setLoading(true);

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data.query),
    })
      .then((response) => {
        if (response.ok) {
          setLoading(false);
          response.json().then((result) => {
            addMessage(new MessageText(result));
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onError = () => {
    addMessage(new MessageText("Say something first!", "err"));
  };

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 0,
      }}
    >
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        name="query"
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              // gap: 10,
              // padding: 10,
            }}
          >
            <TextInput
              style={{
                height: 50,
                padding: 10,
                width: "80%",
                color: "#ffffff",
                backgroundColor: "#00000066",
                borderStyle: "solid",
                borderTopWidth: 1,
                borderTopColor: "#000000af",
                fontStyle: value === "" ? "italic" : "normal",
              }}
              cursorColor="#ffffff"
              placeholder="Tell me a song, lyric, or artist..."
              placeholderTextColor="#ffffff66"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              selectTextOnFocus
              autoCorrect={false}
              autoCapitalize="none"
              keyboardAppearance="dark"
              clearButtonMode="while-editing"
            />
            <Pressable
              style={{
                height: 50,
                width: "20%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#00000066",
                borderStyle: "solid",
                borderTopWidth: 1,
                borderTopColor: "#000000af",
              }}
              onPress={handleSubmit(onSubmit, onError)}
              disabled={loading}
            >
              {!loading ? (
                <Text
                  style={{
                    color: value === "" ? "#ffffff66" : "tomato",
                  }}
                  selectable={false}
                >
                  Send
                </Text>
              ) : (
                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                  style={{ paddingTop: 5 }}
                />
              )}
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

export default InputField;
