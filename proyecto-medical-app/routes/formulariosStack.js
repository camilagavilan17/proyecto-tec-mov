import { createStackNavigator } from '@react-navigation/stack';
import Formularios from '../screen/Formularios';

const Stack = createStackNavigator();

export default function formulariosStack() {
  return (
    <Stack.Navigator>
      <Stack.Group /*screenOptions={{ header: () => <Header /> }}*/>
        <Stack.Screen name="Mis formularios" component={ Formularios }/>
      </Stack.Group>
    </Stack.Navigator>
  );
}