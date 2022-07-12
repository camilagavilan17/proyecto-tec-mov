import { createStackNavigator } from '@react-navigation/stack';
import Header from '../shared/Header';
import Medicamentos from '../screen/Medicamentos';
import Medicamento from '../screen/Medicamento'
import CrearNuevoMedicamento from '../screen/CrearNuevoMedicamento';

const Stack = createStackNavigator();

export default function medicamentosStack() {
  return (
    <Stack.Navigator>
      <Stack.Group /*screenOptions={{ header: () => <Header /> }}*/>
        <Stack.Screen name="Mis medicamentos" component={ Medicamentos }/>
        <Stack.Screen name="Medicamento" component={ Medicamento }/>
        <Stack.Screen name="Crear nuevo medicamento" component={ CrearNuevoMedicamento }/>
      </Stack.Group>
    </Stack.Navigator>
  );
}