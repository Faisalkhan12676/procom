import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Chip, Divider } from "react-native-paper";
import { Avatar, Card, IconButton } from "react-native-paper";
import News from "./News";
import { firebase } from "../Firebaseconfig";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Badge } from "react-native-paper";
import { Searchbar } from "react-native-paper";

const Search = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const getStudents = () => {
    firebase
      .firestore()
      .collection("USERS")
      .get()
      .then((snapshot) => {
        setLoading(false);
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

  useEffect(() => {
    getStudents();
  }, []);

  const filteredData = students.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.major.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const userCard = ({ item }) => {
    return (
      <>
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
        <Divider />
      </>
    );
  };

  return (
    <SafeAreaView>
      <View style={{
        marginHorizontal:20,
        marginVertical:20
      }}>
        <Searchbar
          placeholder="Search By Name Or Major"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View
        style={{
          height: 300,
        }}
      >
        {!loading ? (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.name}
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
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
