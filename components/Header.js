import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";

const Header = ({ data }) => {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 8 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);
  return (
    <SafeAreaView style={styles.svf}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
              }}
            >
              {greeting}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {data.name}
            </Text>
          </View>
          <View style={{ height: 40, width: 40 ,borderRadius:100,overflow:'hidden'}}>
            <Image source={{ uri: data.Picture }} style={{height:'100%',width:'100%'}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    backgroundColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  svf: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
