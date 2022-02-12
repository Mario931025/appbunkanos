import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Input, Image, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "react-native-elements/dist/helpers";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import Loading from "./Loading";
import { validateEmail } from ".././utils/ValidarEmail";
import { validarsesion, cerrarsesion } from "../utils/Acciones";
import * as firebase from "firebase";

//colores #634efa
//rgba(99,78,255,0.5)
//#d5067c
//rgba(213,6,124)
//#33359945
// boton singn in #39379a
// borde boton sing in #5450a6

//expo install react-native-safe-area-context

export default function Login(props)
{
    const navigation = useNavigation();
    const {toastRef} = props;
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    //cerrarsesion();

    const restaurarPassword = () =>
    {

    }

    
    return (
        <View style={styles.container}>

          <LinearGradient
            // Background Linear Gradient
            colors={["rgba(144,19,126,2 )", "transparent"]}
            style={styles.background}
          />
              
          <Text style={styles.TextCreate}>Ingresa tu correo</Text>
          
          
          <Input
            style={styles.input}
            placeholder="Email"
            leftIcon={{
              type: "material-community",
              name: "email-outline",
              color: "#fff",
            }}
            onChangeText={(text) =>
            {
              setEmail(text)
            }}
            value={email}
          />

          <TouchableOpacity style= {styles.buttonRegister}>

          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            // Button Linear Gradient
            colors={["#3A0CA3", "#F72585"]}
            style={styles.button}
          >
          <Text style={styles.text}>Recuperar contraseña</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Loading isVisible={loading} text="Espere un momento..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#560BAD",
    padding: 25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3c379b",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 17,
    alignItems: "center",
    borderRadius: 50,
    width: "75%",
    marginBottom: "5%",
    shadowColor: "#fff",
    elevation: 8,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 25,
    color: "#fff",
    fontFamily: "Roboto",
  },
  textRegistrar: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#C6C4C4",
  },
  textLostPassword: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#CECBCE",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  buttonSignIn: {
    paddingLeft: "65%",
  },
  buttonSignIn2: {
    marginTop: 10,
  },
  TextCreate: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#fff",
    marginBottom: 25,
  },
  input: {
    color: "#fff",
  },
  textRegister: {
    fontSize: 15,
    color: "#fff",
    marginTop: 20,
  },

  buttomEnter: {
    paddingRight: 10,
    borderColor: "#fff",
    borderRadius: 50,
    borderWidth: 1,
  },
  buttonRegister: {
    width: 400,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
