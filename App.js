import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Welcome from "./Screens/Welcome";

export default function App() {
  return <Header />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
