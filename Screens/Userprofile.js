//import liraries
import React, { Component } from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// create a component
const UserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row", height: "50%" }}>
        <View
          style={{
            backgroundColor: "#dbdbdb",
            width: Dimensions.get("screen").width / 2,
            justifyContent: "space-around",
            alignItems: "center",
            height: "45%",
            alignContent: "center",
          }}
        >
          <Icon
            name="arrow-left"
            size={30}
            style={{ alignSelf: "flex-start", marginHorizontal: 10 }}
            color={"#000"}
          />
          <View>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: "orange",
                marginVertical: 20,
              }}
            ></View>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                TALHA RAj
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width / 2,
            backgroundColor: "#EEE",
            height: "45%",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <View style={{ marginTop: "50%" }}>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 20, color: "#000" }}>Email</Text>
              <Text style={{ fontSize: 15, color: "red" }}>
                talhar@gmail.com
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 20, color: "#000" }}>Major</Text>
              <Text style={{ fontSize: 15, color: "red" }}>
                talhar@gmail.com
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 20, color: "#000" }}>
                Uninversity Id
              </Text>
              <Text style={{ fontSize: 15, color: "red" }}>
                talhar@gmail.com
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
  },
});

//make this component available to the app
export default UserProfile;
