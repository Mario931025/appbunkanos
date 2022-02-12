import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RutasNoAutenticadas from './src/navegacion/RutasNoAutenticadas';
import SwitchNavigator from './src/navegacion/SwitchNavigator';
import Loading from './src/components/Loading';
import { cerrarsesion, validarsesion } from './src/utils/Acciones'; 
import {encode,decode} from 'base-64'
import vocabulario from './vocabulario';

if(!global.btoa){
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default App = () => {
  //cerrarsesion();

  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    validarsesion(setUser);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading isVisible={loading} text="Empezando..." />;
  }

  return user ? <SwitchNavigator/> : <RutasNoAutenticadas/>
  

}

const styles = StyleSheet.create({
  container: {
    //para centrar nuestro Onboarding y fondo
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    // justifyContent: 'center',
  },
});

