import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';

import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Control({navigation, route}) {

    const control = route.params.control;
    console.log("Ubicacion base: "+control.ubicacion.latitude);
    console.log("Ubicacion base 2: "+control.ubicacion.longitude);
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [mode, setMode] = useState('date');

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState('');
    useEffect(()=>{
        let fDate = control.fecha.toDate().getDate() + '/' + (control.fecha.toDate().getMonth()+1) + '/' + control.fecha.toDate().getFullYear();
        setText(fDate);
        setDate(control.fecha.toDate());
    },[]);
    const showMode = (currentMode) => {
        console.log("date");
        console.log(currentMode);
        setShow(true);
        setMode(currentMode);
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');

        setDate(currentDate);
        setShow(false);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
        setText(fDate);
    }
    const pressNuevaReceta = (controlId) => {

        console.log("Nueva receta");
        navigation.navigate('Nueva receta', {controlId});
    }
    const pressUbicacion = (control, controlUbicacion) => {

        console.log("Ubicacion");
        navigation.navigate('Ubicacion', {control, controlUbicacion});
    }
    const actualizar = (idTratamiento) => {
        const docRef = doc(db, 'controles', control.id);
        updateDoc(docRef,{
            fecha: date,
        })

        navigation.navigate('Mis controles', {idTratamiento});
    }
    return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
            <Text style={styles.textTitle}>Información del control</Text>

            <Text style={styles.text}>Detalle del control: {control.detalle}</Text>

            <TouchableOpacity onPress={()=>pressUbicacion(control, control.ubicacion)} 
                style={[styles.button2, {backgroundColor: 'green'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Modificar ubicación de control</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity onPress={() => showMode('date')} style={[styles.button2, { backgroundColor: '#1B72B5'}]}>
                <Text style={styles.text}>Seleccionar fecha</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>pressNuevaReceta(control.id)} 
                style={[styles.button2, {backgroundColor: '#FFF2CC'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Nueva receta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>actualizar(control.idTratamiento)} 
                style={[styles.touchable, {backgroundColor: '#FFF2CC'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Guardar cambios</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID= 'dateTimePicker'
                    value= {date}
                    mode={mode}
                    is24Hour={true}
                    display= 'default'
                    onChange= {onChange}
                />
            )}
        </View>
    );
}
