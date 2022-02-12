import React,{useState,useEffect,useRef } from 'react'
import { View, Text,StyleSheet,StatusBar, ScrollView, Dimensions } from 'react-native'
import {Icon,Avatar,Input}from 'react-native-elements'
import { cargarImagenesxAspecto, validateEmail } from '../../utils/ValidarEmail'
import{subirImagenesBatch, ObtenerUsuario, addRegistroEspecifico, actualizarPerfil,reautenticar,enviarAutentificacionphone,actualizaremailfirebase, actualizarTelefono} from '../../utils/Acciones'
import Loading from '../../components/Loading'
import InputEditable from '../../components/InputEditable'
import Modal from '../../components/Modal'
import CodeInput from 'react-native-code-input'
import FirebaseRecaptcha from '../../utils/FirebaseRecaptcha'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { LinearGradient } from "expo-linear-gradient";


const {height, width} = Dimensions.get("window")

export default function Perfil() {

    const [imagenperfil, setimagenperfil] = useState("")
    const [loading, setloading] = useState(false)

    const usuario = ObtenerUsuario();

    const [displayName, setdisplayName] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [email, setemail] = useState("")

    const [editableName, seteditableName] = useState(false)
    const [editableEmail, seteditableEmail] = useState(false)
    const [editablePhone, seteditablePhone] = useState(false)

    const [verificationid, setverificationid] = useState("")
    const [isVisible, setisVisible] = useState(false)

    const [updatephone, setupdatephone] = useState(false)

    const recapcha = useRef();


    // use effect para que actualize las cosas sin tener que actualizar la app constantemente
    useEffect(() => {

        setimagenperfil(usuario.photoURL)

        //Para poder imprimir los datos del usuario vamos a hacer lo siguiente
        const {displayName,phoneNumber,email} = usuario

        setdisplayName(displayName)
        setphoneNumber(phoneNumber)
        setemail(email)

    }, [])

    //Aqui vamos a hacer una funcion que cambia los valores de las variables dependiendo cada input

    const onChangeInput = (input,valor) =>{
        switch(input){
            case "displayName":
                setdisplayName(valor)
                break;
            case "email":
                setemail(valor)
                break;
            case "phoneNumber":
                setphoneNumber(valor)
                break;
        }
    }

    const obtenerValor  = (input) =>{
        switch(input){
            case "displayName":
                return displayName
                break;
            case "email":
                return email
                break;
            case "phoneNumber":
                return phoneNumber
                break;
        }
    }

    //funcion que se encarga de actualizar el input 

    const actualizarValor = async(input,valor) =>{

        switch (input) {
            case "displayName":
                console.log(await actualizarPerfil({displayName: valor}))
                addRegistroEspecifico("Usuarios", usuario.uid, {displayName: valor})
                console.log(usuario)
                break;
            case "email":
                if(valor !== usuario.email){
                    if(validateEmail(valor)){
                        const verification = await enviarAutentificacionphone(phoneNumber,recapcha)
                        if(verification) {
                            setverificationid(verification)
                            setisVisible(true)
                        }else{
                            alert("Ha ocurrido un eror en la verificacion")
                            setemail(usuario.email)
                        }
                    }
                }
                break;
            case "phoneNumber":
                if(valor !== usuario.phoneNumber ){
                    const verification = await enviarAutentificacionphone(phoneNumber,recapcha)
                    if(verification){
                        setverificationid(verification)
                        setupdatephone(true)
                        setisVisible(true)
                    }else{
                        alert("Ha ocurrido un eror en la verificacion")
                        setphoneNumber(usuario.phoneNumber)
                    }
                }
                break;
        }
    }

    const ConfirmarCodigo = async(verificationid,code)=>{
    
        setloading(true)

        if(updatephone){
            const telefono =  await actualizarTelefono(verificationid,code)
            const updateregistro =  await addRegistroEspecifico("Usuarios",usuario.uid,{phoneNumber : phoneNumber})
            setupdatephone(false)
            //console.log(telefono)
            //console.log(updateregistro)
        } else{
            const resultado = await reautenticar(verificationid,code)
            console.log(resultado)
            // setloading(false)
            if(resultado.statusresponse){
                const emailresponse = await actualizaremailfirebase(email)
                const updateregistro = await addRegistroEspecifico("Usuarios",usuario.uid,{email: email})
                //console.log(emailresponse)
                //console.log(updateregistro)
                setloading(false)
                setisVisible(false)
            }else{
                alert("Ha ocurrido un error al actualizar el correo electronico")
                setloading(false)
                setisVisible(false)
            }
        }
        setloading(false)
        setisVisible(false)
    }

    //console.log(ObtenerUsuario())




    //return de la funcion principal
    return (
        
        <KeyboardAwareScrollView style={styles.kasv}>
            {/*<StatusBar backgroundColor={"transparent"} />*/}
            <View style={styles.background}>
            
                <LinearGradient
                    // Background Linear Gradient
                    colors={["#d959b1", "transparent"]}
                    style={styles.lg}
                />
                
                <View style={styles.back} > 
                <View style={styles.c1}>
                        <HeaderAvatar
                            usuario={usuario} 
                            imagenperfil ={imagenperfil}
                            setimagenperfil={setimagenperfil}
                            setloading={setloading}
                        />
                    </View>
                    
                    <View 
                        style={{
                            width:0.5,
                            height:300,
                            //flex:1,//el flex hace que trabaje raro el width y height para este caso
                            borderColor:"blue",
                            //borderWidth:1,
                            borderRadius:10, 
                            overflow:'hidden',
                        }}>
                    </View>
                    
                    <View style={styles.c2}>
                        
                        <CabeceraBG
                            nombre={displayName}
                        />

                        <FormDatos

                            onChangeInput={onChangeInput}
                            obtenerValor={obtenerValor}

                            seteditableEmail={seteditableEmail}
                            seteditableName={seteditableName}
                            seteditablePhone={seteditablePhone}

                            editableName={editableName}
                            editableEmail={editableEmail}
                            editablePhone={editablePhone}

                            actualizarValor={actualizarValor}

                        />
                    </View>
                </View> 
                
                <ModalVerification
                    isvisibleModal={isVisible}
                    setisvisibleModal={setisVisible}
                    verificationid={verificationid}
                    ConfirmarCodigo={ConfirmarCodigo}
                />
                <FirebaseRecaptcha
                    referencia = {recapcha}
                />
                <Loading isVisible={loading} text={"Actualizando información"} />
                
            </View>
        </KeyboardAwareScrollView>
        
    )
}


