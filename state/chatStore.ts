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
  messages: [],
  addMessage: (message: MessageText) => {
    if (message.type === "mes") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      set((state) => ({ messages: [...state.messages, message] }));
    } else if (message.type === "err") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      set((state) => ({ messages: [...state.messages, message] }));
      setTimeout(() => {
        set((state) => ({
          messages: state.messages.filter((m) => m !== message),
        }));
      }, 3000);
    }
  },
  clearMessages: () => {
    set({ messages: [] });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert("Cleared all messages!");
  },
}));
