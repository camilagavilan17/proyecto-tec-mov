import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getAuth } from 'firebase/auth';
import 'react-native-gesture-handler';
import LoginScreen  from './screen/LoginScreen';
import tratamientosStack from './routes/tratamientosStack';
import medicamentosStack from './routes/medicamentosStack';
import formulariosStack from './routes/formulariosStack';
import controlesStack from './routes/controlesStack';

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  function Home() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Tratamientos" component={tratamientosStack}/>
        <Drawer.Screen name="Medicamentos" component={medicamentosStack}/>
        <Drawer.Screen name="Formularios" component={formulariosStack}/>
        <Drawer.Screen name="Controles" component={controlesStack}/>
      </Drawer.Navigator>
    );
  }
  
  export default function App() {

  const [user, setUser] = useState('');
  const auth = getAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={LoginScreen}/>
        <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
