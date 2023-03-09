//import liraries
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";

// create a component
const CButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: "100%",
        height: 55,
        backgroundColor: "#000",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
      }}
    >
      <Text style={{ fontSize: 20, color: "#EEE" }}>{title}</Text>
    </TouchableOpacity>
  );
};

//make this component available to the app
export default CButton;
