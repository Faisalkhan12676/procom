//import liraries
import React, { Component, memo, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/Feather";
import { Chip } from "react-native-paper";
import { firebase } from "../Firebaseconfig";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import DropDown from "react-native-paper-dropdown";
import * as Yup from "yup";
import { Formik } from "formik";
import { FlatList } from "react-native";

const validate = Yup.object({
  interests: Yup.array().required("Interests are Required*"),
  major: Yup.string().required("Major is Required*"),
  Picture: Yup.string().required("Please Select Your Picture"),
});
const Ainterests = [
  { name: "Football", key: 1 },
  { name: "Cricket", key: 2 },
  { name: "Esports", key: 3 },
];
// create a component
const Profile = () => {
  const [Selected_Image, SetSelected_Image] = useState("");
  const [GetMajors, setGetMajors] = useState([]);
  const [Majors, SetMajors] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const UploadPicture = async () => {
    DocumentPicker.getDocumentAsync({ type: "image/*" })
      .then((resz) => {
        console.log("response From Picker", resz);
        const image = resz.uri;
        SetSelected_Image(image);
      })
      .catch((err) => {
        console.log("Error From Picker", err);
      });
  };

  const ProceedUpload = async (Image) => {
    const responsr = await fetch(Image);
    const blob = await responsr.blob();
    const file = `/Userpfp/User-${firebase.auth().currentUser.uid}/`;
    const ref = firebase
      .storage()
      .ref()
      .child(file)
      .put(blob)
      .then(() => {
        firebase
          .storage()
          .ref(file)
          .getDownloadURL()
          .then((res) => {
            const user = firebase.auth().currentUser;
            let uid;
            if (user != null) {
              uid = user.uid;
              const db = firebase.firestore();
              const docRef = db.collection("USERS").doc(uid);
              docRef
                .update({
                  Picture: res,
                })
                .then(() => {
                  console.log("Picture Added");
                })
                .catch((error) => {
                  console.log("Error Adding Picture the document:", error);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {});

    try {
      await ref;
    } catch (error) {
      console.log("error", error);
    }
  };

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
      <View style={{ width: "100%" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginVertical: 10 }}>
          Complete Your Profile
        </Text>
      </View>
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
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#EEEE",
                borderRadius: 100,
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
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
              <Text>Choose Your Interests</Text>
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
              <Text>Select Your Major</Text>

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
              )}
            </View>
          </View>
        )}
      </Formik>
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
});

//make this component available to the app
export default memo(Profile);
