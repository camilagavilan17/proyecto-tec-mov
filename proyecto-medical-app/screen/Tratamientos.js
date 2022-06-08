import React, {useEffect, useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { firestore } from '@react-native-firebase/firestore';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { FlatList } from 'react-native-web';

export default function Tratamientos() {
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [tratamientos, setTratamientos] = useState('');
    const [tratamientos2, setTratamientos2] = useState('');
    const navigation = useNavigation();
  
    const pressNuevoTratamiento = () => {
        console.log("Press tratamiento nuevo");
        navigation.navigate('Nuevo tratamiento');
        
    }
    /*
    function renderItem ({item}){
        return(
            <View>
                <Text>{item.data().nombre}</Text>
                <Text>{item.data().fechainicio}</Text>
            </View>
        )
    }
    async function loadTratamientos (){
       
        const suscriber =  firestore().collection('tratamiento').onSnapshot(quert => {
            const productos = []
            querystring.forEach(doc => {
                productos.push({
                    ...doc,
                    key: doc.id
                })
            })
            setTratamientos2(productos)
        })
        return () => suscriber()
        
    };
    useEffect(() => {
        loadTratamientos()
 }, [])


<FlatList
                data = {tratamientos2}
                renderItem = {renderItem}
                keyExtractor = {item => item.id}
            />


    */
       return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Mis tratamientos</Text>
            <Text>Datos</Text>
            
            <TouchableOpacity onPress={pressNuevoTratamiento} 
                style={[styles.touchable, {backgroundColor: 'green'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Nuevo tratamiento</Text>
            </TouchableOpacity>
            
        </View>
    );
}
