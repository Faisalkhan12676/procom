//import liraries
import { Formik } from "formik";
import React, { Component, memo, useState } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { HelperText, Snackbar } from "react-native-paper";
import * as Yup from "yup";
import { firebase } from "../Firebaseconfig";
import { StackActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Paper, { ActivityIndicator } from "react-native-paper";

const validate = Yup.object({
  name: Yup.string().required("Name is Required*"),
  email: Yup.string().required("Email is required*").email(),
  password: Yup.string()
    .required("Password is required*")
    .min(8, "Password Must be 8 characters"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required*"),
});

// create a component
const Signup = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const RegisterUser = async (values) => {
    setLoading(true);
    let { name, email, password } = values;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const Picture = "";
          const major = "";
          const interests = "";
          firebase
            .firestore()
            .collection("USERS")
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              email,
              major,
              interests,
              Picture,
            })
            .then((res) => {
              firebase
                .auth()
                .signInWithEmailAndPassword(email.trim(), password)
                .then((res) => {
                  console.log(res.user.uid, "USER DATA");
                  AsyncStorage.setItem("token")
                    .then((res) => {
                      console.log("SAVED");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  navigation.dispatch(
                    StackActions.replace("Profile", { payload: res.user.uid })
                  );
                  setLoading(false);
                })
                .catch((err) => {
                  console.log("error from firebase", err);
                  setLoading(false);
                });
            })
            .catch((err) => {
              console.log("Error Storing Data", res.message);
            });
        })
        .catch((err) => {
          console.log("Error Creating Login", err.code);
          if (err.code === "auth/email-already-in-use") {
            //SetErrorCode("Email Already Exisit try Login");
            // onToggleSnackBar();
            setErr("Email Already Exisit");
          }
        });
    } catch (error) {
      console.log(error, "error10");
    }
  };

  const onDismissSnackBar = () => setLoading(false);
  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            alignSelf: "flex-start",
          }}
        >
          Lets Register{"\n"} Account
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          Hello there, You have a greatful Journey
        </Text>
      </View>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validate}
        onSubmit={(Values) => {
          RegisterUser(Values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              placeholder="Your Name"
              style={styles.inputs}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            <HelperText type="error" style={styles.error}>
              {touched.name && errors.name}
            </HelperText>
            <TextInput
              placeholder="Email"
              style={styles.inputs}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <HelperText type="error" style={styles.error}>
              {touched.email && errors.email}
            </HelperText>
            <TextInput
              placeholder="Password"
              style={styles.inputs}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <HelperText type="error" style={styles.error}>
              {touched.password && errors.password}
            </HelperText>

            <TextInput
              placeholder="Confirm Password"
              style={styles.inputs}
              onChangeText={handleChange("confirmpassword")}
              onBlur={handleBlur("confirmpassword")}
              value={values.confirmpassword}
            />
            <HelperText type="error" style={styles.error}>
              {touched.confirmpassword && errors.confirmpassword}
            </HelperText>

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.7}
              style={{
                width: "100%",
                height: 55,
                backgroundColor: "#000",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                elevation: 1,
                marginVertical: 10,
              }}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={{ fontSize: 20, color: "#EEE" }}>Signup</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <View style={{ marginVertical: 10 }}>
        <Text>
          Already Have an account?
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ fontWeight: "bold" }}>Login Now</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <Snackbar
        style={{
          backgroundColor: "red",
        }}
        visible={loading}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
            onDismissSnackBar();
          },
        }}
      >
        {err}
      </Snackbar>
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
    height: 55,
    padding: 20,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
  },
  error: {
    alignSelf: "flex-start",
  },
});

//make this component available to the app
export default memo(Signup);
