import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import {Overlay} from 'react-native-elements'
import {Fold} from 'react-native-animated-spinkit'

export default function Loading(props)
{
    const {isVisible, text} = props;
    return (
        <Overlay isVisible={isVisible} overlayStyle = {styles.overlay}>
            <View style = {styles.view}>
                <Fold size={50} color="#be373e"/>
                {text && <Text style={styles.texto}>{text}</Text>}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:
    {
        backgroundColor:"rgba(0,0,0,0.6)",
        borderWidth: 1,
        borderColor: "#be373e",
        borderRadius: 20,
        width: "90%",
        height: Dimensions.get("window").height/2
    },
    view:
    {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    texto:
    {
        color:"#be373e",
        marginTop:20,
        fontWeight:"bold",
        fontSize:24,
        textTransform:"uppercase",
        textAlign:"center"
    }
})
