import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Formulario({navigation, route}) {
    const [formularios, setFormularios] = useState();
    const formulario = route.params.formulario;
    console.log("HOLIWI");
    console.log(formulario);
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [tratamientos, setTratamientos] = useState([]);
    const idTratamiento = "9OMYb50MufbeBDV10QoO";
    const fecha = new Date();
    function formatoFecha(fecha) {
        var fechaActual = fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear();
        return fechaActual;
    }
    const pressTerminarFormulario = async () => {
        const nuevoFormulario = {
            refTratamiento: idTratamiento,
            fecha: fecha,
        }
        try {
            await addDoc(collection(db, 'formularios'), nuevoFormulario);
            
        }catch(e){
            console.log(e);
        }
        
        navigation.navigate('Mis tratamientos');
    
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <Text>{formulario.fecha && formatoFecha(formulario.fecha.toDate())}</Text>
            <TouchableOpacity onPress={()=>pressTerminarFormulario()} 
                style={[styles.touchable, {backgroundColor: '#FFF2CC'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Guardar formulario</Text>
            </TouchableOpacity>
               
            
        </View>
    );
}
