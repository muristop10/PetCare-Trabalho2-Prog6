import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BarraAbas from "../components/BarraAbas";
import TelaCarregando from "../components/TelaCarregando";
import InicioScreen from "../screens/InicioScreen";
import AgendamentoListScreen from "../screens/agendamentos/AgendamentoListScreen";
import AgendamentoFormScreen from "../screens/agendamentos/AgendamentoFormScreen";
import PetListScreen from "../screens/pets/PetListScreen";
import PetFormScreen from "../screens/pets/PetFormScreen";
import SobreScreen from "../screens/SobreScreen";
import { atualizar, excluir, listar, salvar } from "../config/firebase";
import {
  acharAvisoVacina,
  acharProximoAgendamento,
} from "../utils/agendamentos";
import { cores } from "../config/theme";

const Abas = createBottomTabNavigator();
const StackPets = createNativeStackNavigator();
const StackAgendamentos = createNativeStackNavigator();

// Cria a função que desenha o ícone de uma aba
const icone = (nome) => {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={nome} size={size} color={color} />
  );
};

// Meus Pets tem duas telas: a lista e o formulário (a barra de abas continua visível).
// As telas recebem os pets e as funções por props, vindos do AppNavigator.
function MeusPetsNavigator({
  pets,
  erro,
  avisoVacina,
  onAdicionar,
  onEditar,
  onExcluir,
}) {
  return (
    <StackPets.Navigator screenOptions={{ headerShown: false }}>
      <StackPets.Screen name="ListaPets">
        {(props) => (
          <PetListScreen
            {...props}
            pets={pets}
            erro={erro}
            avisoVacina={avisoVacina}
            onExcluir={onExcluir}
          />
        )}
      </StackPets.Screen>
      {/* Sem gesto de arrastar para voltar: a saída passa pelo modal "Sair sem salvar?" */}
      <StackPets.Screen name="CadastrarPet" options={{ gestureEnabled: false }}>
        {(props) => (
          <PetFormScreen
            {...props}
            onAdicionar={onAdicionar}
            onEditar={onEditar}
          />
        )}
      </StackPets.Screen>
    </StackPets.Navigator>
  );
}

// Agendamentos também tem duas telas: a lista e o formulário de edição.
// A aba Agendar usa o mesmo formulário, mas só para agendamentos novos.
function AgendamentosNavigator({
  agendamentos,
  pets,
  erro,
  onEditar,
  onExcluir,
}) {
  return (
    <StackAgendamentos.Navigator screenOptions={{ headerShown: false }}>
      <StackAgendamentos.Screen name="ListaAgendamentos">
        {(props) => (
          <AgendamentoListScreen
            {...props}
            agendamentos={agendamentos}
            erro={erro}
            onExcluir={onExcluir}
          />
        )}
      </StackAgendamentos.Screen>
      <StackAgendamentos.Screen
        name="EditarAgendamento"
        options={{ gestureEnabled: false }}
      >
        {(props) => (
          <AgendamentoFormScreen {...props} pets={pets} onEditar={onEditar} />
        )}
      </StackAgendamentos.Screen>
    </StackAgendamentos.Navigator>
  );
}

