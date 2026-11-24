import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { coresStatus, tipografia } from '../config/theme';

// Pílula colorida com um ponto e o status do agendamento (ex.: "● Pendente")
export default function SeloStatus({ status }) {
  const cor = coresStatus[status];

  return (
    <View style={[styles.selo, { backgroundColor: cor.fundo }]}>
      <View style={[styles.ponto, { backgroundColor: cor.texto }]} />
      <Text style={[styles.texto, { color: cor.texto }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // paddingVertical 5 + linha de 16 deixam o selo com 26 de altura
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 13,
  },
  ponto: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  texto: {
    ...tipografia.rotuloSelo,
  },
});
