import { BottomNavigation, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../Screens/Home";
import Search from "../Screens/Search";


const BottomNav = () => {
  const [index, setIndex] = useState(0);

  const [routes, setroutes] = useState([
    {
      key: "Home",
      title: "Home",
      unfocusedIcon: (props) => (
        <Icons {...props} name="home-outline" size={27} />
      ),
      focusedIcon: (props) => <Icons {...props} name="home" size={30} />,
    },
    {
      key: "Search",
      title: "Search",
      focusedIcon: (props) => <Ionicons {...props} name="search" size={30} />,
      unfocusedIcon: (props) => (
        <Ionicons {...props} name="search-outline" size={27} />
      ),
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: Home,
    Search:Search
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={"black"}
      style={{ backgroundColor: "#FFF", overflow: "hidden" }}
      shifting={true}
      theme={{ colors: { secondaryContainer: "transparent" } }}
    />
  );
};
export default BottomNav;
