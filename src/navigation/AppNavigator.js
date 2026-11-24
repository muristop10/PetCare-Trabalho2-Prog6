import { useState } from 'react';
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
import { agendamentosIniciais, petsIniciais } from '../config/dados';

const Abas = createBottomTabNavigator();
const StackPets = createNativeStackNavigator();
const StackAgendamentos = createNativeStackNavigator();

// Cria a função que desenha o ícone de uma aba
const icone = (nome) => {
  return ({ color, size }) => <MaterialCommunityIcons name={nome} size={size} color={color} />;
}

// Meus Pets tem duas telas: a lista e o formulário (a barra de abas continua visível).
// As telas recebem os pets e as funções por props, vindos do AppNavigator.
function MeusPetsNavigator({ pets, onAdicionar, onEditar, onExcluir }) {
  return (
    <StackPets.Navigator screenOptions={{ headerShown: false }}>
      <StackPets.Screen name="ListaPets">
        {(props) => <PetListScreen {...props} pets={pets} onExcluir={onExcluir} />}
      </StackPets.Screen>
      {/* Sem gesto de arrastar para voltar: a saída passa pelo modal "Sair sem salvar?" */}
      <StackPets.Screen name="CadastrarPet" options={{ gestureEnabled: false }}>
        {(props) => <PetFormScreen {...props} onAdicionar={onAdicionar} onEditar={onEditar} />}
      </StackPets.Screen>
    </StackPets.Navigator>
  );
}

// Agendamentos também tem duas telas: a lista e o formulário de edição.
// A aba Agendar usa o mesmo formulário, mas só para agendamentos novos.
function AgendamentosNavigator({ agendamentos, pets, onEditar, onExcluir }) {
  return (
    <StackAgendamentos.Navigator screenOptions={{ headerShown: false }}>
      <StackAgendamentos.Screen name="ListaAgendamentos">
        {(props) => <AgendamentoListScreen {...props} agendamentos={agendamentos} onExcluir={onExcluir} />}
      </StackAgendamentos.Screen>
      <StackAgendamentos.Screen name="EditarAgendamento" options={{ gestureEnabled: false }}>
        {(props) => <AgendamentoFormScreen {...props} pets={pets} onEditar={onEditar} />}
      </StackAgendamentos.Screen>
    </StackAgendamentos.Navigator>
  );
}

export default function AppNavigator() {
  // Lista de pets do app (por enquanto fixa; depois virá do Firebase)
  const [pets, setPets] = useState(petsIniciais);

  function adicionarPet(pet) {
    setPets([...pets, { ...pet, id: String(Date.now()) }]);
  }

  function editarPet(petEditado) {
    setPets(pets.map((pet) => (pet.id === petEditado.id ? petEditado : pet)));
  }

  function excluirPet(id) {
    setPets(pets.filter((pet) => pet.id !== id));
  }

  // Lista de agendamentos do app (por enquanto fixa; depois virá do Firebase)
  const [agendamentos, setAgendamentos] = useState(agendamentosIniciais);

  // Todo agendamento novo começa como Pendente
  function adicionarAgendamento(agendamento) {
    setAgendamentos([...agendamentos, { ...agendamento, id: String(Date.now()), status: 'Pendente' }]);
  }

  function editarAgendamento(agendamentoEditado) {
    setAgendamentos(
      agendamentos.map((agendamento) =>
        agendamento.id === agendamentoEditado.id ? agendamentoEditado : agendamento
      )
    );
  }

  function excluirAgendamento(id) {
    setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== id));
  }

  return (
    <Abas.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BarraAbas {...props} />}>
      <Abas.Screen
        name="Inicio"
        component={InicioScreen}
        options={{ title: 'Início', tabBarIcon: icone('home-outline') }}
      />
      <Abas.Screen
        name="Agendamentos"
        options={{ title: 'Agendamentos', tabBarIcon: icone('calendar-blank-outline') }}
      >
        {() => (
          <AgendamentosNavigator
            agendamentos={agendamentos}
            pets={pets}
            onEditar={editarAgendamento}
            onExcluir={excluirAgendamento}
          />
        )}
      </Abas.Screen>
      <Abas.Screen name="MeusPets" options={{ title: 'Meus Pets', tabBarIcon: icone('paw-outline') }}>
        {() => (
          <MeusPetsNavigator
            pets={pets}
            onAdicionar={adicionarPet}
            onEditar={editarPet}
            onExcluir={excluirPet}
          />
        )}
      </Abas.Screen>
      <Abas.Screen name="Agendar" options={{ title: 'Agendar', tabBarIcon: icone('calendar-plus') }}>
        {(props) => <AgendamentoFormScreen {...props} pets={pets} onAdicionar={adicionarAgendamento} />}
      </Abas.Screen>
      <Abas.Screen
        name="Sobre"
        component={SobreScreen}
        options={{ title: 'Sobre', tabBarIcon: icone('information-outline') }}
      />
    </Abas.Navigator>
  );
}