export default function AppNavigator() {
  // Pets e agendamentos vêm do Firebase (começam vazios até a primeira leitura terminar)
  const [pets, setPets] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregar, setErroCarregar] = useState(false);
  // Mensagem de erro das gravações (salvar, editar, excluir); '' = nada para mostrar
  const [mensagemErro, setMensagemErro] = useState("");

  // READ: lê as duas coleções do Firebase quando o app abre.
  // Se falhar, o app abre mesmo assim e as listagens mostram o erro.
  useEffect(() => {
    Promise.all([listar("pets"), listar("agendamentos")])
      .then(([petsSalvos, agendamentosSalvos]) => {
        setPets(petsSalvos);
        setAgendamentos(agendamentosSalvos);
      })
      .catch(() => setErroCarregar(true))
      .finally(() => setCarregando(false));
  }, []);

  // Roda uma gravação no Firebase. Devolve true se deu certo; se falhar, mostra o aviso e devolve false
  async function gravar(operacao) {
    try {
      await operacao();
      return true;
    } catch (erro) {
      setMensagemErro(
        "Não foi possível concluir a operação. Verifique a conexão e tente novamente.",
      );
      return false;
    }
  }

  // Só atualizam a lista na tela depois que o Firebase confirmou a gravação
  function adicionarPet(pet) {
    return gravar(async () => {
      const id = await salvar("pets", pet);
      setPets((atuais) => [...atuais, { ...pet, id }]);
    });
  }

  function editarPet(petEditado) {
    return gravar(async () => {
      await atualizar("pets", petEditado);
      setPets((atuais) =>
        atuais.map((pet) => (pet.id === petEditado.id ? petEditado : pet)),
      );
    });
  }

  function excluirPet(id) {
    return gravar(async () => {
      await excluir("pets", id);
      setPets((atuais) => atuais.filter((pet) => pet.id !== id));
    });
  }

  // Todo agendamento novo começa como Pendente
  function adicionarAgendamento(agendamento) {
    return gravar(async () => {
      const novo = { ...agendamento, status: "Pendente" };
      const id = await salvar("agendamentos", novo);
      setAgendamentos((atuais) => [...atuais, { ...novo, id }]);
    });
  }

  function editarAgendamento(agendamentoEditado) {
    return gravar(async () => {
      await atualizar("agendamentos", agendamentoEditado);
      setAgendamentos((atuais) =>
        atuais.map((agendamento) =>
          agendamento.id === agendamentoEditado.id
            ? agendamentoEditado
            : agendamento,
        ),
      );
    });
  }

  function excluirAgendamento(id) {
    return gravar(async () => {
      await excluir("agendamentos", id);
      setAgendamentos((atuais) =>
        atuais.filter((agendamento) => agendamento.id !== id),
      );
    });
  }

  if (carregando) {
    return <TelaCarregando />;
  }

  return (
    <View style={styles.tela}>
      <Abas.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <BarraAbas {...props} />}
      >
        <Abas.Screen
          name="Inicio"
          options={{ title: "Início", tabBarIcon: icone("home-outline") }}
        >
          {(props) => (
            <InicioScreen
              {...props}
              proximoAgendamento={acharProximoAgendamento(agendamentos)}
            />
          )}
        </Abas.Screen>
        <Abas.Screen
          name="Agendamentos"
          options={{
            title: "Agendamentos",
            tabBarIcon: icone("calendar-blank-outline"),
          }}
        >
          {() => (
            <AgendamentosNavigator
              agendamentos={agendamentos}
              pets={pets}
              erro={erroCarregar}
              onEditar={editarAgendamento}
              onExcluir={excluirAgendamento}
            />
          )}
        </Abas.Screen>
        <Abas.Screen
          name="Agendar"
          options={{ title: "Agendar", tabBarIcon: icone("calendar-plus") }}
        >
          {(props) => (
            <AgendamentoFormScreen
              {...props}
              pets={pets}
              onAdicionar={adicionarAgendamento}
            />
          )}
        </Abas.Screen>
        <Abas.Screen
          name="MeusPets"
          options={{ title: "Meus Pets", tabBarIcon: icone("paw-outline") }}
        >
          {() => (
            <MeusPetsNavigator
              pets={pets}
              erro={erroCarregar}
              avisoVacina={acharAvisoVacina(pets, agendamentos)}
              onAdicionar={adicionarPet}
              onEditar={editarPet}
              onExcluir={excluirPet}
            />
          )}
        </Abas.Screen>
        <Abas.Screen
          name="Sobre"
          component={SobreScreen}
          options={{ title: "Sobre", tabBarIcon: icone("information-outline") }}
        />
      </Abas.Navigator>

      <Snackbar
        visible={mensagemErro !== ""}
        onDismiss={() => setMensagemErro("")}
        duration={4000}
        wrapperStyle={styles.avisoErro}
        style={styles.caixaErro}
      >
        {mensagemErro}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  // Fica acima da barra de abas
  avisoErro: {
    bottom: 90,
  },
  caixaErro: {
    backgroundColor: cores.perigo,
  },
});
