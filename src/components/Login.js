import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Image, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "react-native-elements/dist/helpers";
import { useNavigation } from "@react-navigation/native";
import { isEmpty } from "lodash";
import Loading from "./Loading";
import { validateEmail } from ".././utils/ValidarEmail";
import { validarsesion, cerrarsesion } from "../utils/Acciones";
import * as firebase from "firebase";
import { useFonts } from "expo-font";

//colores #634efa
//rgba(99,78,255,0.5)
//#d5067c
//rgba(213,6,124)
//#33359945
// boton singn in #39379a
// borde boton sing in #5450a6

//expo install react-native-safe-area-context

export default function Login(props) {
  const [loaded] = useFonts({
    HarmattanBold: require("../../assets/fonts/Harmattan-Bold.ttf"),
  });

  const navigation = useNavigation();
  const { toastRef } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  //cerrarSesion();

  const iniciarSesion = () => {
    if (isEmpty(email) || isEmpty(password)) {
      toastRef.current.show("No te olvides de ingresar correo y contraseña");
    } else if (!validateEmail(email)) {
      toastRef.current.show("Ingrese un correo valido");
    } else {
      setLoading(true);
      firebase.default
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          setLoading(false);
          toastRef.current.show("Has iniciado sesion correctamente");
          console.log(firebase.default.auth().currentUser);
        })
        .catch((err) => {
          setLoading(false);
          console.log("err");
          toastRef.current.show("El usuario o la contraseña es incorrecta");
        });
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(144,19,126,2 )", "transparent"]}
        style={styles.background}
      />

      <Text style={styles.TextCreate}>Inicia Sesión</Text>

      <Text style={{ color: "#CECBCE", marginBottom: "5%" }}>
        {" "}
        BUNKAN NICHIBOKU{" "}
      </Text>

      <Input
        style={styles.input}
        placeholder="Email"
        leftIcon={{
          type: "material-community",
          name: "email-outline",
          color: "#fff",
        }}
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />

      <Input
        style={styles.input}
        placeholder="Contraseña"
        leftIcon={{
          type: "material-community",
          name: "lock-outline",
          color: "#fff",
        }}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#fff",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry={showPassword}
        value={password}
      />

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => iniciarSesion()}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          // Button Linear Gradient
          colors={["#3A0CA3", "#F72585"]}
          style={styles.button}
        >
          <Text style={styles.text}>Entrar</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "80%",
        }}
      >
        <Text style={styles.textRegister}>
          ¿Olvidaste tu contraseña? {"      "}
        </Text>

        <View style={{ marginVertical: "5%" }}>
          <TouchableOpacity
            style={styles.buttonSignIn2}
            onPress={() => navigation.navigate("restaurarP")}
          >
            <Text style={styles.textRegistrar}>Haz clic aqui</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "70%",
          marginTop: 15,
        }}
      >
        <Text style={styles.textRegister}>¿No tienes cuenta? {"  "}</Text>

        <View style={{ marginVertical: "10%" }}>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={styles.textRegistrar}>Haz clic aqui</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    padding: "8%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    //marginTop: "35%",
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  button: {
    padding: "4%",
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
    fontWeight: "bold",
  },
  textRegistrar: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#C6C4C4",
    textDecorationLine: "underline",
    fontWeight: "bold",
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
    marginTop: "16%",
  },
  TextCreate: {
    fontSize: 45,
    color: "#fff",
    fontFamily: "HarmattanBold",
    //marginBottom: "4%",
  },
  input: {
    color: "#fff",
  },
  textRegister: {
    fontSize: 15,
    color: "#fff",
    marginTop: "10%",
  },
  buttonRegister: {
    width: 400,
    alignSelf: "center",
    alignItems: "center",
    marginTop: "5%",
  },
});
