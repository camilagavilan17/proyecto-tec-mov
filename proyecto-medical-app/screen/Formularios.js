import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Formularios({navigation, route}) {
    const tratamiento = route.params.tratamiento;
    const formulariosCreados = tratamiento.formulariosCreados;
    
    //console.log("Tratamiento formulario");
    //console.log(tratamiento);
    //console.log(tratamiento.initDate.toDate());
    const fechaFinal = new Date(tratamiento.endDate.toDate());
    const fechaInicial = new Date(tratamiento.initDate.toDate());
    const [listo, setListo] = useState(false);

    const actualizar = () => {
        //console.log("Mis formularios");
        //console.log(tratamiento);
        console.log("----------------------");
        navigation.navigate('Mis tratamientos');
    }
    //console.log("Get año");
    //console.log(fechaFinal.getDate());
    //console.log(fechaFinal);
    //console.log(fechaInicial);
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    const [formularios, setFormularios] = useState([]);
    const [formulariosMuestra, setFormulariosMuestra] = useState([]);
    const [formulariosNuevos, setFormulariosNuevos] = useState([]);
    const [formulario, setFormulario] = useState();
    const [hecho, setHecho] = useState(false);
    const [ultimaFecha, setUltimaFecha] = useState();
    const [num, setNum] = useState(0);

    const pressGoFormulario = (formulario) => {
        console.log("Formulario");
        console.log(formulario);
        navigation.navigate('Formulario', {formulario, tratamiento});
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
        console.log("53 "+formulariosCreados);
        async function cargaInicial(){
            console.log("CARGA INICIAL");
            var forms = [];
            const datos = collection(db, 'formularios');
            const q = query(datos,  orderBy('fecha','desc'));
            const unsuscribe = onSnapshot(q, querySnapshot => {
                setFormularios(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    refTratamiento: doc.data().refTratamiento,
                    tipo: doc.data().tipo,
                    fecha: doc.data().fecha,
                    respondido: doc.data().respondido,
                    respuesta1: doc.data().respuesta1,
                })))
            });
            return unsuscribe;
        }
        cargaInicial();

    },[num]);
    useEffect(() => {
        console.log("FORMULARIOS CARGADOS: "+formularios.length);
        async function filtroTratamiento (){
            console.log("FILTRO POR TRATAMIENTO");
            if(formularios.length>0){
                console.log("75");
                var formulariosMuestraAux = [];
                for (let index = 0; index < formularios.length; index++) {
                    //console.log("78 INDEX: "+index);
                    if(formularios[index].refTratamiento==tratamiento.id){
                        //console.log("80 Tratamiento index");
                        let fecha = new Date(formularios[index].fecha.toDate());
                        let fechaHoy = new Date();
                        if(fecha < fechaHoy){
                            console.log("84 Formulario de hoy");
                            const element = formularios[index];
                            formulariosMuestraAux.push(element);
                        }
                    }
                }
    
                setFormulariosMuestra(formulariosMuestraAux);
            }
        }
        filtroTratamiento();
    },[formularios]);
    
    useEffect(() => {
        console.log("FORMULARIOS A MOSTRAR: "+formulariosMuestra.length);
        async function muestrarioFormularios (){
            var formulariosNuevosAux = [];
            console.log("A "+formulariosMuestra);
            if(formulariosMuestra.length==0){
                let facha = new Date(fechaInicial);
                while (facha < fechaFinal) {
                    console.log("105 FACHAAAA: ");
                    console.log(formatoFecha(facha));
                    const nuevoFormulario = {
                        refTratamiento: tratamiento.id,
                        fecha: facha,
                        respondido: false,
                    }
                    formulariosNuevosAux.push(nuevoFormulario);
                    //crearFormulariosVacios(nuevoFormulario);
                    //console.log("Crear formulario para: "+formatoFecha(facha));
                    facha = anadirDia(facha);
                }
                console.log("117 Info datos largo: "+formulariosNuevosAux.length);
                //setNuevosFormularios(datosNuevos);
                //setNuevosFormularios(datosNuevos);

            }
            else{
                setHecho(true);
            }
            setFormulariosNuevos(formulariosNuevosAux);
        }
        muestrarioFormularios();
    },[formulariosMuestra]);

    useEffect(() => {
        if(!formulariosCreados){
            if(formulariosNuevos.length>0){
                console.log("131");
                if(!hecho){
                    console.log("NO HECHO");
                    console.log("Nuevos formularios largo: "+formulariosNuevos.length);
                    for (let index = 0; index < formulariosNuevos.length; index++) {
                        console.log("136 Index: "+index);
                        console.log("Formulario nuevito:");
                        const element = formulariosNuevos[index];
                        crearFormulariosVacios(element);
                    }
                    formulariosCreadosBD();
                    setHecho(true);
                    setNum(num+1);
                }
                else{
                    console.log("HECHO");
                }
            }
        }
        
    }, [formulariosNuevos]);

    function color(respondido) {
        if(respondido){
            return 'green';
        }
        else{
            return '#FFF2CC';
        }
    }
        
    const formulariosCreadosBD = () => {
   
        const docRef = doc(db, 'tratamientos', tratamiento.id);
        updateDoc(docRef,{
            formulariosCreados: true,
        })
        
    }
    const crearFormulariosVacios = async (element) => {
   
        console.log("Nuevo formulario");
        console.log(element);
        
        try {
            await addDoc(collection(db, 'formularios'), element);
        }catch(e){
            console.log(e);
        } 
        
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>actualizar()} 
                style={[styles.touchable, {backgroundColor: '#FFF2CC'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Guardar cambios</Text>
            </TouchableOpacity>
             
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
