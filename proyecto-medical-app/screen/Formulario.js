import React, {useState} from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Formulario({navigation, route}) {
    const [formularios, setFormularios] = useState();
    const formulario = route.params.formulario;
    const tratamiento = route.params.tratamiento;
    console.log("HOLIWI");
    console.log(formulario);
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [tratamientos, setTratamientos] = useState([]);
    const idTratamiento = "9OMYb50MufbeBDV10QoO";
    const fecha = new Date();
    console.log("################");
    console.log("T: "+tratamiento.id);
    console.log("F: "+formulario.id);
    console.log("F: "+formulario.respuesta1);
    //obtener datos
    const [respuesta1, setRespuesta1] = useState(formulario.respuesta1);
    function formatoFecha(fecha) {
        var fechaActual = fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear();
        return fechaActual;
    }

    const pressGuardarFormulario = () => {
        
        const docRef = doc(db, 'formularios', formulario.id);
        updateDoc(docRef,{
            respondido: true,
            respuesta1: respuesta1,
        })
        navigation.navigate('Mis formularios', {tratamiento});
    }
    
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <Text>{formulario.fecha && formatoFecha(formulario.fecha.toDate())}</Text>

            <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>¿Sintió algún dolor hoy?</Text>
            <TextInput value={respuesta1} onChangeText={(text) => setRespuesta1(text)} style={styles.input} placeholder="Respuesta 1" />
            
            <TouchableOpacity onPress={pressGuardarFormulario} 
                style={[styles.touchable, {backgroundColor: '#FFF2CC'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Guardar formulario</Text>
            </TouchableOpacity>
               
            
        </View>
    );
}
