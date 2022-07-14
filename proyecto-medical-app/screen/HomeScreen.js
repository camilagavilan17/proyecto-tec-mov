import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import {styles} from '../estilos/style';

export default function HomeScreen() {
  const auth = getAuth();
  const user = auth.currentUser;

  const navigation = useNavigation();
  
  const pressTratamientos = () => {

    navigation.navigate('Mis tratamientos');
   
  }
  return (
    <View style={[styles.container,{justifyContent: 'center'}]}>
      <TouchableOpacity onPress={pressTratamientos} 
         style={[styles.button2, {backgroundColor: '#6792F090'}]}>
        <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Mis tratamientos</Text>
      </TouchableOpacity>
    </View>
  );
}
