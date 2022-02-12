import React  from 'react'
import { StyleSheet, Text, View ,TextInput} from 'react-native'
import { useRef } from 'react'
import { Input } from 'react-native-elements'
import { Icon } from 'react-native-elements'



export default function InputEditable(props) {

    const {label,placeholder,onChangeInput,obtenerValor,id, editable,seteditable, actualizarValor}=props

    const editar= () =>{
        seteditable(!editable)
    }


    return (
        <View style={styles.input}>
            <Text style={styles.label}> {label} </Text>
            <View style={styles.row}>
                <TextInput
                    key={id}
                    placeholder={placeholder}
                    value={obtenerValor(id)}
                    onChangeText={(text)=>{
                        onChangeInput(id,text)
                    }}
                    style={styles.txtinternal}
                />
                {
                    editable ? (<Icon
                        name="content-save"
                        type="material-community"
                        size={24}
                        onPress={
                            ()=>{actualizarValor(id, obtenerValor(id))
                                editar()
                            }
                        }
                        style={styles.icon}
                    />):
                    (<Icon
                        name="pencil"
                        type="material-community"
                        size={24}
                        onPress={editar}
                        style={styles.icon}
                    />)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    input:{
        borderBottomColor:"#cecece",
        borderBottomWidth:2,
        width:"100%",
        marginBottom:30,
        marginHorizontal:10,
        borderColor:"#000",
        //borderWidth:1

    },

    label:{
        fontWeight:'bold',
        marginBottom:15,
        color:"#ac3973",
        fontSize:20

    },

    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:10,
    },

    txtinternal:{
        fontSize:20,
        width:"80%"

    },
    icon:{
       
    }
})
