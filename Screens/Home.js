import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Chip, Divider } from "react-native-paper";
import { Avatar, Card, IconButton } from "react-native-paper";
import News from "./News";
import { firebase } from "../Firebaseconfig";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Badge } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

const Home = () => {
  const [interests, setInterests] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedchip, setSelectedChip] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getInterests = () => {
    firebase
      .firestore()
      .collection("INTERESTS")
      .get()
      .then((snapshot) => {
        // setInterests(snapshot);
        let arr = [];
        snapshot.forEach((e) => {
          arr.push(e.data());
        });

        setInterests([...arr]);
      });
  };

  const getStudents = () => {
    firebase
      .firestore()
      .collection("USERS")
      .get()
      .then((snapshot) => {
        setLoading(false);
        setSelectedChip(null);
        let stdArr = [];
        snapshot.forEach((e) => {
          stdArr.push(e.data());
        });
        setStudents(stdArr);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const currentUserData = () => {
    firebase
      .firestore()
      .collection("USERS")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        setCurrentUser(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    currentUserData();
    getInterests();
    getStudents();
  }, []);

  const handleFilter = (id) => {
    setLoading(true);
    setSelectedChip(id);

    firebase
      .firestore()
      .collection("USERS")
      .where("interests", "array-contains", Number(id))
      .get()
      .then((querySnapshot) => {
        setLoading(false);
        let stdArr = [];
        querySnapshot.forEach((e) => {
          stdArr.push(e.data());
        });
        setStudents(stdArr);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setLoading(false);
      });
  };

  const handleSelectAll = () => {
    setLoading(true);
    getStudents();
  };

  const Chips = ({ item }) => {
    return (
      <Chip
        mode="outlined"
        style={{
          marginHorizontal: 5,
        }}
        selected={selectedchip === item.id}
        selectedColor={selectedchip === item.id ? "#6c757d" : "#000"}
        onPress={() => handleFilter(item.id)}
      >
        {item.name}
      </Chip>
    );
  };



  const handleNav = (item) =>{
    navigation.navigate('PProfile',{payload:item})
  }
  const userCard = ({ item }) => {
    return (
      <>
        <TouchableOpacity onPress={()=>handleNav(item)}>
        <Card.Title
          title={item.name}
          subtitle={item.email}
          left={(props) => (
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.Picture }}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          )}
        />
        </TouchableOpacity>
        <Divider />
      </>
    );
  };

  return (
    <View>
      <StatusBar />
      <Header data={currentUser} />
      <News />
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedchip ? (
          <IconButton icon="close" onPress={handleSelectAll} />
        ) : (
          <></>
        )}
        <FlatList
          data={interests}
          keyExtractor={(item) => item.id}
          renderItem={Chips}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <ScrollView>
        <View
          style={{
            height: 300,
          }}
        >
          {!loading ? (
            <FlatList
              data={students}
              keyExtractor={(item) => item.id}
              renderItem={userCard}
            />
          ) : (
            <ActivityIndicator
              style={{ marginTop: 20 }}
              animating={true}
              color={MD2Colors.amber200}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
