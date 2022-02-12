import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { Input, Image, Icon } from "react-native-elements";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Touchable, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Task from "../components/Task";

import {createStackNavigator} from '@react-navigation/stack'
import Perfil from '../pantallas/perfil/Perfil'

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Casa from "../pantallas/Casa/Casa";
import CursoDragon from '../pantallas/Cursos/CursoDragon';
import CursoLeon from '../pantallas/Cursos/CursoLeon';
import CursoMapache from '../pantallas/Cursos/CursoMapache';
import CursoZorro from '../pantallas/Cursos/CursoZorro';
import CursoAvanzado from "../pantallas/Cursos/CursoAvanzado";
import CursoBasico from "../pantallas/Cursos/CursoBasico";

import Contacto from '../pantallas/Tienda/Contacto'

import {createDrawerNavigator} from '@react-navigation/drawer'
import DrawerContent from "../components/DrawerContent";
import HiraganaVoc from "../../src/pantallas/vocabulario/HiraganaVoc"
import KatakanaVoc from "../pantallas/TiposDeEscritura/KatakanaVoc";
import Hiragana from "../pantallas/TiposDeEscritura/Hiragana";
import KanjiVoc from "../pantallas/vocabulario/KanjiVoc";
import ComprensionAuditiva from "../pantallas/Auditivo/ComprensionAuditiva";
import HiraganaEjemplos from "../pantallas/vocabulario/HiraganaEjemplos";
import KanjiEjemplos from "../pantallas/vocabulario/KanjiEjemplos";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



//creamos el objeto para la navegacion
const Tab = createBottomTabNavigator();

export default function RutasAutenticadas() {
  
  return (
    
    <NavigationContainer>
      <Drawer.Navigator style = {styles.drawerCont}
      drawerContent={(props) => <DrawerContent{...props}/>}>
        <Drawer.Screen name= "Tienda" component={TabBar} options={{headerShown:false}}/>
        <Drawer.Screen name = "contacto" component={Contacto} options={{headerShown:false}}/>
      </Drawer.Navigator>
      

      {/*<Animated.View
        style={{
          width: getWidth() - 30,
          height: 2,
          backgroundColor: "#3A0CA3",
          position: "absolute",
          bottom: 94,
          //horizontal
          left: 38,
          borderRadius: 50,
          transform: [
            {
              translateX: tabOffsetValue,
            },
          ],
          marginVertical:-20,
          
        }}
      ></Animated.View>*/}
      
    </NavigationContainer>
    
  );
}

const TabBar = () => {
  //Animacion barra horizontal
  //useRef es un 'hook': en esencia  useRef es como una 'caja' que puedes mantener en una variable mutable en su propiedad .current
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return(
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          //esto nos permite quitar el texto dentro de las tab screena
          tabBarShowLabel: false,
          
          // los estilos del tab bar en general
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#D93236",
            //bottom: 25,
            //marginHorizontal: 20,
            //altura maxima
            height: 60,
            //borderRadius: 50,
            //la sombra
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            //paddingHorizontal: 20,
            //marginVertical:10,
            //borderWidth:1,
            borderColor:"#D93236",
            
          },
        }}
      >
        
        {
          //LOS DIFERENTES TAB.SCREENS
        }
        <Tab.Screen
          name={"Home"}
          component={HomeScreen}
          
          options={{
            //el icono que se pondra
            tabBarIcon: ({ size, focused }) => (
              <MaterialCommunityIcons
                name="home"
                size={size}
                color={focused ? "#FFFFFF" : "#F2B1B2"}
              />
            ),
            headerShown:false,
            
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              //Animated sprin nos permite definir valores que se animaran de principio a fin
              //sin nesecidad de definir valores como timing
              //spring recibe el valor y la configuracion
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

      

        <Tab.Screen
          name={"Tareas"}
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity>
                <LinearGradient
                  //start={{ x: 0, y: 1 }}
                  // end={{ x: 1, y: 1 }}
                  // Button Linear Gradient
                  colors={["#3A0CA3", "#F72585"]}
                  style={{
                    width: 55,
                    height: 55,
                    //backgroundColor: "#F72585",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 45,
                  }}
                >
                  <MaterialCommunityIcons
                    name="clipboard-list-outline"
                    size={30}
                    color={"white"}
                  />
                </LinearGradient>
              </TouchableOpacity>
            ),
            
          }}
        ></Tab.Screen>
       
        <Tab.Screen
          
          name={"Perfil"}
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={focused ? "#FFFFFF" : "#F2B1B2"}
                //p
              />
            ),
            headerShown:false //Quita el borde de arriba que contiene el name={"Perfil"}
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
        
      </Tab.Navigator>
  )
}

function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 50;
  // total
  return width / 5;
}

function EmptyScreen() {
  return (
    <Task/>
  );
}

function HomeScreen() {
  return (
    
    <Stack.Navigator>
    
      <Stack.Screen component={Casa} name="home" options={{headerShown:false}}/>
      
      <Stack.Screen component ={CursoMapache} name="mapache" options={{ headerShown:false }}/>
      <Stack.Screen component={CursoDragon} name="dragon" options={{headerShown:false}}/>
      <Stack.Screen component={CursoLeon} name = "leon" options={{headerShown:false}}/>
      <Stack.Screen component = {CursoZorro} name="zorro" options={{headerShown:false}}/>
      <Stack.Screen component = {CursoBasico} name="basico" options={{headerShown:false}}/>
      <Stack.Screen component = {CursoAvanzado} name="avanzado" options={{headerShown:false}}/>
      
      <Stack.Screen component = {Hiragana} name="hiragana" options={{headerShown:false}}/>
      <Stack.Screen component = {KatakanaVoc} name="katakanaVoc" options={{headerShown:false}}/>
      <Stack.Screen component = {KanjiVoc} name="kanjiVoc" options={{headerShown:false}}/>
      <Stack.Screen component = {ComprensionAuditiva} name="auditiva" options={{headerShown:false}}/>
      <Stack.Screen component = {Task} name="Tareas" options={{headerShown:false}}/>

      <Stack.Screen component = {HiraganaVoc} name="vocabulario" options={{headerShown:false}}/>
      <Stack.Screen component = {HiraganaEjemplos} name="hiraganaEjemplos" options={{headerShown:false, title: '形容詞 - Adjetivos',headerStyle:{ backgroundColor: "#2B1E47"}}} />
      <Stack.Screen component = {KanjiEjemplos} name="kanjiEjemplos" options={{headerShown:false, title: 'Kanji - Sensei',headerStyle:{ backgroundColor: "#360C29"}, }}  />

    </Stack.Navigator>
  );
}

function NotificationScreen() {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    ></View>
  );
}
function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Buscar</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    
    <Stack.Navigator>
    
      <Stack.Screen component={Perfil} name="perfil" options={{headerShown:false}}/>
      
    </Stack.Navigator>
    
  );
}

const styles = StyleSheet.create({
  container2: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 35,
    marginHorizontal: 20,
    height: 60,
    borderRadius: 10,
  },
  drawerCont:{
    backgroundColor: "#000"
  }
});
