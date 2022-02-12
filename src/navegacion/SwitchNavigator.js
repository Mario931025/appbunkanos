import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../components/Loading'
import RutasAutenticadas from './RutasAutenticadas'
import CuentaStack from './Cuenta'
import {validarPhone} from '../utils/Acciones'

export default function SwitchNavigator() {

    const [phoneauth, setphoneauth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        validarPhone(setphoneauth)

        setTimeout(() =>
        {
            setLoading(false)

        }, 3000)
    }, [])

    if(loading)
    {
        return <Loading isVisible = {loading} text="cargando..."/>
    }
    else
    {
        return phoneauth ? <RutasAutenticadas/> : <CuentaStack/>
    }
}

const styles = StyleSheet.create
({
    container:
    {
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center"
    }
})
