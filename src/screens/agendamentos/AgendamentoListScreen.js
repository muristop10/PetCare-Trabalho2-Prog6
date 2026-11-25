import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Cabecalho from '../../components/Cabecalho';
import CampoBusca from '../../components/CampoBusca';
import ChipOpcao from '../../components/ChipOpcao';
import CartaoAgendamento from '../../components/CartaoAgendamento';
import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import { filtrosAgendamento } from '../../config/dados';
import { filtrarPorBusca } from '../../utils/busca';
import { ehVeterinario } from '../../utils/servicos';
import { cores, espacos, tipografia } from '../../config/theme';

// A lista de agendamentos vem do AppNavigator (agendamentos e onExcluir chegam por props)
// erro = true quando não deu para ler os agendamentos do Firebase
export default function AgendamentoListScreen({ navigation, agendamentos, erro, onExcluir }) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  // Agendamento escolhido na lixeira (null = modal fechado)
  const [agendamentoParaExcluir, setAgendamentoParaExcluir] = useState(null);

  // Primeiro a busca (pet, serviço, data ou status), depois o filtro Estética / Veterinário
  const encontrados = filtrarPorBusca(agendamentos, busca, ['pet', 'servico', 'data', 'status']);
  const agendamentosFiltrados = encontrados.filter((agendamento) => {
    if (filtro === 'Estética') return !ehVeterinario(agendamento.servico);
    if (filtro === 'Veterinário') return ehVeterinario(agendamento.servico);
    return true; // Todos
  });

  async function confirmarExclusao() {
    const agendamento = agendamentoParaExcluir;
    setAgendamentoParaExcluir(null);
    await onExcluir(agendamento.id);
  }

  return (
    <View style={styles.tela}>
      <Cabecalho
        titulo="Agendamentos"
        subtitulo="Acompanhe os atendimentos dos seus pets"
        onVoltar={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <CampoBusca valor={busca} onChangeText={setBusca} placeholder="Buscar por pet, serviço ou data" />

        <View style={styles.filtros}>
          {filtrosAgendamento.map((opcao) => (
            <ChipOpcao
              key={opcao}
              texto={opcao}
              selecionado={filtro === opcao}
              onPress={() => setFiltro(opcao)}
            />
          ))}
        </View>

        {agendamentosFiltrados.map((agendamento) => (
          <CartaoAgendamento
            key={agendamento.id}
            agendamento={agendamento}
            onEditar={() => navigation.navigate('EditarAgendamento', { agendamento })}
            onExcluir={() => setAgendamentoParaExcluir(agendamento)}
          />
        ))}

        {erro && <Text style={styles.vazio}>Não foi possível carregar os agendamentos. Verifique a conexão.</Text>}
        {!erro && agendamentosFiltrados.length === 0 && (
          <Text style={styles.vazio}>
            {agendamentos.length === 0 ? 'Nenhum agendamento cadastrado ainda.' : 'Nenhum agendamento encontrado.'}
          </Text>
        )}
      </ScrollView>

      <DialogoConfirmacao
        visivel={agendamentoParaExcluir !== null}
        titulo="Excluir registro?"
        texto="Tem certeza de que deseja excluir este agendamento? Essa ação não pode ser desfeita."
        textoConfirmar="Excluir agendamento"
        onConfirmar={confirmarExclusao}
        onCancelar={() => setAgendamentoParaExcluir(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    paddingHorizontal: espacos.margem,
    paddingTop: 16,
    paddingBottom: espacos.margem,
    gap: espacos.entreCards,
  },
  filtros: {
    flexDirection: 'row',
    gap: 8,
  },
  vazio: {
    ...tipografia.corpo,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: espacos.margem,
  },
});
