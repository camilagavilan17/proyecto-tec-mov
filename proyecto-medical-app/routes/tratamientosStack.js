import { createStackNavigator } from '@react-navigation/stack';
import Tratamientos  from '../screen/Tratamientos';
import Tratamiento from '../screen/Tratamiento';
import NuevoTratamiento from '../screen/NuevoTratamiento';
import CrearNuevoTratamiento from '../screen/CrearNuevoTratamiento';

const Stack = createStackNavigator();

export default function tratamientosStack() {
  return (
    <Stack.Navigator>
      <Stack.Group /*screenOptions={{ header: () => <Header /> }}*/>
        <Stack.Screen name="Mis tratamientos" component={ Tratamientos }/>
        <Stack.Screen name="Tratamiento" component={ Tratamiento }/>
        <Stack.Screen name="Nuevo tratamiento" component={ NuevoTratamiento }/>
        <Stack.Screen name="Crear nuevo tratamiento" component={ CrearNuevoTratamiento }/>
      </Stack.Group>
    </Stack.Navigator>
  );
}