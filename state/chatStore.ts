import { Alert } from "react-native";
import { create } from "zustand";
import * as Haptics from "expo-haptics";

export class MessageText {
  constructor(
    public text: string,
    public type: "mes" | "err" = "mes",
    private from: "milady" | "you" = "milady"
  ) {}

  time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

type ChatStore = {
  messages: MessageText[];
  addMessage: (message: MessageText) => void;
  clearMessages: () => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  messages: [
    new MessageText("hey, what are you listening to?"),
    new MessageText("say something first!", "err"),
    new MessageText("say something first!", "err"),
    new MessageText("what are you up to?", "mes", "you"),
  ],
  addMessage: (message: MessageText) => {
    if (message.type === "mes")
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    set((state) => ({ messages: [...state.messages, message] }));
  },
  clearMessages: () => {
    set({ messages: [] });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert("Cleared all messages!");
  },
}));
