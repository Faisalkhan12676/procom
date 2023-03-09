import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/Login";
import Profile from "../Screens/Profile";
import Signup from "../Screens/Signup";
import BottomNav from "./Bottom";

const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNav" component={BottomNav} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
