import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';

export default function NuevoTratamiento() {
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Nuevo tratamiento:</Text>
        <Text>Seleccione nuevo tratamiento</Text>
            
        <TouchableOpacity onPress={pressNewTratamientos} style={{backgroundColor: 'red'}}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Tratamiento cefáleo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pressNewTratamientos} style={{backgroundColor: 'blue'}}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Tratamiento estomacal</Text>
        </TouchableOpacity>
    </View>
  );
}
