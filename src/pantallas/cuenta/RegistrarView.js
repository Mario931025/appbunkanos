import React, {useRef} from 'react'
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Registrar from '../../components/Registrar'
import Toast from 'react-native-easy-toast'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


export default function RegistrarView() {

    const toastRef = useRef();

//#be373e color más cercano al logo rojo
//dimensiones de fon en el view width:420,height:200
    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
            
                <StatusBar backgroundColor={"#560BAD"} />
                <Image source={require('../../../assets/fotoP1.png')} style={styles.logo}/>
                <View style={{width:420,height:220}}>
                
                </View>
                <Registrar toastRef = {toastRef}/>
                <Toast ref={toastRef} position="center" opacity={0.9}/>
            
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({

container:{
    flex: 1,
    backgroundColor: "#be373e"

},
logo:{

    alignSelf:'center',
    width: 450,
    height: 320,
    //flex:1 
    position:'absolute'
    
    
/*
    En dimensiones de mi emulador funcionan estas medidas
    width: 720,
    height: 370,

    En dimension de mi fon funciona así
    width: 450,
    height: 240,
*/
       
    
}


})