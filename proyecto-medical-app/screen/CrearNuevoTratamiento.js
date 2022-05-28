import React, {useEffect, useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

export default function CrearNuevoTratamiento() {
    const navigation = useNavigation();
    const [tratamiento, setTratamiento] = useState({
        nombre: "",
        fechaInicio: "",
        fechaTermino:"",
    });
    const handleChangeText = (variable, value) => {
        setTratamiento({...tratamiento, [variable]: value});
    }
    const pressCrear = () => {
    console.log("Nombre:");
    console.log(tratamiento);
    console.log("Press crear");
    //navigation.navigate('Home');
    
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Nombre del tratamiento</Text>
            <TextInput style={{borderWidth:1, padding:7, width: 300}} onChangeText={(val) => handleChangeText("nombre" ,val)}/>
            <TouchableOpacity onPress={pressCrear}
             style={{width: 250,
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                borderColor: '#fff',
                borderWidth: 1,
                backgroundColor: 'green'}}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear</Text>
            </TouchableOpacity>
        </View>
    );
}
