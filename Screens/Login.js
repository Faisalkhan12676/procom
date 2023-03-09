//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Paper, { HelperText } from "react-native-paper";
import { firebase } from "../Firebaseconfig";

const validate = Yup.object({
  email: Yup.string().required("Email is required*").email(),
  password: Yup.string()
    .required("Password is required*")
    .min(8, "Password Must be 8 characters"),
});

// create a component
const Login = () => {
  const LoginUser = async (values) => {
    let { email, password } = values;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then((res) => {
          console.log("response from Firebase Login", res);
        })
        .catch((err) => {
          console.log("error from firebase", err);
        });
    } catch (err) {
      console.log("error while login", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", marginVertical: 10 }}>
          Lets Sign You in
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>
          Welcome Back,{"\n"}You have Been Missed
        </Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validate}
        onSubmit={(values) => LoginUser(values)}
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
              placeholder="Email"
              style={styles.inputs}
              keyboardType={"email-address"}
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
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <HelperText type="error" style={styles.error}>
              {touched.password && errors.password}
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
              <Text style={{ fontSize: 20, color: "#EEE" }}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={{ marginVertical: 10 }}>
        <Text>
          Dont Have an Account?
          <Text style={{ fontWeight: "bold" }}> Register Now</Text>
        </Text>
      </View>
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
    backgroundColor: "#FFFF",
    width: "100%",
    height: 55,
    padding: 20,
    margin: 10,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
  },
  error: {
    alignSelf: "flex-start",
  },
});

//make this component available to the app
export default Login;
