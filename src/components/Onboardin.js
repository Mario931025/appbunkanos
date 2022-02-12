import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import slides from "../../slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";


export default Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  /*const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      console.log("kast time");
    }
  };*/

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#91216e", "transparent"]}
        style={styles.background}
      />
      <View style={{ flex: 3 }}>
        {/** Flat list es  para hacer listas on boarging item son los subcomponentes
         * deslisables
         */
        /*- data son los datos de una matriz
                - render item toma un elemento de data y lo representa
                - item es cada uno de los objetos de slides.js
                - horizontal muestra cada uno de los elementos uno a lado del otro, booleano
                - show horeizontalScrollingindicator scrolling horizontal
                - pagingEnabled para que se pare en cada uno de los items cuando deslisas
                - 
                 */}
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <TouchableOpacity style= {styles.buttonRegister} onPress={() => navigation.navigate('register')} >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        // Button Linear Gradient
        colors={["#ff3333", "#91216e"]}
        style={styles.button}
      >
        <Text style={styles.text}>¡Registrate!</Text>
        </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style= {styles.buttonRegister} onPress={() => navigation.navigate('login')} >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        // Button Linear Gradient
        colors={["#91216e", "#ff3333"]}
        style={styles.button}
      >
        <Text style={styles.text}>Inicia sesion</Text>
        </LinearGradient>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#cc1931",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  button: {
    padding: 17,
    alignItems: "center",
    borderRadius: 50,
    marginBottom: "10%",
    shadowColor: "#fff",
    elevation: 8,
    
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  button2: {
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#39379a",
    padding: 15,
    borderWidth: 2,
    borderColor: "#5450a6",
    width: "72%",
    marginBottom: 25,
    marginTop: 5,
  },
  buttonRegister:{
    width: "90%"
  }
});