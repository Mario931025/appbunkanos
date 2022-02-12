// //AQUI ES EL RENDER DEL ITEM QUE COMPONE EL FLAT LIST  ||  4
// // LAS PALABRAS DENTRO DE LAS CATEGORIAS
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { color } from "react-native-reanimated";

export default function VocabularioSub(props) {
  const name = props.props.hiragana;
  const palabra = props.props.palabra;
  const alternativas = props.props.alternativas;
  const oraciones = props.props.oraciones;
  const oracionesTraduccion = props.props.oracionesTraduccion;
  const { width } = useWindowDimensions();
  console.log("NAME------------------------------");
  console.log(name);
  //console.log("type of");
  //console.log(typeof(name));
  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.text}>{Object.values(name)}</Text>
      <Text style={styles.subTextSup}>{palabra}</Text>
      <View style={styles.subContainer}>
        <Text style={styles.subText}>Oraciones de ejemplo: </Text>
        <Text style={{ marginLeft: 20, fontSize: 16,marginTop:20, color: "#000" }}>
          {" "}
          {alternativas}{" "}
        </Text>
        <Text style={styles.subText}>Alternativas: </Text>
        <Text
          style={{ marginLeft: 20, fontSize: 16, marginTop: 20, color: "#000" }}
        >
          {oraciones}{" "}
        </Text>

        <Text
          style={{ marginLeft: 20, fontSize: 16, marginTop: 20, color: "#000" }}
        >
          {oracionesTraduccion}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //position:"absolute",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
    justifyContent: "center",
    alignContent: "center",
    //borderColor: "#fff",
    //paddingHorizontal: 92,
    //borderWidth:1
  },
  subContainer:{
    marginTop: "20%",
    padding: 20

  },
  subTextSup: {
    marginTop: 20,
    color: "#fff",
  },
  text: {
    fontWeight: "bold",
    fontSize: 96,
    color: "#fff",
  },
  subText: {
    marginTop: 20,
    fontSize: 24,
    color: "#000",
    fontWeight: '600',
  },
  subTitle: {
    marginTop: 30,
  },
});
