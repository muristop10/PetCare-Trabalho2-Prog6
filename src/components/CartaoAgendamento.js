import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CaixaIcone from './CaixaIcone';
import SeloStatus from './SeloStatus';
import BotaoIcone from './BotaoIcone';
import { ehVeterinario, iconeDoServico } from '../utils/servicos';
import { cores, coresStatus, raios, tipografia } from '../config/theme';

// Card de um agendamento: a borda tem a cor do status.
// Serviços veterinários usam o quadrado do ícone azul escuro com ícone branco.
export default function CartaoAgendamento({ agendamento, onEditar, onExcluir }) {
  const veterinario = ehVeterinario(agendamento.servico);
  const corBorda = coresStatus[agendamento.status].fundo;

  // Regra: só Pendente pode ser editado; Pendente e Confirmado podem ser excluídos.
  // Concluído e Cancelado não mostram botões.
  const podeEditar = agendamento.status === 'Pendente';
  const podeExcluir = podeEditar || agendamento.status === 'Confirmado';

  return (
    <Card style={[styles.cartao, { borderColor: corBorda }]} contentStyle={styles.conteudo}>
      <View style={styles.linha}>
        <CaixaIcone
          icone={iconeDoServico(agendamento.servico)}
          tamanho={44}
          tamanhoIcone={22}
          corFundo={veterinario ? cores.primaria : cores.primariaSuave}
          corIcone={veterinario ? cores.superficie : cores.primaria}
        />

        <View style={styles.textos}>
          <Text style={styles.pet}>{agendamento.pet}</Text>
          <Text style={styles.servico}>{agendamento.servico}</Text>
        </View>

        <SeloStatus status={agendamento.status} />
      </View>

      <Divider style={styles.divisor} />

      <View style={[styles.linha, styles.linhaInferior]}>
        <View style={styles.info}>
          <MaterialCommunityIcons name="calendar-blank-outline" size={18} color={cores.texto} />
          <Text style={styles.textoInfo}>{agendamento.data}</Text>
        </View>

        <View style={styles.info}>
          <MaterialCommunityIcons name="clock-outline" size={18} color={cores.texto} />
          <Text style={styles.textoInfo}>{agendamento.hora}</Text>
        </View>

        {/* Empurra os botões para a direita */}
        <View style={styles.espaco} />

        <View style={styles.botoes}>
          {podeEditar && <BotaoIcone icone="pencil-outline" onPress={onEditar} />}
          {podeExcluir && <BotaoIcone icone="trash-can-outline" perigo onPress={onExcluir} />}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cartao: {
    borderRadius: raios.cartao,
    borderWidth: 1.5,
  },
  conteudo: {
    padding: 14,
    gap: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  // Mesma altura dos botões, para o card não encolher quando eles não aparecem
  linhaInferior: {
    minHeight: 36,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  pet: {
    ...tipografia.nomePet,
    color: cores.texto,
  },
  servico: {
    ...tipografia.corpo,
    color: cores.textoSecundario,
  },
  divisor: {
    backgroundColor: cores.borda,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textoInfo: {
    ...tipografia.corpoMedio,
    color: cores.texto,
  },
  espaco: {
    flex: 1,
  },
  botoes: {
    flexDirection: 'row',
    gap: 8,
  },
});
