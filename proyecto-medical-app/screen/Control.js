import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Control({navigation, route}) {

    const control = route.params.control;
    
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    
    const pressNuevaReceta = (controlId) => {

        console.log("Nueva receta");
        navigation.navigate('Nueva receta', {controlId});
    }
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <Text>Control</Text>
            <Text>{control.idTratamiento}</Text>
            <Text>{control.detalle}</Text>
            
            <TouchableOpacity onPress={()=>pressNuevaReceta(control.id)} 
                style={[styles.touchable, {backgroundColor: '#FFF2CC'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Nueva receta</Text>
            </TouchableOpacity>
        </View>
    );
}
