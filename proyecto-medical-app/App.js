import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen  from './screen/LoginScreen';
import HomeScreen  from './screen/HomeScreen';
import Tratamientos  from './screen/Tratamientos';
import Formularios from './screen/Formularios';
import NuevoTratamiento from './screen/NuevoTratamiento';
import CrearNuevoTratamiento from './screen/CrearNuevoTratamiento';
import Tratamiento from './screen/Tratamiento';
import Medicamentos from './screen/Medicamentos';
import Controles from './screen/Controles';
import Medicamento from './screen/Medicamento';
import CrearNuevoMedicamento from './screen/CrearNuevoMedicamento';
import NuevoControl from './screen/NuevoControl';

  const Stack = createNativeStackNavigator();
  
  export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Inicio" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Mis tratamientos" component={Tratamientos} />
        <Stack.Screen name="Tratamiento" component={Tratamiento} />
        <Stack.Screen name="Nuevo tratamiento" component={NuevoTratamiento} />
        <Stack.Screen name="Crear nuevo tratamiento" component={CrearNuevoTratamiento} />
        
        <Stack.Screen name="Mis formularios" component={Formularios} />

        <Stack.Screen name="Mis medicamentos" component={Medicamentos} />
        <Stack.Screen name="Medicamento" component={Medicamento} />
        <Stack.Screen name="Crear nuevo medicamento" component={CrearNuevoMedicamento} />

        <Stack.Screen name="Mis controles" component={Controles} />
        <Stack.Screen name="Nuevo control" component={NuevoControl} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {

    flex:1,
    resizeMode: 'cover',
    justifyContent:'center',
 
  },
  login: {
    width: 350,
    height: 500,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 30
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  }


});