function CabeceraBG(props) {

    const {nombre} = props

    return(
        <View style={styles.prueba}>
            <View style={styles.bg}>
                <Text style={{color:"black",fontSize:23,fontWeight:"bold"}}>
                   •○ {nombre} ○•
                </Text>
            </View>
        </View>
    )
}

function HeaderAvatar(props){

    const {usuario, setimagenperfil, imagenperfil,setloading}= props;

    const {uid} = usuario;


    const cambiarfoto = async() =>{

        //se pasan los valoires 1 y 1 por se trata de imagen cuadrada
        const resultado = await cargarImagenesxAspecto([1,1])

        if (resultado.status) {

            setloading(true)

            const url = await subirImagenesBatch([resultado.imagen],"Perfil")
            
            //Variable que va  asubir la nueva foto de perfil al campo photoURL del usuario (fijarse en el campo de los usuarios) 
            const update = await actualizarPerfil({photoURL : url[0]})
            const response = await addRegistroEspecifico("Usuarios", uid, {photoURL : url [0]})


            if (response.statusresponse) {
                setimagenperfil(url[0])
                setloading(false)
            } else {
                console.log("Error al subir la imagen")
                setloading(false)
                alert("ha ocurrido un error con la imagen, revise su tamaño y formato (jpg,png)")
            }
            //console.log(url)

        }

    }

    return(
        <View style= {styles.avatarline}>
            <Avatar
                size={381}
                //rounded
                source={imagenperfil ? {uri:imagenperfil}:require("../../../assets/avtarx.jpg")}
                title="Bj"
                containerStyle={{backgroundColor:'grey', borderRadius:10}}
                onPress={cambiarfoto}
            >
                
            </Avatar>
            
        </View>
    )
}


