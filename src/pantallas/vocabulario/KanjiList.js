

//AQUI ES EL RENDER DEL ITEM QUE COMPONE EL FLAT LIST || 2

import React,{useState} from 'react'
import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import {useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import vocabulario from '../../../vocabulario';
import { getExpoPushTokenAsync } from 'expo-notifications';
import HiraganaEjemplos
 from './HiraganaEjemplos';
export default function VocabularioList(props)  {
    //funcion que contiene el render de la lista de categorias de vocabulario hiragana 
     //console.log("aqui");
    //console.log(list);
    const navigation = useNavigation(); 

    const list = props;
   
    return (
        <View>
            <TouchableOpacity style={styles.listContainer}
           onPress={()=>{navigation.navigate("kanjiEjemplos", {list: list})}}
           >
                <View >
                
                <Text style={styles.letter}>
                <Image source ={list.props.image} style={styles.img}/>
                {list.props.title}
                </Text>
                </View>
                
            </TouchableOpacity>
        </View>
    )}
//}

const styles = StyleSheet.create({
    listContainer: {
        alignSelf:"center",
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: "center",
        width: '90%',
        height: 56,
        marginTop: 16,
        justifyContent: "center"

       
      },
      letter: {
          color: "#fff",
          fontSize: 16,
     
      },
})
