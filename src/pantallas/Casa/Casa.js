import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal, 
  SafeAreaView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Avatar } from "react-native-elements";
import { ObtenerUsuario } from "../../utils/Acciones";
import { useNavigation } from "@react-navigation/native";
import CalendarStrip from "react-native-calendar-strip";
//import calendarLanguaje from "../../../calendarLanguaje"
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const { height, width } = Dimensions.get("window");

export default function Casa() {
  const [fotoUsuario, setFotoUsuario] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const usuarioActual = ObtenerUsuario();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style={{marginTop: 150}}
        //presentationStyle="pageSheet"
      >
       
       <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{borderColor: "#000" , borderWidth: 0, width: 300, height: 500}}>
              <Agenda 
              items={{
                '2022-01-27': [{name: 'item 1 - any js object'}],
                '2022-01-28': [{name: 'item 2 - any js object', height: 80}],
                '2022-01-29': [],
                '2022-01-30': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
              }}
              markedDates={{
                '2022-01-26': {selected: true, marked: true},
                '2022-01-28': {marked: true},
                '2022-01-29': {disabled: true}
              }}/></View>
              
              <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Agendar</Text>
            </TouchableOpacity>
            
          </View>
        </View>       
      
        
      </Modal>
      
      <ScrollView
        style={{
          flex: 1,
          //borderWidth:1,
          //borderColor:"red",
          width: width,
        }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar translucent backgroundColor={"transparent"} />
        <View style={styles.header}>
          <Image
            source={require("../../../assets/Bg1.png")}
            style={styles.imagenBGheader}
          />
          <LinearGradient
            // Background Linear Gradient
            colors={["#972d2d", "transparent"]}
            style={styles.lg}
          />
          <View style={{ flexDirection: "row", borderColor: "green" }}>
            <View
              style={{
                borderColor: "red",
                justifyContent: "center",
                alignSelf: "center",
                height: "30%",
                width: "10%",
                top: "7%",
                marginLeft: 20,
                borderRadius: 15,
              }}
            >
              <Icon
                name="menu"
                type="material-community"
                size={35}
                style={{ top: 0, left: 15 }}
                color="white"
                onPress={() => navigation.toggleDrawer()}
              />
            </View>
            <View
              style={{ marginTop: 65, left: width / 20, borderColor: "blue" }}
            >
              <Text
                style={{
                  color: "#F2B1B2",
                  fontSize: 18,
                }}
              >
                Hola,
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                {usuarioActual.displayName}
              </Text>
            </View>
          </View>
          <View style={{ left: width - 100, top: -60 }}>
            <Avatar
              source={
                usuarioActual.photoURL
                  ? { uri: usuarioActual.photoURL }
                  : require("../../../assets/avtarx.jpg")
              }
              style={styles.avatar}
              rounded
            />
          </View>
          <View style={styles.calendar}>
            <CalendarStrip
              calendarAnimation={{type: "sequence", duration: 100}}
              //scrollable
              style={{ height: 100, marginTop: -30, paddingBottom: 0 }}
              calendarColor={"transparent"}
              calendarHeaderStyle={{ color: "#fff", fontSize: 17 }}
              dateNumberStyle={{ color: "white" }}
              dateNameStyle={{ color: "white" }}
              iconContainer={{ flex: 0.1 }}
              daySelectionAnimation={{type: 'background', duration: 200, borderWidth: 1, highlightColor: 'white'}}
              iconStyle={{color: "#fff"}}
              //locale={{name:'fr', config: 'calendarLanguaje'}}
              onDateSelected={(date) => {
                  console.log(date);
                  setModalVisible(true)
                  console.log(modalVisible);
              }}
              onPress={() => setModalVisible(true)}
      
            />
          </View>
        </View>
        <View style={styles.eventosHoy}>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Icon
              name="calendar-heart"
              type="material-community"
              size={28}
              style={{ marginVertical: 4, marginRight: 10 }}
            />
            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
              Eventos de hoy
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Icon
              name="circle"
              type="material-community"
              size={10}
              style={{ marginVertical: 5, marginRight: 7 }}
              color="#E4253F"
            />
            <Text style={{ fontWeight: "500", fontSize: 15 }}>
              Renovar mi mensualidad
            </Text>
          </View>
        </View>
        <View style={styles.misCursos}>
          <Icon
            name="school"
            type="material-community"
            size={28}
            style={{ marginVertical: 4, marginRight: 10 }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 28 }}>Mis cursos</Text>
        </View>
        <View style={styles.botonesCursos}>
          <TouchableOpacity style={styles.botonBasico}
            onPress={() => navigation.navigate("basico")}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 20,
                color: "#fff",
                marginTop: 16,
                marginLeft: 16,
              }}
            >
              Nivel Básico
            </Text>
            <Image
              source={require("../../../assets/florero2.png")}
              style={styles.florero}
            />
            <Image
              source={require("../../../assets/Persona2.png")}
              style={styles.persona1}
            />
          </TouchableOpacity>
          <View style={styles.n5n4}>
            <TouchableOpacity
              style={styles.mapache}
              onPress={() => navigation.navigate("mapache")}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 20,
                  color: "#fff",
                  marginTop: 16,
                  marginLeft: 16,
                }}
              >
                Mapache N5
              </Text>
              <Image
                source={require("../../../assets/mapache.png")}
                style={styles.mapacheImagen}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Zorro}
              onPress={() => navigation.navigate("zorro")}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 20,
                  color: "#fff",
                  marginTop: 16,
                  marginLeft: 16,
                }}
              >
                Zorro N4
              </Text>
              <Image
                source={require("../../../assets/zorro.png")}
                style={styles.zorroImagen}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.n3n2}>
            <TouchableOpacity
              style={styles.leon}
              onPress={() => navigation.navigate("leon")}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 20,
                  color: "#fff",
                  marginTop: 16,
                  marginLeft: 16,
                }}
              >
                León N3
              </Text>
              <Image
                source={require("../../../assets/Leon.png")}
                style={styles.leonImagen}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dragon}
              onPress={() => navigation.navigate("dragon")}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 20,
                  color: "#fff",
                  marginTop: 16,
                  marginLeft: 16,
                }}
              >
                Dragón N2
              </Text>
              <Image
                source={require("../../../assets/Dragón.png")}
                style={styles.dragonImagen}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
              style={styles.botonAvanzado}
              onPress={() => navigation.navigate("avanzado")}
          >
            <Text style={{fontWeight:'600',fontSize:20, color:"#fff", marginTop:16, marginLeft:16}}>Nivel Avanzado N1</Text>
            <Image
                source={require("../../../assets/florero2.png")}
                style={styles.florero}
            />
            <Image
                source={require("../../../assets/BunkanLogo_Drawer.png")}
                style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flex: 1,
    //borderWidth:1,
    borderColor: "black",
    width: "100%",
    height: 336,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  lg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "60%",
    //borderWidth:3,
    //borderColor:"black",
  },
  imagenBGheader: {
    width: 930,
    height: 620,
    left: -361,
    top: -167,
    position: "absolute",
  },
  eventosHoy: {
    flex: 1,
    width: "90%",
    height: 100,
    //borderWidth:3,
    borderColor: "black",
    alignSelf: "center",
    marginTop: 10,
  },
  misCursos: {
    flex: 1,
    width: "90%",
    height: 50,
    //borderWidth:3,
    borderColor: "black",
    alignSelf: "center",
    flexDirection: "row",
  },
  botonesCursos: {
    flex: 1,
    width: "95%",
    //height: 780,
    //borderWidth:1,
    borderColor: "black",
    alignSelf: "center",
  },
  botonBasico: {
    //flex:1,
    width: "100%",
    height: 150,
    //borderWidth:3,
    borderColor: "black",
    backgroundColor: "#FFAB6D",
    borderRadius: 15,
  },
  florero: {
    width: 52,
    height: 49,
    left: 11,
    top: 50,
  },
  persona1: {
    width: 106,
    height: 118,
    left: width - 110,
    top: -63,
  },
  n5n4: {
    width: "100%",
    height: 250,
    //borderWidth:1,
    borderColor: "blue",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  mapache: {
    width: "48%",
    height: 250,
    //borderWidth:3,
    borderColor: "black",
    backgroundColor: "#E4253F",
    borderRadius: 15,
  },
  Zorro: {
    width: "48%",
    height: 250,
    //borderWidth:3,
    borderColor: "black",
    backgroundColor: "#68184F",
    borderRadius: 15,
  },
  mapacheImagen: {
    width: "90%",
    height: 150,
    top: 35,
  },
  zorroImagen: {
    width: "90%",
    height: 160,
    left: 6,
    top: 35,
  },
  n3n2: {
    width: "100%",
    //height: 250,
    //borderWidth:1,
    borderColor: "green",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  leon: {
    width: "48%",
    height: 250,
    //borderWidth:3,
    borderColor: "black",
    backgroundColor: "#E15F67",
    borderRadius: 15,
  },
  dragon: {
    width: "48%",
    height: 250,
    //borderWidth:3,
    borderColor: "black",
    backgroundColor: "#7E021C",
    borderRadius: 15,
  },
  leonImagen: {
    width: "90%",
    height: 140,
    left: 5,
    top: 45,
  },
  dragonImagen: {
    width: "90%",
    height: 105,
    left: 5,
    top: 65,
  },
  avatar: {
    width: 70,
    height: 70,
  },
  calendar: {
    backgroundColor: "transparent",
    width: width,
   // borderColor:"#000"
    //,borderWidth:1
  },



  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
     height: 2
    },
    shadowOpacity: 0.25,
    //shadowRadius: 4,
    elevation: 5
  },
  button: {
    marginTop: 12,
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#68184F",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  botonAvanzado:{
    //flex:1,
    width:"100%",
    height:150,
    //borderWidth:3,
    borderColor:"black",
    backgroundColor:"#412d6c",
    borderRadius:15,
    marginTop:20,
    marginBottom:90
},
logo:{
    width:69.5,
    height:95,
    left:width-130,
    top:-63,
},
});
