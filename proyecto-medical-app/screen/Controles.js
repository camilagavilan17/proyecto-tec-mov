import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Controles({navigation, route}) {
    const idTratamiento = route.params.idTratamiento;

    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [controles, setControles] = useState([]);

    const pressGoControl = (control) => {
        console.log("Press control");
        navigation.navigate('Control', {control});
    }
    const pressGoNuevoControl = (idTratamiento) => {
        console.log("Press control nuevo");
        navigation.navigate('Nuevo control', {idTratamiento});
    }
    
    useEffect(() => {
        const datos = collection(db, 'controles');
        const q = query(datos,  where('idTratamiento','==',idTratamiento));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setControles(querySnapshot.docs.map(doc => ({
                id: doc.id,
                idTratamiento: doc.data().idTratamiento,
                fecha: doc.data().fecha,
                recinto: doc.data().recinto,
                detalle: doc.data().detalle,
                medico: doc.data().medico,
            })))
        })
        return unsuscribe;
    }, []);
    
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            
            {controles.map(control => 
                <TouchableOpacity key={control.id} onPress={()=>pressGoControl(control)} 
                    style={[styles.touchable, {backgroundColor: 'green'}]}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>{control.medico}</Text>
                </TouchableOpacity>
            )}


            <TouchableOpacity onPress={()=>pressGoNuevoControl(idTratamiento)} 
                style={[styles.touchable, {backgroundColor: 'green'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Nuevo control</Text>
            </TouchableOpacity>
           
            
        </View>
    );
}
