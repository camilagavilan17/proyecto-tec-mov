import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {styles} from '../estilos/style';
import { getAuth } from 'firebase/auth';

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
