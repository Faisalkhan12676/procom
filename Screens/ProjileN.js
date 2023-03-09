//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { firebase } from "../Firebaseconfig";
import { Formik } from "formik";
import * as Yup from "yup";
import { FlatList } from "react-native";
import { Chip } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import CButton from "../components/CButton";
import Icons from "react-native-vector-icons/Feather";

const validate = Yup.object({
  interests: Yup.array().required("Interests are Required*"),
  major: Yup.string().required("Major is Required*"),
  Picture: Yup.string().required("Please Select Your Picture"),
});

const Ainterests = [
  { name: "Football", key: 1 },
  { name: "Cricket", key: 2 },
  { name: "Esports", key: 3 },
  { name: "Hangout", key: 4 },
  { name: "Indoor", key: 5 },
  { name: "Books", key: 6 },
];

const ProfileN = () => {
  const [Selected_Image, SetSelected_Image] = useState("");
  const [GetMajors, setGetMajors] = useState([]);
  const [Majors, SetMajors] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("MAJOR")
      .get()
      .then((query) => {
        let x = query.docs.map((doc) => {
          return {
            label: doc.data().name,
            value: doc.data().name,
          };
        });
        setGetMajors(x);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style={styles.Header}></View> */}
      <Formik
        validationSchema={validate}
        initialValues={{ major: "", interests: [], Picture: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <View style={styles.Mid}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  alignSelf: "flex-end",
                  marginHorizontal: 10,
                  fontWeight: "bold",
                  color: "#FFF",
                }}
              >
                Complete Your Profile
              </Text>
              <Text style={{ color: "#FFF", marginVertical: 10 }}>
                Unlock More Opportunities by Adding More Information About
                Yourself
              </Text>
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#EEE",
                  height: 200,
                  position: "absolute",
                  top: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginVertical: 30,
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "#FFF",
                    borderRadius: 100,
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    overflow: "hidden",
                    margin: 10,
                  }}
                >
                  {Selected_Image != "" ? (
                    <Image
                      source={{ uri: Selected_Image }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode={"cover"}
                    />
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        UploadPicture();
                      }}
                    >
                      <Icons name={"user-plus"} size={100} />
                    </TouchableOpacity>
                  )}
                </View>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Choose your Picture
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                height: 200,
                backgroundColor: "#FFF",
                position: "absolute",
                bottom: "10%",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 17, marginBottom: 10 }}>
                Select Your Major
              </Text>
              {GetMajors.length === 0 ? (
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: 18,
                  }}
                >
                  Loading...
                </Text>
              ) : (
                <View
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    marginBottom: 20,
                  }}
                >
                  <DropDown
                    label={"Select your Majors"}
                    mode={"flat"}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={Majors}
                    setValue={SetMajors}
                    list={GetMajors}
                  />
                </View>
              )}

              <Text style={{ fontSize: 17, marginBottom: 10 }}>
                Choose Your Interests
              </Text>

              <FlatList
                data={Ainterests}
                keyExtractor={(i) => i.key}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View>
                    <Chip
                      selectedColor="#000"
                      style={{
                        margin: 5,
                        backgroundColor: values.interests.includes(item.key)
                          ? "#dbdbdb"
                          : "#EEE",
                      }}
                      mode="flat"
                      onPress={() => {
                        if (values.interests.includes(item.key)) {
                          setFieldValue(
                            values.interests.splice(
                              values.interests.indexOf(item.key),
                              1
                            )
                          );
                        } else {
                          setFieldValue(values.interests.push(item.key));
                        }
                      }}
                      selected={
                        values.interests.includes(item.key) ? true : false
                      }
                      textStyle={{ fontWeight: "bold" }}
                    >
                      {item.name}
                    </Chip>
                  </View>
                )}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

// define your styles
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
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

//make this component available to the app
export default ProfileN;
