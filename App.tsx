import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "./screens/Settings";
import Chat from "./components/Chat";
import IonIcons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ backgroundColor: "#2e2529", height: "100%" }}>
        <StatusBar style="light" />
        <Tab.Navigator
          initialRouteName="Chat"
          sceneContainerStyle={{
            backgroundColor: "#2e2529",
          }}
          screenOptions={{
            headerTitle: "milady ♪",
            headerStyle: {
              backgroundColor: "#f4511e00",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarStyle: {
              backgroundColor: "#2e2529",
              borderTopWidth: 0,
            },
            headerBackgroundContainerStyle: {
              backgroundColor: "#2e2529",
            },
          }}
        >
          <Tab.Screen name="Chat" component={Chat} options={{}} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
