import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmarNumero from '../pantallas/cuenta/ConfirmarNumero'
import EnviarConfirmacion from '../pantallas/cuenta/EnviarConfirmacion'
import { StyleSheet, Text, View } from 'react-native'

const Stack = createNativeStackNavigator();

//linea 17 , headerStyle: {backgroundColor:"#127C7E"}, headerTintColor: "#fff"
//linea 20 , headerStyle: {backgroundColor:"#127C7E"}, headerTintColor: "#fff"

export default function Cuenta() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen component = {EnviarConfirmacion} name = "enviar-confirmacion"
                options = {{headerShown:false}}/>
                <Stack.Screen component = {ConfirmarNumero} name = "confirmar-movil"
                options = {{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
        
    )
}

const styles = StyleSheet.create({
    background:
    {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    }
})
