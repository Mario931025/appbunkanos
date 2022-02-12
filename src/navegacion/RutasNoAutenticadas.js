import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingComponent from '../pantallas/cuenta/OnboardingView';
import Login from '../pantallas/cuenta/LoginView';
import Registrar from '../pantallas/cuenta/RegistrarView'
import RestaurarPassword from '../pantallas/cuenta/RestaurarPassword'
import HiraganaVoc from '../pantallas/vocabulario/HiraganaVoc';

const Stack = createNativeStackNavigator();

export default RutasNoAutenticadas = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName = "onboardin" screenOptions={{headerShown:false}} >
                <Stack.Screen component={OnboardingComponent} name="onboardin"  />
                <Stack.Screen component={Login} name = "login"/>
                <Stack.Screen component = {Registrar} name="register"/>
                <Stack.Screen component = {RestaurarPassword} name="restaurarP" />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
