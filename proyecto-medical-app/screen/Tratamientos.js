import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

export default function Tratamientos() {
    const navigation = useNavigation();
  
    const pressNuevoTratamiento = () => {
        console.log("Press tratamiento nuevo");
        navigation.navigate('NuevoTratamiento');
        
      }
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Mis tratamientos</Text>
            <TouchableOpacity onPress={pressNuevoTratamiento} style={{backgroundColor: 'blue'}}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Nuevo tratamiento</Text>
            </TouchableOpacity>
            
        </View>
    );
}
