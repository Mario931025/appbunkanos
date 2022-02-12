//AQUI ES EL VIEW QUE CONTIENE FLAT LIST   || 3

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Animated,
} from "react-native";
import VocabularioSub from "./VocabularioSub";

export default function HiraganaEjemplos(list) {
  const words = list.route.params.list.props.info;
  //console.log("LISSTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  //console.log(words);
  const [index, setIndex] = useState(0);



  return (
    <ScrollView style={styles.container}>
      <View style={styles.miniContainer}>
        <Text style={styles.text}>{list.route.params.list.props.title}</Text>
        <View style={styles.containerFlat}>
          <View style={styles.flatContainer}>
            <View>
              <FlatList
                data={words}
                renderItem={({ item }) => (
                  <VocabularioSub props={item} />
                )}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                centerContent={true}
           
              />
            </View>
          </View>
        </View>

        
        
      </View>
      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  miniContainer: {
    backgroundColor: "#360C29",
    width: "100%",
    height: 370,
    borderRadius: 16,
  },
  subText: {
    margin: 20,
    fontSize: 24,
  },
  text: {
    color: "#fff",
    alignContent: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    fontSize: 24,
    alignSelf: "center",
    padding: "15%",
  },
  img: {
    paddingTop: "15%",
  },
  textWord: {
    color: "#fff",
    fontSize: 16,
    alignContent: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "center",
    margin: 11,
  },
  containerFlat: {
    backgroundColor: "transparent",
    flex: 1,
    position:"absolute",
    alignSelf: "center",

    marginTop: '40%'
  },
  flatContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
});
