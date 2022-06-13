import React, {useState} from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {styles} from '../estilos/style';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native-web';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CrearNuevoMedicamento({navigation, route}) {
    //1=cefaleo, 2=estomacal
    const idTratamiento = route.params.idTratamiento;
  
    //usuario id
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    //navegacion
    //const navigation = useNavigation();

    const [nombre, setNombre] = useState('');

    const [hora, setHora] = useState('Empty');
    const [frecuencia, setFrecuencia] = useState('Empty');
   
    const pressCrear = async () => {
        const nuevoMedicamento = {
            nombre: nombre,
            hora: hora,
            frecuenciaHora: frecuencia,
            reftratamiento: idTratamiento,
        }
        try {
            await addDoc(collection(db, 'medicamentos'), nuevoMedicamento);
        }catch(e){
            console.log(e);
        } finally{
            setNombre('');
        }
        navigation.navigate('Mis medicamentos', {idTratamiento});
    
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Crear medicamento</Text>
            <Text>Id tratamiento:</Text>
            <Text>{idTratamiento}</Text>
            
            
            <TextInput style={{borderWidth:1, padding:7, width: 300}} onChangeText={(val) => setNombre(val)} placeholder="Nombre"/>
            <TextInput style={{borderWidth:1, padding:7, width: 300}} onChangeText={(val) => setHora(val)} placeholder="Hora"/>
            <TextInput style={{borderWidth:1, padding:7, width: 300}} onChangeText={(val) => setFrecuencia(val)} placeholder="Frecuencia"/>
            
            <TouchableOpacity onPress={() => pressCrear()} style={[styles.touchable, { backgroundColor: 'green'}]}>
                <Text style={styles.text}>Crear</Text>
            </TouchableOpacity>
        </View>
    );
}
