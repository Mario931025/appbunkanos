import React, {useState, useRef} from 'react'
import { Alert, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar, Input } from 'react-native'
import {colors, Icon} from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'
import FirebaseRecaptcha from '../../utils/FirebaseRecaptcha'
import {enviarAutentificacionphone} from '../../utils/Acciones'
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font'

export default function EnviarConfirmacion()
{

    const [loaded] = useFonts({
        HarmattanBold: require('../../../assets/fonts/Harmattan-Bold.ttf'),
    });
    const [country, setCountry] = useState("MX")
    const [callingCode, setCallingCode] = useState(52)
    const [phone, setPhone] = useState("")

    const recaptchaVerifier = useRef();
    const inputPhone = useRef();
    const navigation = useNavigation();


    const enviarConfirmacion = async() =>
    {
        if(!isEmpty(phone))
        {
            const numero = `+${callingCode}${phone}`
            const verificationid = await enviarAutentificacionphone(numero, recaptchaVerifier)

            if(!isEmpty(verificationid))
            {
                navigation.navigate("confirmar-movil", {verificationid})
            }
            else
            {
                Alert.alert("Verificación", "Por favor introduzca un número valido",
                [{style:"cancel", text:"Entendido", onPress: () =>
                {
                    inputPhone.current.clear()
                    inputPhone.current.focus()
                }}])
            }
        }
    }

    if(!loaded)
    {
        return null;
    }
    return (
        <View style = {styles.container}>

            <StatusBar/>

            <Image
                source={require("../../../assets/Imagen6.png")}
                style={styles.imgLogo}/>

                <LinearGradient
                    colors={["rgba(144,19,126, 1)", "#560BAD"]}
                    style={styles.background}/>

                <View style= {styles.panel}>

                    <Text style={{color:"#CECBCE", paddingBottom:10, marginBottom:10, marginTop:50}}> 
                        BUNKAN NICHIBOKU 
                    </Text>

                    <Text style={{fontSize:41, color:"#fff", 
                                marginBottom:10, justifyContent:"center", fontFamily: 'HarmattanBold'}}>
                        Enviar Confirmación
                    </Text>

                    <Icon
                        name="phone-message"
                        type="material-community"
                        size={80}
                        color="#fff"
                        containerStyle={{marginBottom:10}}/>
    
                    <Text style={styles.titulo}>
                        Por favor ingresa tu número de teléfono
                    </Text>

                    <View style = {styles.viewTelefono}>

                        <CountryPicker
                            withFlag
                            withCallingCode
                            withFilter
                            withCallingCodeButton
                            countryCode={country}                            
                            onSelect={(Country) => {
                                setCountry(Country.cca2);
                                setCallingCode(...Country.callingCode);
                            }}
                            containerButtonStyle = {{}}/>

                        <Text style={{ color: "#CECBCE"}}>  | </Text>
                
                        <TextInput
                            underlineColorAndroid = "#CECBCE"
                            placeholder=" Número de Whatsapp"
                            style={styles.input}
                            placeholderTextColor="#CECBCE"
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                            ref={inputPhone}/>

                    </View>

                    <Text style={styles.titulo2}>
                        Se te enviara un SMS
                    </Text>

                    <TouchableOpacity onPress = {() => enviarConfirmacion()}>

                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={["#3A0CA3", "#F72585"]}
                            style={styles.button}>

                            <Text style={{color:"#fff", fontWeight:"bold", fontSize:20}}>Confirmar número</Text>

                        </LinearGradient>

                    </TouchableOpacity>

                </View>
                
                <FirebaseRecaptcha referencia = {recaptchaVerifier}/>
                
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#560BAD",
            padding: 25,
        },
        background: 
        {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 350,
            borderTopLeftRadius:50,
            borderTopRightRadius:50,
            marginVertical:160,
        },
        panel:
        {
            flex:1,
            alignItems: "center",
            justifyContent: "center",
        },
        imgLogo:
        {
            width:360,
            height:260,
            alignSelf:"center",
            marginTop:-70
        },
        titulo:
        {
            fontSize:16,
            textAlign:"center",
            color:"#fff",
            fontWeight:"bold",
            marginBottom:20,
            marginTop:15
        },
        titulo2:
        {
            fontSize:14,
            textAlign:"center",
            color: "#CECBCE",
            fontWeight:"bold",
            marginTop:15
        },
        viewTelefono:
        {
            flexDirection:"row",
            alignItems:"center",
            borderRadius:25,
            height:50,
            marginHorizontal:20,
            paddingHorizontal:20,
            //backgroundColor:"#DBE6FD",
            //backgroundColor:"#fff"
        },
        input:
        {
            width:"80%",
            height:50,
             
        },
        button:
        {
            padding: 17,
            alignItems: "center",
            borderRadius: 50,
            width: "75%",
            marginTop:25,
            shadowColor: "#fff",
            elevation: 8,
            marginBottom:110
        },
        icon:
        {
            alignItems: "center",
            borderRadius: 50,
            marginTop:25,
            shadowColor: "#fff",
            elevation: 8,
        },
        telefono:
        {
            flexDirection:'row'
        }
    })
