import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { memo } from "react";

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../Images/welcome.png")}
        style={{ height: 300, width: 300 }}
      />
      <View>
        <Text style={styles.text}>Welcome to the Student App</Text>
      </View>
      <View>
        <Text style={styles.welcome}>
          where you'll have access to all the resources you need to succeed in
          your academic journey!
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
          <Text style={{ color: "#fff", fontSize: 15 }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
          <Text style={{ color: "#fff", fontSize: 15 }}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default memo(Welcome);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    marginHorizontal: 20,
  },
  btn: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 80,
  },
  text: {
    fontSize: 20,
    textAlign: "justify",
    fontWeight: "bold",
  },
  welcome: {
    textAlign: "center",
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 18,
  },
});
