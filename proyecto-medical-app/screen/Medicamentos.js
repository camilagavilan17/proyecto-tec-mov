import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Medicamentos({navigation, route}) {
    const idTratamiento = route.params.idTratamiento;
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [medicamentos, setMedicamentos] = useState([]);
  
    const pressGoMedicamento = (medicamento) => {
        console.log("Press medicamento");
        navigation.navigate('Medicamento', {medicamento});
    }
    const pressNuevoMedicamento = (idTratamiento) => {
        console.log("Crear nuevo medicamento");
        navigation.navigate('Crear nuevo medicamento', {idTratamiento});
    }
    useEffect(() => {
        const datos = collection(db, 'medicamentos');
        const q = query(datos,  where('reftratamiento','==',idTratamiento));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setMedicamentos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                reftratamiento: doc.data().reftratamiento, 
                hora: doc.data().hora,
                frecuenciaHora: doc.data().frecuenciaHora,
                nombre: doc.data().nombre,
            })))
        })
        return unsuscribe;
    }, []);
    

    /*
    {medicamentos.map(medicamento => 
                <TouchableOpacity onPress={()=>pressGoMedicamento(medicamento.id)} 
                    style={[styles.touchable, {backgroundColor: 'green'}]}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>{medicamento.nombre}</Text>
                </TouchableOpacity>
            )}
    */

            /*
             <TouchableOpacity onPress={pressNuevoMedicamento(idTratamiento)} 
                style={[styles.touchable, {backgroundColor: 'green'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Nuevo medicamento</Text>
            </TouchableOpacity>
            */
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           
            {medicamentos.map(medicamento => 
                <TouchableOpacity onPress={()=>pressGoMedicamento(medicamento)} 
                    style={[styles.touchable, {backgroundColor: 'green'}]}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>{medicamento.nombre}</Text>
                </TouchableOpacity>
            )}
             <TouchableOpacity onPress={()=>pressNuevoMedicamento(idTratamiento)} 
                style={[styles.touchable, {backgroundColor: '#FFF2CC'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Nuevo medicamento</Text>
            </TouchableOpacity>
            
        </View>
    );
}
