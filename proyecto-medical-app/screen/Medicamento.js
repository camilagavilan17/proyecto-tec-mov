import React, {useEffect, useState} from 'react';
import { FlatList, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';
import { async, querystring } from '@firebase/util';
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Medicamento({navigation, route}) {

    const medicamento = route.params.medicamento;
    
    const auth = getAuth();
    const user = auth.currentUser;
    const userid = user.uid;
    
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <Text>Mi medicamento</Text>
            <Text>{medicamento.nombre}</Text>
            
            
           
            
        </View>
    );
}
