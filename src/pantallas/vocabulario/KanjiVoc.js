//AQUI EL FLAT LIST QUE CONTENDRA TODAS LAS CATEGORIAS || 1

import React from 'react'
import { StyleSheet, Text, View ,Image, FlatList, ScrollView} from 'react-native'
import vocabulario from '../../../vocabulario'
//import TaskList from '../../components/TaskList';
import VocabularioList from './KanjiList';

export default function  HiraganaVoc() /*extends React.Component*/ {
    state = {
        lists: vocabulario
    };
    //vocabulario list contiene las caategorias de las palabras de hiragana 
    renderList = (list) => {
        return <VocabularioList props={list}/>
        
      };
    //render(){
    return (
        <ScrollView style={styles.container}>
            <Image source ={require("../../../assets/Kanji.png")} style={styles.imgPrincipa}/>
            <Text style={styles.title}>
            語彙 - kanji 
            </Text>
            <View>
                <FlatList
                data={this.state.lists}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => this.renderList(item)}
                keyboardShouldPersistTaps="always"   
                //onScroll={console.log("HOLAAAAAA")}   
                pagingEnabled          
                />
            </View>
        </ScrollView>
    )}
//}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#2B67A6',
        
    }
    ,
    imgPrincipa:{
        width: '100%',
        height: 276,
        alignSelf: "center"
    }
    ,
    title:{
        color: "#fff",
        fontWeight: "600",
        width: 222
        ,height: 53,
        fontSize: 24,
        paddingTop: 20
        ,alignSelf:"center",
        alignItems: "center"
        ,alignContent: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    
})
