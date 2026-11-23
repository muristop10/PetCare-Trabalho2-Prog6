import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CaixaIcone from './CaixaIcone';
import { cores, raios, tipografia } from '../config/theme';

// Card amarelo da tela Início
export default function CartaoProximoAgendamento({ agendamento, onPress }) {
  return (
    <Card style={styles.cartao} contentStyle={styles.conteudo} onPress={onPress}>
      <CaixaIcone
        icone="calendar-blank-outline"
        tamanho={48}
        tamanhoIcone={24}
        raio={raios.caixaIconeGrande}
        corFundo={cores.superficie}
        corIcone={cores.texto}
      />

      <View style={styles.textos}>
        <Text style={styles.sobretitulo}>Próximo agendamento</Text>
        <Text style={styles.titulo}>
          {agendamento.pet} · {agendamento.servico}
        </Text>
        <Text style={styles.data}>
          {agendamento.data} · {agendamento.hora}
        </Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={22} color={cores.texto} />
    </Card>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: cores.destaque,
    borderRadius: raios.cartaoDestaque,
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  textos: {
    flex: 1,
  },
  sobretitulo: {
    ...tipografia.sobretitulo,
    color: cores.texto,
  },
  titulo: {
    ...tipografia.tituloCartao,
    color: cores.texto,
  },
  data: {
    ...tipografia.corpoMedio,
    color: cores.texto,
  },
});
