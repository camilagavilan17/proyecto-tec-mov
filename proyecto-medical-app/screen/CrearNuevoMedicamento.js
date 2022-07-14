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
        <View style={[styles.container, { justifyContent: 'center' }]}>
            <Text style={styles.textTitle}>Crear medicamento</Text>
            
            <Text style={styles.text}>Nombre del medicamento</Text>
            <TextInput style={styles.input} onChangeText={(val) => setNombre(val)}/>
            
            <Text style={styles.text}>Hora inicial del medicamento</Text>
            <TextInput style={styles.input} onChangeText={(val) => setHora(val)}/>

            <Text style={styles.text}>Frecuencia del medicamento</Text>
            <TextInput style={styles.input} onChangeText={(val) => setFrecuencia(val)}/>
            
            <TouchableOpacity onPress={() => pressCrear()} style={[styles.touchable, { backgroundColor: 'green'}]}>
                <Text style={styles.text}>Crear</Text>
            </TouchableOpacity>
        </View>
    );
}
