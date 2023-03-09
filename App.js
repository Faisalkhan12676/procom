import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./Navigation/Stack";
import Profile from "./Screens/Profile";
import { Provider as Paper } from "react-native-paper";
import ProfileN from "./Screens/ProjileN";
export default function App() {
  return (
    <Paper>
      <ProfileN />
      {/* <NavigationContainer>
        <Profile />
      </NavigationContainer> */}
    </Paper>
  );
}
