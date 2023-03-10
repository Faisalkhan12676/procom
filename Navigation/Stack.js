import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login";
import Profile from "../Screens/Profile";
import Signup from "../Screens/Signup";
import BottomNav from "./Bottom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import ProfileN from "../Screens/ProjileN";


const Stack = createStackNavigator();

export default function StackNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  AsyncStorage.getItem("token")
    .then((res) => {
      console.log(res);
      if (res) {
        setIsLoggedIn(true);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Profile" component={ProfileN} />
      <Stack.Screen name="PProfile" component={Profile} />
      <Stack.Screen name="BottomNav" component={BottomNav} />
    </Stack.Navigator>
  );
}
