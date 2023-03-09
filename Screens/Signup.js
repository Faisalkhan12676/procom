//import liraries
import React, { Component } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// create a component
const Signup = () => {
  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <TextInput placeholder="Name" style={styles.inputs} />
      <TextInput placeholder="Email" style={styles.inputs} />
      <TextInput placeholder="Password" style={styles.inputs} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          width: "100%",
          height: 55,
          backgroundColor: "red",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          elevation: 1,
        }}
      >
        <Text style={{ fontSize: 20, color: "#EEE" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  inputs: {
    backgroundColor: "#EEE",
    width: "100%",
    height: 60,
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
});

//make this component available to the app
export default Signup;
