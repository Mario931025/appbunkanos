import React from "react";
import { StyleSheet, View, Text,Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Icon } from "react-native-elements";
import { ObtenerUsuario, cerrarsesion } from "../utils/Acciones";
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { color } from "react-native-reanimated";

export default function DrawerContent(props) {
    const {displayName, photoURL,email} = ObtenerUsuario();
    const navigation = useNavigation();

    const [loaded] = useFonts({
      Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
      MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
      OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf")
  });

  

  if (!loaded) {
      return null;
  }

    return(
        <View style={{ flex: 1, backgroundColor: "#68184F", }}>
        <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>

          <View style={{alignItems:"center",marginBottom:10, width:"100%",marginTop:10}}>
            <Image
              source={require("../../assets/BunkanLogo_Drawer.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.drawerSection}>
            <Text style={styles.title1}>Tipos de escritura</Text> 

            <DrawerItem 
              style={{marginBottom:-10,}}
              icon={({ color, size }) => (
                <Text
                  color={color}
                  size={size}
                  type="material-community"
                  style={styles.iconText}
                >
                    ん
                </Text>
              )}
              inactiveTintColor="#fff"
              label="Hiragana"
              labelStyle={styles.lables}
              onPress={() => {
                props.navigation.navigate("vocabulario");
              }}
            />

            <DrawerItem
              style={{marginBottom:-10}}
              icon={({ color, size }) => (
                <Text
                  color={color}
                  size={size}
                  type="material-community"
                  style={styles.iconText}
                >
                    ツ
                </Text>
              )}
              inactiveTintColor="#fff"
              label="Katakana"
              labelStyle={styles.lables}
              onPress={() => {
                props.navigation.navigate("katakanaVoc");
              }}
            />
            <DrawerItem
              style={{marginBottom:-10}}
              icon={({ color, size }) => (
                <Text
                  color={color}
                  size={size}
                  type="material-community"
                  style={styles.iconText}
                >
                    龍
                </Text>
              )}
              inactiveTintColor="#fff"
              label="Kanji"
              labelStyle={styles.lables}
              onPress={() => {
                props.navigation.navigate("kanjiVoc");
              }}
            />

            <View style={{backgroundColor:"#a6a6a6", height:1, width:"90%", marginTop:10, borderRadius:10, alignSelf:"center" }}/>

            <DrawerItem
              style={{marginBottom:-10}}
              icon={({ color, size }) => (
                <Image
                  source={require("../../assets/geisha.png")}
                  //color={"#fff"}
                  size={10}
                  style={{height:22,width:22}}
                />
              )}
              inactiveTintColor="#fff"
              label="Comprensión/Auditivo"
              labelStyle={styles.lables2}
              onPress={() => {
                props.navigation.navigate("auditiva");
              }}
            />

            <DrawerItem
              style={{marginBottom:-10}}
              icon={({ color, size }) => (
                <Image
                  source={require("../../assets/Vocabulario(1).png")}
                  //color={"#fff"}
                  size={10}
                  style={{height:18,width:18}}
                />
              )}
              inactiveTintColor="#fff"
              label="Vocabulario"
              labelStyle={styles.lables2}
              onPress={() => {
                props.navigation.navigate("vocabulario");
              }}
            />

            <DrawerItem
              style={{marginBottom:-10}}
              icon={({ color, size }) => (
                <Image
                  source={require("../../assets/letterW.png")}
                  //color={"#fff"}
                  size={10}
                  style={{height:18,width:18}}
                />
              )}
              inactiveTintColor="#fff"
              label="Lista de objetivos"
              labelStyle={styles.lables2}
              onPress={() => {
                props.navigation.navigate("Tareas");
              }}
            />

            <View style={{backgroundColor:"#a6a6a6", height:1, width:"90%", marginTop:10, borderRadius:10, alignSelf:"center" }}/>

            <DrawerItem
              style={{marginBottom:-10}}
              icon={({ color, size }) => (
                <Icon
                  name="badge-account-horizontal-outline"
                  color={color}
                  size={22}
                  type="material-community"
                />
              )}
              inactiveTintColor="#fff"
              labelStyle={styles.lables1}
              label="Contacto"
              onPress={() => {
                props.navigation.navigate("contacto")
              }}
            />
          </View>
          
          <View>
          <DrawerItem
              style={{marginBottom:10}}
              icon={({ color, size }) => (
                <Icon
                  name="logout"
                  color={color}
                  size={22}
                  type="material-community"
                  
                />
              )}
              inactiveTintColor="#fff"
              labelStyle={styles.lables1}
              label="Cerrar Sesión"
              onPress={() => {
                cerrarsesion()
              }}
            />
          </View>
          
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar
                rounded
                //size="medium"
                source={
                  photoURL
                    ? { uri: photoURL }
                    : require("../../assets/avatar.jpg")
                }
                onPress={() => props.navigation.navigate("perfil")}
                style={{width:46,height:46}}
              />

              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Text style={styles.title}>{displayName}</Text>
                <Text style={styles.caption}>{email} </Text>
              </View>
            </View>
          </View>

          
          
        </View>
      </DrawerContentScrollView>
      
    </View>
    )
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      flex:1,
      paddingLeft: 20,
      justifyContent:"flex-end"
      
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: "bold",
      color:"#fff"
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color:"#fff"
    },
    row: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 15,
    },
    paragraph: {
      fontWeight: "bold",
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: "#f4f4f4",
      borderTopWidth: 1,
    },
    preference: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    logo:{
      width:102.5,
      height:140
    },
    title1:{
      marginLeft:15,
      color:"#FFAB6D",
      fontFamily:"OpenSans", 
      fontWeight:"700",
      fontSize:12
    },
    lables:{
      color:"#fff",
      fontFamily:"OpenSans",
      fontWeight:"600",
      fontSize:16
    },
    iconText:{
      color:"#fff",
      marginRight:-15,
      fontWeight:"600",
      fontSize:16
    },
    lables1:{
      color:"#fff",
      fontFamily:"OpenSans",
      fontWeight:"600",
      fontSize:16,
      left:-15
    },
    lables2:{
      color:"#fff",
      fontFamily:"OpenSans",
      fontWeight:"600",
      fontSize:16,
      left:-20
    },
  });