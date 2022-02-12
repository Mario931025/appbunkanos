import React, {useState, useRef} from 'react'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import CodeInput from 'react-native-code-input'
import {useNavigation} from '@react-navigation/native'
import Loading from '../../components/Loading'
import {confirmarcodigo, obtenerToken, ObtenerUsuario, addRegistroEspecifico} from '../../utils/Acciones'



import { LinearGradient } from "expo-linear-gradient";


export default function ConfirmarNumero(props) {

    const {route} = props;
    const {verificationid} = route.params;


    console.log(verificationid);

    const [loading, setloading] = useState(false);

    const confirmarCodigoSMS  = async (code) => {



        setloading(true);
        const token = await obtenerToken()


         //verifica que el codigo del sms que llega es el correcto
        const resultado = await confirmarcodigo(verificationid,code)

       

        if (resultado) {
            const token = await obtenerToken();

            const { uid, displayName, photoURL, email, phoneNumber }= ObtenerUsuario();

            const registro = await addRegistroEspecifico("Usuarios",uid,
            {token,displayName,photoURL,email,phoneNumber, fechacreacion: new Date()})

            setloading(false);
        }else{
            Alert.alert("Error","Favor de validar el codigo ingresado", [{
                style: "default",
                text: "Entendido"
            }])
            setloading(false)
        }
    }


    return (
        <View style={styles.container1}>

            <View style={{width:250,height:200, 
               // borderColor:"black", borderWidth:1
            }}>
            <Image source ={ require('../../../assets/Imagen6.png')} style={styles.imglogo}/>
            </View>

            <View style={styles.container2}>
                <LinearGradient
                // Background Linear Gradient
                colors={["rgba(144,19,126,2 )", "transparent"]}
                style={styles.background}
                />
                <Text style={{color:"#CECBCE",marginBottom:15}}> BUNKAN NICHIBOKU </Text>
                <Text style={styles.title}>Favor Revise SMS e introduzca los codigos de confirmación</Text>
                
                <CodeInput
                    activeColor="#fff"
                    inactiveColor="#8c8c8c"
                    autofucus={true}
                    inputPosition ="center"
                    size={50}
                    codeLength={6}
                    space={5}
                    containerStyle={{marginTop:25}}
                    codeInputStyle={{borderWidth:1.5, borderTopLeftRadius:10, borderBottomRightRadius:10}}
                    onFulfill={(code) =>  {
                        confirmarCodigoSMS(code)
                    }}
                    //borderType='circle'
                    secureTextEntry 
                />
                
            </View>

            <Loading isVisible ={loading} text ="Iniciando algo maravilloso" />

            
        </View>
    )
}

const styles = StyleSheet.create({

    container1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#3c379b",
        //borderWidth:10,
        //borderColor:"black"
        
    },
    container2:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#3c379b",
        paddingVertical:20,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        paddingVertical:35
        //borderWidth:10,
        //borderColor:"black"
        
    },
    imglogo:{
        width:450,
        height:260,
        alignSelf:'center',
        position: "absolute",
        marginVertical:-25
    },
    title:{
        fontSize:20,
        textAlign:'center',
        color:"#fff",
        marginVertical:20,
        paddingHorizontal:25
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 300,
        borderTopLeftRadius:40,
        borderTopRightRadius:40
      },


})

