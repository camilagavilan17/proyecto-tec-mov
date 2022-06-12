import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Tratamientos() {
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [tratamientos, setTratamientos] = useState([]);
    const navigation = useNavigation();
  
    const pressNuevoTratamiento = () => {
        console.log("Nuevo tratamiento");
        navigation.navigate('Nuevo tratamiento');
    }
    const pressGoTratamiento = (id) => {

        console.log("Tratamiento");
        console.log(id);
        navigation.navigate('Tratamiento', {id});
    }
    useEffect(() => {
        const datos = collection(db, 'tratamientos');
        const q = query(datos,  where('refuser','==',userid));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setTratamientos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nombre: doc.data().name,
                fechaInicio: doc.data().initDate,
                fechaTermino: doc.data().endDate,
                refusuario: doc.data().refuser,
                tipo: doc.data().tipoTratamiento,
            })))
        })
        return unsuscribe;
    }, []);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Mis tratamientos</Text>
            {tratamientos.map(tratamiento => 
                <TouchableOpacity onPress={()=>pressGoTratamiento(tratamiento.id)} 
                    style={[styles.touchable, {backgroundColor: 'green'}]}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>{tratamiento.nombre}</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={()=>pressNuevoTratamiento} 
                style={[styles.touchable, {backgroundColor: 'green'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Nuevo tratamiento</Text>
            </TouchableOpacity>
            
        </View>
    );
}
