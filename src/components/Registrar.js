import React ,{Component, useState}from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input, Image, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { color } from "react-native-elements/dist/helpers";
import { useNavigation } from "@react-navigation/native";
import {isEmpty, size} from 'lodash'
import Loading from "./Loading";
import * as firebase from 'firebase'
import {validateEmail} from '../utils/ValidarEmail'
import { useFonts } from 'expo-font'

//colores #634efa
//rgba(99,78,255,0.5)
//#d5067c
//rgba(213,6,124)
//#33359945
// boton singn in #39379a
// borde boton sing in #5450a6

//expo install react-native-safe-area-context

export default Register = (props) => {

  const [loaded] = useFonts({
    HarmattanBold: require('../../assets/fonts/Harmattan-Bold.ttf'),
  });

  const {toastRef} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPW, setShowConfirmPW] = useState(true)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  const crearCuenta = () =>
  {
    if(isEmpty(email) || isEmpty(password) || isEmpty(repetirPassword))
        {
            toastRef.current.show("Todos los campos son obligatorios")
        }
        else if(!validateEmail(email))
        {
            toastRef.current.show("Ingrese un correo valido")
        }
        else if(password != repetirPassword)
        {
            toastRef.current.show("Las contraseñas deben de ser iguales")
        }
        else if(size(password) < 6)
        {
            toastRef.current.show("La contraseña debe de tener minimo 6 carateres")
        }
        else
        {
            firebase.default.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => 
            {
              toastRef.current.show("Se ha crado el usuario correctamente")
              setLoading(false)
            })
            .catch((err) =>
            {
              setLoading(false)
              toastRef.current.show("Ha ocurrido un error, intentelo mas tarde")
              console.log(err)
            })
        }
  }

  /*<TouchableOpacity style={styles.buttonSignIn} onPress = {() => navigation.navigate('login')}>
        <Text style={styles.textInicioSesion}>  Iniciar sesión  </Text>
      </TouchableOpacity>*/

    /*<Image
      source={require('../../assets/LogoBunkan.jpg')}
      style={styles.LogoBunkan} />*/

/*tamaños originales de la imagen
  width: 280, 
  height: 150,
*/

  if(!loaded)
  {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(144,19,126,2 )", "transparent"]}
        style={styles.background}
      />

      <Text style={styles.TextCreate}>Crea tu cuenta</Text>

      <Text style={{color:"#CECBCE", marginTop:10}}> BUNKAN NICHIBOKU </Text>

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
        value={email}/>

      <Input
        style={styles.input}
        placeholder="Contraseña"
        leftIcon={{
          type: "material-community",
          name: "lock-outline",
          color: "#fff",
        }}

        rightIcon=
        {{
          type:"material-community",
          name:showPassword ? "eye-outline" : "eye-off-outline",
          color:"#fff",
          onPress: () => setShowPassword(!showPassword)
        }}
        onChangeText={(text) =>
          {
            setPassword(text)
          }}
        secureTextEntry={showPassword}
        value={password}/>

      <Input
        style={styles.input}
        placeholder="Confirmar contraseña"
        leftIcon={{
          type: "material-community",
          name: "lock-outline",
          color: "#fff",
        }}

        rightIcon=
        {{
          type:"material-community",
          name:showConfirmPW ? "eye-outline" : "eye-off-outline",
          color:"#fff",
          onPress: () => setShowConfirmPW(!showConfirmPW)
        }}
        onChangeText={(text) =>
          {
            setRepetirPassword(text)
          }}
        secureTextEntry={showConfirmPW}
        value={repetirPassword}
      />
      <TouchableOpacity style= {styles.buttonRegister} onPress = {() => crearCuenta()}>

      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        // Button Linear Gradient
        colors={["#3A0CA3", "#F72585"]}
        style={styles.button}>

        <Text style={styles.text}>Registrarse</Text>

        </LinearGradient>

        </TouchableOpacity>  
      
      <View style={{flexDirection:"row",justifyContent:"space-around",width:"70%", marginTop:15}}>

        <Text style={styles.textRegister }>
            O registrate con
        </Text>

            <View style={{marginVertical:-14}}>

              <TouchableOpacity styles= {styles.buttomEnter}>

                <Icon
                  size={35}
                  containerStyle = {{padding: 5,borderWidth:0.5, borderRadius:100, borderColor: "#fff", }}
                  type="material-community"
                  name="google"
                  color="#fff"
                  backgroundColor="transparent"
                />

              </TouchableOpacity>

            </View>

            <View style={{marginVertical:-14}}>

              <TouchableOpacity styles={ styles.buttomEnter}>

                <Icon
                  size={35}
                  containerStyle = {{padding: 5,borderWidth:0.5, borderRadius:100, borderColor: "#fff"}}
                  type="material-community"
                  name="facebook"
                  color="#fff"
                  backgroundColor="transparent"
                />

              </TouchableOpacity>

            </View>

      </View>

      <View style={{flexDirection:"row",justifyContent:"space-around",width:"70%", marginTop:15}}>

        <Text style={styles.textRegister}>
          ¿Ya tienes cuenta?
        </Text>

          <View style={{marginVertical:0}}> 

            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              
              <Text style={styles.textRegistrar}>
                Haz clic aqui
              </Text>

          </TouchableOpacity>

        </View>

      </View>

        <Loading isVisible = {loading} text="Cargando..."/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#560BAD",
    padding: 20,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    //paddingBottom:80
    
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200,
    borderTopLeftRadius:40,
    borderTopRightRadius:40
  },
  button: {
    padding: 17,
    alignItems: "center",
    borderRadius: 50,
    marginBottom: "10%",
    shadowColor: "#fff",
    elevation: 8,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 25,
    color: "#fff",
    fontWeight:"bold"
  },
  textInicioSesion:
  {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
    padding:10
  },
  buttonSignIn: {
    marginLeft: "65%",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
    
  },
  TextCreate: {
    fontSize: 45,
    color: "#fff",
    alignSelf:"center",
    fontFamily: "HarmattanBold",
    marginBottom:-20

  },
  input: {
    color:"#fff"
  },
  textRegister: {
    fontSize: 15,
    //color: "#C6C4C4",
    color:"#fff",
    marginBottom:25,
  },
  textRegistrar:
  {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#C6C4C4",
    textDecorationLine: 'underline',
    fontWeight:"bold"
  },
  buttomEnter:
  {
    
  },
  buttonRegister:{
    width: 300,
    alignSelf:"center",

  },
  imageMain:{
    paddingLeft: 80
  },
  LogoBunkan:
  {
    width: 160, 
        height: 90, 
        //marginRight: 35 , 
        //marginTop: 10,
        alignSelf:"center",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
  }
});