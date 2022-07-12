import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Tratamiento({navigation, route}) {
    const tratamiento = route.params.tratamiento;
    const idTratamiento = tratamiento.id;

    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
  
    const pressGoMisFormularios = (tratamiento) => {
        //console.log("Mis formularios");
        //console.log(tratamiento);
        console.log("----------------------");
        navigation.navigate('Mis formularios', {tratamiento});
    }
    const pressGoMisMedicamentos = (idTratamiento) => {
        //console.log("Mis medicamentos");
        navigation.navigate('Mis medicamentos', {idTratamiento});
    }
    const pressGoMisControles = (idTratamiento) => {
        //console.log("Mis controles");
        navigation.navigate('Mis controles', {idTratamiento});
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>pressGoMisFormularios(tratamiento)} 
                style={[styles.touchable, {backgroundColor: 'green'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Mis formularios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>pressGoMisMedicamentos(idTratamiento)} 
                style={[styles.touchable, {backgroundColor: 'green'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Mis medicamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>pressGoMisControles(idTratamiento)} 
                style={[styles.touchable, {backgroundColor: 'green'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Mis controles</Text>
            </TouchableOpacity>
            
           
            
        </View>
    );
}
