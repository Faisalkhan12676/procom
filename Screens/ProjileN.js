
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

const ProfileN = ({ route }) => {
  const [Personimage, setPersonImage] = useState(null);
  const [GetMajors, setGetMajors] = useState([]);
  const [Majors, SetMajors] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const navigation = useNavigation();

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPersonImage(result.assets[0].uri);
      formik.setFieldValue("Picture", result.assets[0].uri);
    }
  };

  const formik = useFormik({
    initialValues: {
      major: "",
      interests: [],
      Picture: "",
    },

    onSubmit: async (values) => {
      const response = await fetch(values.Picture);
      const blob = await response.blob();
      const imageName = Date.now();

      const uploadTask = firebase
        .storage()
        .ref()
        .child(`Userpfp/${imageName}`)
        .put(blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          console.log("Upload complete");
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("Download URL:", downloadURL);
            firebase
              .firestore()
              .collection("USERS")
              .doc(firebase.auth().currentUser.uid)
              .update({
                major: values.major,
                interests: values.interests,
                Picture: downloadURL,
              })
              .then((res) => {
                console.log("USER UPDATED");
                navigation.dispatch(StackActions.replace("BottomNav"));
              })
              .catch((er) => {
                console.log(er);
              });
          });
        }
      );
    },
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.Header}></View> */}
      <Formik>
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
            <Text
              style={{
                color: "#FFF",
                marginVertical: 10,
                textAlign: "center",
              }}
            >
              Unlock More Opportunities by Adding More Information About
              Yourself
            </Text>

            <View>
              {Personimage ? (
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
                      source={{ uri: Personimage }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode={"cover"}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    pickImage();
                  }}
                >
                  <Avatar.Icon size={130} icon="account" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 250,
              backgroundColor: "#FFF",
              paddingHorizontal: 20,
              paddingVertical: 30,
            }}
          >
            <Text style={{ fontSize: 17, marginBottom: 10 }}>
              Please choose your area of study
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
                  label={"Majors"}
                  mode={"flat"}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={formik.values.major}
                  setValue={(e) => formik.setFieldValue("major", e)}
                  list={GetMajors}
                />
              </View>
            )}

            <Text style={{ fontSize: 17, marginBottom: 10 }}>
              Select the topics that interest you
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
                      backgroundColor: formik.values.interests.includes(
                        item.key
                      )
                        ? "#dbdbdb"
                        : "#EEE",
                    }}
                    mode="flat"
                    onPress={() => {
                      if (formik.values.interests.includes(item.key)) {
                        formik.values.interests.splice(
                          formik.values.interests.indexOf(item.key),
                          1
                        );
                        console.log("HELLO");
                      } else {
                        formik.values.interests.push(item.key);
                        console.log("BELLO");
                      }
                    }}
                    selected={
                      formik.values.interests.includes(item.key) ? true : false
                    }
                    textStyle={{ fontWeight: "bold" }}
                  >
                    {item.name}
                  </Chip>
                </View>
              )}
            />
          </View>

          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              onPress={formik.handleSubmit}
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
              <Text style={{ fontSize: 20, color: "#EEE", fontWeight: "bold" }}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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

    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

//make this component available to the app
export default ProfileN;
