import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Carousel from 'react-native-snap-carousel'

export default function CarouselImage(props) {

    const {imagenes,height,width} = props

    const renderItem = ({item}) => {
        return <Image
            style={{width,height}}
            source={{uri:item}}
           // resizeMode="stretch"
        />
    }

    return (
        <Carousel
            layout='default'
            data={imagenes}
            sliderWidth={width}
            itemWidth={width}
            itemHeight={height}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({})
