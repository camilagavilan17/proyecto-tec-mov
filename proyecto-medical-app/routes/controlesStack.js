import { createStackNavigator } from '@react-navigation/stack';
import Controles from '../screen/Controles';
import Control from '../screen/Control';
import CrearNuevoControl from '../screen/CrearNuevoControl';
import NuevaReceta from '../screen/NuevaReceta';

const Stack = createStackNavigator();

export default function controlesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group /*screenOptions={{ header: () => <Header /> }}*/>
        <Stack.Screen name="Mis controles" component={Controles} />
        <Stack.Screen name="Control" component={Control} />
        <Stack.Screen name="Nuevo control" component={CrearNuevoControl} />
        <Stack.Screen name="Nueva receta" component={NuevaReceta} />
      </Stack.Group>
    </Stack.Navigator>
  );
}