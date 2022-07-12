import React from 'react';
import { View} from 'react-native';
import { getAuth } from 'firebase/auth';

export default function Medicamento({navigation, route}) {

    const medicamento = route.params.medicamento;
    
    const auth = getAuth();
    const user = auth.currentUser;
    
    return (
        <View style={{ flex: 1, alignItems: 'center'}}>
            <Text>{medicamento.nombre}</Text>
        </View>
    );
}
