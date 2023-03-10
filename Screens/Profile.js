import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { firebase } from "../Firebaseconfig";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { FlatList } from "react-native";
import { Avatar, Chip } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import CButton from "../components/CButton";
import Icons from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { async } from "@firebase/util";
import { StackActions } from "@react-navigation/routers";
import { useNavigation } from "@react-navigation/core";

const Profile = ({ route }) => {
  const { payload } = route.params;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            height: "auto",
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                pickImage();
              }}
            >
              <View
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 100,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: payload.Picture }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode={"cover"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              alignSelf: "center",
              marginHorizontal: 10,
              fontWeight: "bold",
              color: "#FFF",
            }}
          >
            {payload.name}
          </Text>
          <Text
            style={{
              color: "#FFF",
              marginVertical: 10,
              textAlign: "center",
            }}
          >
            {payload.email} - #123
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            Major
          </Text>
          <Text
            style={{
              marginHorizontal: 20,
            }}
          >
            {payload.major}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            Interests
          </Text>
          {payload.interests.map((e) => (
            <Text
              style={{
                marginHorizontal: 20,
              }}
            >
              {e}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: "10%",
    alignItems: "center",
  },
  Header: {
    backgroundColor: "#EEE",
    width: "100%",
  },
  Mid: {
    width: "100%",
    backgroundColor: "#000",
    height: 200,

    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
