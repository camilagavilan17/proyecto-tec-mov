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
    const [formulario, setFormulario] = useState();
    const [num, setNum] = useState(0);
    const [existe, setExiste] = useState(false);
    const [ultimaFecha, setUltimaFecha] = useState();
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
        const datos = collection(db, 'formularios');
        const q = query(datos,  where('refTratamiento','==',tratamiento.id));
        const unsuscribe = onSnapshot(q, querySnapshot => {
            setFormularios(querySnapshot.docs.map(doc => ({
                id: doc.id,
                refTratamiento: doc.data().refTratamiento,
                tipo: doc.data().tipo,
                fecha: doc.data().fecha,
                respondido: doc.data().respondido,
            })))
        })
        return unsuscribe;
    }, []);
    

    useEffect(() => {
        formularios.sort((o1, o2)=> {
            if(o1.fecha < o2.fecha){
                return 1;
            }else if(o1.fecha > o2.fecha){
                return -1;
            }else{
                return 0;
            }
        });
        //setUltimaFecha(formularios[0].fecha.toDate());
        //console.log("ULTIMA FECHA CREADA");
        //console.log(formularios[0]);
        console.log("Uuuuuuuu");
        //console.log(formatoFecha(formularios[0].fecha.toDate()));
        //console.log(formatoFecha(ultimaFecha));
        if(formularios[0]){
            let facha = new Date(formularios[0].fecha.toDate());
            facha = anadirDia(facha);
            console.log("FECHA INICIAL: "+fechaInicial);
            let fachaFinal = new Date(fechaFinal);
            while (facha.getTime() < fechaFinal.getTime()) {//falta el valor igual
                //facha = anadirDia(facha);
                console.log("FACHA: ");
                console.log(formatoFecha(facha));
                crearFormulariosVacios(new Date(facha));
                console.log("Crear formulario para: "+formatoFecha(facha));
                if(formatoFecha(facha)==formatoFecha(new Date())){
                    console.log("ajale");
                    break;
                }
                facha = anadirDia(facha);
                //console.log("Fecha final");
                //console.log(formatoFecha(fachaFinal));
                
            }
        }
    }, [formularios]);
    function color(respondido) {
       
        if(respondido){
            return 'green';
        }
        else{
            return '#FFF2CC';
        }
    }
    
    const crearFormulariosVacios = async (fechaDato) => {
        
        const nuevoFormulario = {
            refTratamiento: tratamiento.id,
            fecha: fechaDato,
            respondido: false,
        }
        console.log("New trata");
        console.log(nuevoFormulario);
        console.log(formatoFecha(fechaDato));
        /*
        try {
            await addDoc(collection(db, 'formularios'), nuevoFormulario);
        }catch(e){
            console.log(e);
        }
        */
    }
    console.log("123");
    const fechaActual = new Date();
    console.log(formatoFecha(fechaActual));
    const fechaHoy = fechaActual.getFullYear()+'-'+(fechaActual.getMonth()+1)+'-'+fechaActual.getDate();
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            
            

            {formularios.map(formulario => 
                <TouchableOpacity key={formulario.fecha.toDate()} onPress={()=>pressGoFormulario(formulario)} 
                    style={[styles.touchable, {backgroundColor: color(formulario.respondido) }]}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>{formatoFecha(formulario.fecha.toDate())}</Text>
                </TouchableOpacity>
            )}

        </View>
    );
}
