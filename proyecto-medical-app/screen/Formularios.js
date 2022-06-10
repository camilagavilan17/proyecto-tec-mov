import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Formularios({navigation, route}) {
    const idTratamiento = route.params.id;

    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [tratamientos, setTratamientos] = useState([]);
  
    const pressNuevoTratamiento = () => {
        console.log("Press tratamiento nuevo");
        navigation.navigate('Nuevo tratamiento');
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
            <Text>Mis formularios</Text>
            <Text>{idTratamiento}</Text>
            
           
            
        </View>
    );
}
