import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

export default function Tratamientos() {
    const navigation = useNavigation();
  
    const pressNuevoTratamiento = () => {
        console.log("Press tratamiento nuevo");
        navigation.navigate('Nuevo tratamiento');
        
    }
  
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Mis tratamientos</Text>
            <TouchableOpacity onPress={pressNuevoTratamiento} 
                style={{width: 250,
                    height: 40,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    borderColor: '#fff',
                    borderWidth: 1,
                    backgroundColor: 'green'}}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Nuevo tratamiento</Text>
            </TouchableOpacity>
            
        </View>
    );
}
