import React, { Component } from 'react'
import { Text, TextInput,StyleSheet, View , KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import tempData from '../../tempData';

export default class  AddTask extends React.Component{
    //arreglo con la paleta de colores para las tareas dali
    backgroundColors = ["#f72585" , "#90137e" , "#7209b7", "#560bad","#3a0ca3","#3f37c9","#4361ee"]

    state = {
        name: "",
        color: this.backgroundColors[0]
    }

    //metodo para crear una tarea
    createTask = () => {
        const {name, color} = this.state
        const list = {name, color}

        this.props.addList(list)
        this.setState({name: ""});
        this.props.closeModal();
    }

    //metodo que crea los botones de colores a partir de la lista de colores
    renderColors(){
        return this.backgroundColors.map(color => {
            return(
                <TouchableOpacity key={color} style={[styles.colorSelect, {backgroundColor: color}]}
                onPress={() => this.setState({color})}/>
            )
        })
    }
    //metodo render para regresar interfaz
    render(){
        return (
            <KeyboardAvoidingView style= {styles.container} behavior = 'padding'>

                <TouchableOpacity style = {{position : "absolute" , top: 64, right: 32}} onPress={this.props.closeModal} >
                    <AntDesign name="close" size={24} color={"#000"} />
                </TouchableOpacity>

                <View style = {{alignSelf: "stretch", marginHorizontal: 32}}>
                    <Text style = {styles.title}>Crear Lista de Tareas </Text>

                    <TextInput style={styles.input} placeholder="Nombre Lista" onChangeText={text => this.setState({name: text})}/>
                   
                    <View style={{ flexDirection: "row" , justifyContent: "space-between", marginTop: 15}}>
                       {this.renderColors()}
                    </View>
                    
                    <TouchableOpacity style={[styles.create, {backgroundColor: this.state.color}]} onPress={this.createTask}>
                   
                        <Text style={{ fontWeight: "600", color:"#fff"}}>
                            Crear!
                        </Text>
                   
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

}


const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    title:{
        paddingBottom: 30,
        fontSize: 28,
        fontWeight: "800",
        color: "#000",
        alignSelf: "center",
        fontWeight: "bold"
    },
    input:{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#4344",
        borderRadius: 50,
        height: 50,
        marginTop:8,
        paddingHorizontal: 16,
        fontSize: 18 
    },
    create:{
        marginTop: 24,

        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect:{
        width: 30,
        height: 30,
        borderRadius: 10
    }
})