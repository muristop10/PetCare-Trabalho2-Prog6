import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BarraAbas from '../components/BarraAbas';
import InicioScreen from '../screens/InicioScreen';
import AgendamentoListScreen from '../screens/agendamentos/AgendamentoListScreen';
import AgendamentoFormScreen from '../screens/agendamentos/AgendamentoFormScreen';
import PetListScreen from '../screens/pets/PetListScreen';
import PetFormScreen from '../screens/pets/PetFormScreen';
import SobreScreen from '../screens/SobreScreen';

const Abas = createBottomTabNavigator();
const StackPets = createNativeStackNavigator();

// Cria a função que desenha o ícone de uma aba
const icone = (nome) => {
  return ({ color, size }) => <MaterialCommunityIcons name={nome} size={size} color={color} />;
}

// Meus Pets tem duas telas: a lista e o formulário (a barra de abas continua visível)
function MeusPetsNavigator() {
  return (
    <StackPets.Navigator screenOptions={{ headerShown: false }}>
      <StackPets.Screen name="ListaPets" component={PetListScreen} />
      <StackPets.Screen name="CadastrarPet" component={PetFormScreen} />
    </StackPets.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Abas.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BarraAbas {...props} />}>
      <Abas.Screen
        name="Inicio"
        component={InicioScreen}
        options={{ title: 'Início', tabBarIcon: icone('home-outline') }}
      />
      <Abas.Screen
        name="Agendamentos"
        component={AgendamentoListScreen}
        options={{ title: 'Agendamentos', tabBarIcon: icone('calendar-blank-outline') }}
      />
      <Abas.Screen
        name="MeusPets"
        component={MeusPetsNavigator}
        options={{ title: 'Meus Pets', tabBarIcon: icone('paw-outline') }}
      />
      <Abas.Screen
        name="Agendar"
        component={AgendamentoFormScreen}
        options={{ title: 'Agendar', tabBarIcon: icone('calendar-plus') }}
      />
      <Abas.Screen
        name="Sobre"
        component={SobreScreen}
        options={{ title: 'Sobre', tabBarIcon: icone('information-outline') }}
      />
    </Abas.Navigator>
  );
}
