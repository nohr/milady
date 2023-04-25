import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";

type Inputs = {
  query: string;
};

function InputField() {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setValue("query", "");
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data.query),
    });
    const result = await response.json();
    console.log(result);
  };

  const onError = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
                borderWidth: 1,
                borderColor: "#000000af",
                fontStyle: value === "" ? "italic" : "normal",
              }}
              cursorColor="#ffffff"
              placeholder="Tell me a song, lyric, or artist..."
              placeholderTextColor="#ffffff66"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              // autoFocus
              autoCorrect={false}
              autoCapitalize="none"
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
                borderWidth: 1,
                borderColor: "#000000af",
              }}
              onPress={handleSubmit(onSubmit, onError)}
            >
              <Text
                style={{
                  color: value === "" ? "#ffffff66" : "#fff",
                }}
                disabled={value === ""}
                selectable={false}
              >
                Send
                {/* <ActivityIndicator
                  size="small"
                  color="#ffffff"
                  style={{ paddingTop: 5 }}
                /> */}
              </Text>
            </Pressable>
          </View>
        )}
      />
      {errors.query && (
        <Text
          style={{
            fontStyle: "italic",
            color: "#fff",
            backgroundColor: "#ff000066",
            padding: 5,
            borderRadius: 5,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#ff0000af",
          }}
        >
          You have to send something!
        </Text>
      )}
    </View>
  );
}

export default InputField;
