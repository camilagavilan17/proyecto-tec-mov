import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Formularios({navigation, route}) {
    const tratamiento = route.params.tratamiento;
    //console.log("Tratamiento formulario");
    //console.log(tratamiento);
    //console.log(tratamiento.initDate.toDate());
    const fechaFinal = new Date(tratamiento.endDate.toDate());
    const fechaInicial = new Date(tratamiento.initDate.toDate());
    const [listo, setListo] = useState(false);

    //console.log("Get año");
    //console.log(fechaFinal.getDate());
    //console.log(fechaFinal);
    //console.log(fechaInicial);
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [formularios, setFormularios] = useState([]);
    const [formulariosMuestra, setFormulariosMuestra] = useState([]);
    const [nuevosFormularios, setNuevosFormularios] = useState([]);
    const [formulario, setFormulario] = useState();
    const [hecho, setHecho] = useState(false);
    const [ultimaFecha, setUltimaFecha] = useState();
    const [num, setNum] = useState(0);

    const pressGoFormulario = (formulario) => {
        console.log("Formulario");
        console.log(formulario);
        navigation.navigate('Formulario', {formulario});
    }
    function formatoFecha(fecha) {
        var fechaActual = fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear();
        return fechaActual;
    }
    function anadirDia(date){
        var res = new Date(date);
        res.setDate(res.getDate() + 1);
        return res;
    }
    useEffect(() => {
        console.log("INICIO");
        var formulariosAux = [];
        const datos = collection(db, 'formularios');
        const q = query(datos,  orderBy('fecha','desc'));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            formulariosAux.push(querySnapshot.docs.map(doc => ({
                id: doc.id,
                refTratamiento: doc.data().refTratamiento,
                tipo: doc.data().tipo,
                fecha: doc.data().fecha,
                respondido: doc.data().respondido,
            })))
        })
        var formulariosMuestraAux = [];
        for (let index = 0; index < formulariosAux.length; index++) {
            console.log("63 INDEX: "+index);
            if(formulariosAux[index].refTratamiento==tratamiento.id){
                console.log("65 Tratamiento index");
                let fecha = new Date(formulariosAux[index].fecha.toDate());
                let fechaHoy = new Date();
                if(fecha < fechaHoy){
                    console.log("69 Formulario de hoy");
                    const element = formulariosAux[index];
                    formulariosMuestraAux.push(element);
                }
            }
        }
        setFormulariosMuestra(formulariosMuestraAux);
        var formulariosNuevos = [];
        if(formulariosMuestraAux.length==0){
            let facha = new Date(fechaInicial);
            while (facha < fechaFinal) {
                console.log("79 FACHAAAA: ");
                console.log(formatoFecha(facha));
                const nuevoFormulario = {
                    refTratamiento: tratamiento.id,
                    fecha: facha,
                    respondido: false,
                }
                formulariosNuevos.push(nuevoFormulario);
                //crearFormulariosVacios(nuevoFormulario);
                //console.log("Crear formulario para: "+formatoFecha(facha));
                facha = anadirDia(facha);
            }
            console.log("91 Info datos largo: "+formulariosNuevos.length);
            //setNuevosFormularios(datosNuevos);
            //setNuevosFormularios(datosNuevos);

        }
        else{
            setHecho(true);
        }

        if(!hecho){
            console.log("NO HECHO");
            console.log("Nuevos formularios largo: "+formulariosNuevos.length);
            for (let index = 0; index < formulariosNuevos.length; index++) {
                console.log("104 Index: "+index);
                console.log("Formulario nuevito:");
                const element = formulariosNuevos[index];
                crearFormulariosVacios(element);
            }
            setHecho(true);
            setNum(num+1);
        }
        else{
            console.log("HECHO");
        }
        return unsuscribe;
    }, [hecho]);
    function color(respondido) {
        if(respondido){
            return 'green';
        }
        else{
            return '#FFF2CC';
        }
    }
    
    const crearFormulariosVacios = async (element) => {
        /*
        if(!hecho){
            console.log("NO HECHO");
            console.log("Nuevos formularios largo: "+nuevosFormularios.length);
            for (let index = 0; index < nuevosFormularios.length; index++) {
                console.log("Formulario nuevito:");
                const element = nuevosFormularios[index];
                console.log(element);
                
                try {
                    await addDoc(collection(db, 'formularios'), element);
                }catch(e){
                    console.log(e);
                } 
                
            
            }
            setHecho(true);
        }
        else{
            console.log("HECHO");
        }
        */
        console.log("Nuevo formulario");
        console.log(element);
        
        try {
            await addDoc(collection(db, 'formularios'), element);
        }catch(e){
            console.log(e);
        } 
      
        
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {hecho && 
            formulariosMuestra.map(formulario => 
                <TouchableOpacity key={formulario.fecha.toDate()} onPress={()=>pressGoFormulario(formulario)} 
                    style={[styles.touchable, {backgroundColor: color(formulario.respondido) }]}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>{formatoFecha(formulario.fecha.toDate())}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
