import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import {styles} from '../estilos/style';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Ubicacion ({navigation, route}) {
    const [ubicacion, setUbicacion] = useState({
        latitude: route.params.controlUbicacion.latitude,
        longitude: route.params.controlUbicacion.longitude,
    });
    const control = route.params.control;
    const [variable, setVariable] = React.useState(false);
    const [mostrar, setMostrar] = React.useState(false);
    const [posicion, setPosicion] = React.useState({
        latitude: 0,
        longitude: 0,
    });
  
    useEffect(()=>{
        getLocationPermiso();
    },[]);
 
    const pressUbicacionMiPosicion = () => {
        
        setUbicacion(posicion);
    }
    const pressGuardarUbicacion = () => {
        
        const docRef = doc(db, 'controles', control.id);
        updateDoc(docRef,{
            ubicacion: ubicacion,
        })
        navigation.navigate('Control', {control});
    }

  async function getLocationPermiso(){

    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      alert('Permiso denegado');
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    console.log("CURRENT")
    setPosicion(current);
    if(ubicacion.latitude==0){

        setUbicacion(current);
    }
    if(!variable){
        setVariable(true);
    }
    setMostrar(true);
  };
  //-34.982954, -71.787639
  //Universidad de Talca, los niches: -35.002754, -71.229814
  //u 2  
  
  /*
  <MapViewDirections
    origin={posicion}
    destination={posicion2}
    apikey={GOOGLE_MAPS_KEY}
    strokeColor="red"
    strokeWidth={6}
  />
  */
  return (
    
    <View style={styles.container}>
        {mostrar && variable
        ?
        <MapView 
          style={styles.map}
          region={{
            latitude: ubicacion.latitude,
            longitude: ubicacion.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}> 
            <Marker coordinate={posicion}/>
            <Marker 
                draggable
                coordinate={ubicacion}
                onDragEnd={(direccion)=>setUbicacion(direccion.nativeEvent.coordinate)}
            />
        </MapView>
        :
        <MapView 
          style={styles.map}
          region={{
            latitude: posicion.latitude,
            longitude: posicion.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
          }}> 
            <Marker coordinate={posicion}/>
            <Marker coordinate={ubicacion}/>
        </MapView>
        }
        <TouchableOpacity onPress={()=>pressUbicacionMiPosicion()} 
            style={[styles.touchable, {backgroundColor: 'green'}]}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Actualizar a mi ubicación</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>pressGuardarUbicacion()} 
            style={[styles.touchable, {backgroundColor: 'green'}]}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Guardar ubicación</Text>
        </TouchableOpacity>
    </View>
  );
}