import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions,Image } from 'react-native'

export default ImagenesLeonItem = ({item}) => {

    const {width} = useWindowDimensions();
    return (
        <View style={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.image,{width:width-20}]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
        borderRadius:30
    }
})
