import React from 'react'
import { StyleSheet, Text, View, Linking, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import { Icon, Image } from 'react-native-elements'
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { ScrollView } from 'react-native-gesture-handler';
import { enviarWhatsapp } from '../../utils/ValidarEmail';

const {height, width} = Dimensions.get("window")

export default function Contacto(props)
{
    const [loaded] = useFonts(
    {
        HarmattanBold: require("../../../assets/fonts/Harmattan-Bold.ttf"),
        HammattanRegular: require("../../../assets/fonts/Harmattan-Regular.ttf")
    });

    const FBPress = async () => {
        await Linking.openURL("https://www.facebook.com/Bunkan-Nichiboku-100622628547877")
    };

    const TWPress = async () => {
        await Linking.openURL("https://twitter.com/BNichiboku")
    };

    const IGPress = async () => {
        await Linking.openURL("https://www.instagram.com/bunkan_nichiboku/")
    };

    const PaginaPress = async () => {
        await Linking.openURL("https://bunkannichiboku.com/")
    }

    const  EmailPress1 = async () => {
        await Linking.openURL("mailto:contacto@bunkannichiboku.com")
    };
    
    const  EmailPress2 = async () => {
        await Linking.openURL("mailto:bunkan.nichiboku@gmail.com")
    };

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1, width:"100%"}} contentContainerStyle={{alignItems:"center", justifyContent:"center"}} showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor={"black"}/>
                <View style={{marginRight:width-70, marginTop:20}}>
                    <Icon
                        type="material-community"
                        name="arrow-left"
                        size={30}
                        color="black"
                        onPress={() => {
                            props.navigation.navigate("Home")
                        }}
                    />
                </View>
                
                <Text style={{fontFamily:"HarmattanBold", fontSize:40}}>Contacta con nosotros</Text>
                <Image source={require("../../../assets/LogoBunkanRojo-Rojo.png")} style={styles.logoB}/>
                <Text style={styles.text}>Presiona la opción que desees</Text>
                <Text style={{fontFamily:"HarmattanBold", fontSize:40}}>Correos:</Text>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <Text style={styles.text}>contacto@bunkannichiboku.com</Text>
                    <TouchableOpacity style={{width:80}} onPress={() => {
                        EmailPress1()
                    }}>
                        <Icon
                            type="material-community"
                            name="email-send"
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                    
                <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:20}}>
                    <Text style={styles.text}>bunkan.nichiboku@gmail.com</Text>

                    <TouchableOpacity style={{width:83, marginLeft:18}} onPress={() => {
                        EmailPress2()
                    }}>
                        <Icon
                            type="material-community"
                            name="email-send"
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{fontFamily:"HarmattanBold", fontSize:40}}>Números de telefono:</Text>

                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <Text style={styles.text}>+52 55 4092 3629</Text>
                    <TouchableOpacity style={{width:80}} onPress={() => {
                        Linking.openURL(`tel:+525540923629?`)
                    }}>
                        <Icon
                            type="material-community"
                            name="phone-in-talk"
                            size={30}
                            color="blue"
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={{width:30}} onPress={() => {
                        enviarWhatsapp("+525540923629?", "Solicito informes de la escuela por favor.")
                    }}>
                    <Icon
                            type="material-community"
                            name="whatsapp"
                            size={30}
                            color="green"
                        />
                    </TouchableOpacity>
                </View>
                
                <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:30}}>
                    <Text style={styles.text}>+52 55 6145 2429</Text>
                    <TouchableOpacity style={{width:80}} onPress={() => {
                        Linking.openURL(`tel:+525561452429?`)
                    }}>
                        <Icon
                            type="material-community"
                            name="phone-in-talk"
                            size={30}
                            color="blue"
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={{width:30}} onPress={() => {
                        enviarWhatsapp("+525561452429?", "Solicito informes de la escuela por favor.")
                    }}>
                    <Icon
                            type="material-community"
                            name="whatsapp"
                            size={30}
                            color="green"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={{fontFamily:"HarmattanBold", fontSize:40}}>Página web:</Text>
                <TouchableOpacity onPress={() => {
                    PaginaPress()
                }}>
                    <Text style={styles.text}>bunkannichiboku.com</Text>
                </TouchableOpacity>
                <Text style={{fontFamily:"HarmattanBold", fontSize:40}}>Redes sociales:</Text>
                <View style={styles.redes}>
                    <TouchableOpacity style={{width:100, alignSelf: "center", alignItems: "center",}}
                    onPress={() => {
                        FBPress()
                    }}>
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={["#3A0CA3", "#F72585"]}
                            style={{alignItems: "center",
                                    borderRadius: 50,
                                    width: 60,
                                    marginBottom: "5%",
                                    shadowColor: "#fff",}}
                        >
                            <Icon
                                type="material-community"
                                name="facebook"
                                size={60}
                                color="#fff"  
                            />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:100, alignSelf: "center", alignItems: "center",}}
                    onPress={() => {
                        TWPress()
                    }}>
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={["#3A0CA3", "#F72585"]}
                            style={{alignItems: "center",
                                    borderRadius: 50,
                                    width: 60,
                                    marginBottom: "5%",
                                    shadowColor: "#fff",}}
                        >
                            <Icon
                                type="material-community"
                                name="twitter"
                                size={60}
                                color="#fff"
                                style={{color:"#fff"}}
                            />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:100, alignSelf: "center", alignItems: "center",}}
                    onPress={() => {
                        IGPress()
                    }}>
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={["#3A0CA3", "#F72585"]}
                            style={{alignItems: "center",
                                    borderRadius: 50,
                                    width: 60,
                                    marginBottom: "5%",
                                    shadowColor: "#fff",}}
                        >
                            <Icon
                                type="material-community"
                                name="instagram"
                                size={60}
                                color="#fff"
                                style={{color:"#fff"}}
                            />
                        </LinearGradient>
                    </TouchableOpacity> 
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create(
{
    container:
    {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width:"100%",
        marginTop:25
    },
    logoB:
    {
        height:120,
        width:120,
        marginBottom:15
    },
    redes:
    {
        flexDirection:"row",
        justifyContent:"space-around",
        marginBottom:20
    },
    text:
    {
        fontFamily:"HammattanRegular",
        fontSize:19
    }
})