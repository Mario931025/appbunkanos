import React from 'react'
import { View, Text , StyleSheet, Animated, useWindowDimensions} from 'react-native'

/**
 * dotWidth const con estilo de paginator outputRange resive valores para el ancho de los
 * puntos que indican el menu, extrapolate muestra todas nuestras slides
 * 
 */

export default Paginator = ({data, scrollX}) => {
    const {width} = useWindowDimensions();
    return (
        <View style={{flexDirection: 'row', height: 64}}>
            {data.map((_,i) => {
                
                const inputRange = [(i-1) * width, i * width, (i+1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10,20,10],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3,2,0.3],
                    extrapolate: 'clamp'
                })

                return < Animated.View style = {[
                    styles.dot, {width: dotWidth,opacity}]} key={i.toString()}/>;
            })}
        </View>
    );
};

const styles = StyleSheet.create({
dot:{
    height : 10,
    borderRadius: 5,
    backgroundColor: '#ffff',
    marginHorizontal: 8,
    alignItems: "center"
},

});