import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';

export default function NuevoTratamiento() {
  const navigation = useNavigation();

  const pressNuevoTratamiento = () => {
    console.log("Press crear tratamiento nuevo");
    console.log("1");
    navigation.navigate('Crear nuevo tratamiento', {tipo: ['1']});
    
  }
  const pressNuevoTratamiento2 = () => {
    console.log("Press crear tratamiento nuevo");
    console.log("2");
    navigation.navigate('Crear nuevo tratamiento', {tipo: ['2']});
    
  }
  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.textTitle}>Elegir nuevo tratamiento</Text>
        <TouchableOpacity onPress={pressNuevoTratamiento} style={[styles.button2, {backgroundColor: '#1B72B5'}]}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Tratamiento cefáleo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pressNuevoTratamiento2} style={styles.button2}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Tratamiento estomacal</Text>
        </TouchableOpacity>
    </View>
  );
}
