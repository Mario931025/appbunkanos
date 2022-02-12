import React, { useState } from 'react'
import { StyleSheet, Text, View, useWindowDimensions,Image } from 'react-native'
import { useFonts } from 'expo-font'

export default OnboardingItem = ({item}) => {
    const [loaded] = useFonts({
        Pacifico: require('../../assets/fonts/Pacifico-Regular.ttf'),
    });
    const {width} = useWindowDimensions();
    if(!loaded)
    {
        return null;
    }
    return(
        <View style={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.image,{width}]}/>
            <View style={{flex: 0.3}}>
                <Text style={styles.title}> {item.title}</Text>
                <Text style={styles.description}> {item.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center'
    },
    title:{
        fontWeight: '800',
        fontSize : 24,
        marginBottom: 10,
        color: '#fff',
        textAlign: "center",
        fontFamily: 'Pacifico'
    },
    description:{
        fontWeight: '300',
        color: '#CECBCE',
        textAlign: "center",
        paddingHorizontal: 64,
    }
})
