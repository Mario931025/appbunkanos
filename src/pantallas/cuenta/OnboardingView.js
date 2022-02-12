import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import OnboardingComponent from '../../components/Onboardin'

export default function Onboarding() {
    return (
        <View style={styles.container}>

            <OnboardingComponent/>

        </View>        
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex:1
    }
})