function FormDatos(props) {

    const {onChangeInput,obtenerValor, editableEmail,editableName,editablePhone,
        seteditableEmail,seteditableName,seteditablePhone, actualizarValor} = props

    return(
        <View>
            <InputEditable
                id="displayName"
                label = "Nombre"
                obtenerValor ={obtenerValor}
                placeholder = "Nombre"
                onChangeInput = {onChangeInput}
                editable={editableName}
                seteditable={seteditableName}
                actualizarValor={actualizarValor}
            />
            <InputEditable
                id="email"
                label = "Correo"
                obtenerValor ={obtenerValor}
                placeholder = "ejemplo@ejemplo.com"
                onChangeInput = {onChangeInput}
                editable={editableEmail}
                seteditable={seteditableEmail}
                actualizarValor={actualizarValor}
            />
            <InputEditable
                id="phoneNumber"
                label = "Telefono"
                obtenerValor ={obtenerValor}
                placeholder = "+00 00000000"
                onChangeInput = {onChangeInput}
                editable={editablePhone}
                seteditable={seteditablePhone}
                actualizarValor={actualizarValor}
            />
        </View>
    )
}

function ModalVerification (props) {

    const { isvisibleModal,setisvisibleModal,ConfirmarCodigo, verificationid } = props


    return(
        <Modal isVisible={isvisibleModal} setisVisible={setisvisibleModal}>
            <View style={styles.confirmacion}>
                <Text style={styles.titulomodal}>Confirma tu código</Text>
                <Text style={styles.detalle}>Se ha enviado un código de verificación a su número de télefono</Text>
                <CodeInput
                    secureTextEntry
                    activeColor="#128c7e"
                    inactiveColor="#128c7e"
                    autoFocus={false}
                    inputPosition="center"
                    size={40}
                    containerStyle={{marginTop:30}}
                    codeInputStyle={{borderWidth:1.5}}
                    codeLength={6}
                    onFulfill={(code)=> { 
                        ConfirmarCodigo(verificationid,code)
                    }}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    background:{
        flex: 1, 
        //justifyContent: "center", 
        alignItems: "center",
        backgroundColor:"#e77e85",
        width:"100%",
        height:height+95
       
    },

    back:{
        //flex:1,
        width:"90%",
        //height:900,
        //marginTop:20,
        //marginBottom:100,
        //marginVertical:height/4,
        alignItems: 'center',
        //justifyContent:'center',
        //borderWidth:1,
        borderColor:"green",
        borderBottomEndRadius:35,
        borderBottomLeftRadius:35,
        backgroundColor:"white",
        overflow:'hidden',
        height:height-20

    },

    lg:{
        position: "absolute",
        left: 0,
        right: 0,
        top: -175,
        height: "100%",
        //borderWidth:3,
        borderColor:"black",
    },

    avatarline:{
        borderRadius:10,
        //flex:1,
        //flexDirection:"row",
        //justifyContent:"space-around",
        //borderWidth:3,
        borderColor:"black",
        
    },

    c1:{
        //borderWidth:1,
        borderColor:"blue",
        width:"100%",
        position:'absolute',
        borderRadius:35,
        overflow:'hidden',
        borderBottomLeftRadius:150 ,
        borderBottomRightRadius:150,
        height:320,
        //elevation: 15,
        marginVertical:-40
        /*
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.90,
        shadowRadius: 16.00,

        elevation: 15,
        */
    },

    c2:{
        //borderWidth:1,
        borderColor:"black",
        //flex:1,
        backgroundColor:"white",
        width:"100%",
        borderRadius:35,
        alignItems: 'center',
        marginTop:10,
        //height:"70%"
    },

    confirmacion:{
        height:200,
        width:"100%",
        alignItems:"center"
    },titulomodal:{
        fontWeight:"bold",
        fontSize:18,
        marginTop:20
    },detalle:{
        marginTop:20,
        fontSize:14,
        textAlign:"center"
    },
    kasv:{
        flex:1,
        elevation:7,
        
        //width:"100%"
    }

})
