import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

export default function NuevoTratamiento() {
  const navigation = useNavigation();

  const pressNuevoTratamiento2 = () => {
    console.log("Press crear tratamiento nuevo");
    navigation.navigate('Crear nuevo tratamiento');
    
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Seleccione nuevo tratamiento</Text>
        <TouchableOpacity onPress={pressNuevoTratamiento2} 
         style={{width: 250,
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
          borderColor: '#fff',
          borderWidth: 1,
          backgroundColor: 'red'}}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Tratamiento cefáleo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pressNuevoTratamiento2}
         style={{width: 250,
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
          borderColor: '#fff',
          borderWidth: 1,
          backgroundColor: 'blue'}}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Tratamiento estomacal</Text>
        </TouchableOpacity>
    </View>
  );
}
