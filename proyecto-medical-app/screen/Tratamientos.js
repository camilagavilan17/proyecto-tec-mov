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
    const pressGoTratamiento = (tratamiento) => {

        console.log("Tratamiento");
        console.log(tratamiento);
        navigation.navigate('Tratamiento', {tratamiento});
    }
    useEffect(() => {
        const datos = collection(db, 'tratamientos');//falta recargar los tratamientos para obtener el true que deberiamos hacer
        const q = query(datos,  where('refuser','==',userid));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setTratamientos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                initDate: doc.data().initDate,
                endDate: doc.data().endDate,
                refuser: doc.data().refuser,
                tipoTratamiento: doc.data().tipoTratamiento,
                formulariosCreados: doc.data().formulariosCreados,
            })))
        })
        return unsuscribe;
    }, []);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           
            {tratamientos.map(tratamiento => 
                <TouchableOpacity key={tratamiento.id} onPress={()=>pressGoTratamiento(tratamiento)} 
                    style={[styles.touchable, {backgroundColor: 'green'}]}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>{tratamiento.name}</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={()=>pressNuevoTratamiento()} 
                style={[styles.touchable, {backgroundColor: '#FFF2CC'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Nuevo tratamiento</Text>
            </TouchableOpacity>
            
        </View>
    );
}
