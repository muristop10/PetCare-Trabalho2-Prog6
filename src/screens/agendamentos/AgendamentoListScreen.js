import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Cabecalho from '../../components/Cabecalho';
import ChipOpcao from '../../components/ChipOpcao';
import CartaoAgendamento from '../../components/CartaoAgendamento';
import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import { filtrosAgendamento } from '../../config/dados';
import { ehVeterinario } from '../../utils/servicos';
import { cores, espacos, tipografia } from '../../config/theme';

// A lista de agendamentos vem do AppNavigator (agendamentos e onExcluir chegam por props)
export default function AgendamentoListScreen({ navigation, agendamentos, onExcluir }) {
  const [filtro, setFiltro] = useState('Todos');
  // Agendamento escolhido na lixeira (null = modal fechado)
  const [agendamentoParaExcluir, setAgendamentoParaExcluir] = useState(null);

  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    if (filtro === 'Estética') return !ehVeterinario(agendamento.servico);
    if (filtro === 'Veterinário') return ehVeterinario(agendamento.servico);
    return true; // Todos
  });

  function confirmarExclusao() {
    onExcluir(agendamentoParaExcluir.id);
    setAgendamentoParaExcluir(null);
  }

  return (
    <View style={styles.tela}>
      <Cabecalho
        titulo="Agendamentos"
        subtitulo="Acompanhe os atendimentos dos seus pets"
        onVoltar={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
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
            onEditar={() => navigation.navigate('Agendar', { agendamento })}
            onExcluir={() => setAgendamentoParaExcluir(agendamento)}
          />
        ))}

        {agendamentosFiltrados.length === 0 && (
          <Text style={styles.vazio}>Nenhum agendamento encontrado.</Text>
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
