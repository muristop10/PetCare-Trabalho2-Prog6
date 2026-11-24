import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cores, raios, tipografia } from '../config/theme';

// Caixa amarela com ícone de informação (ex.: lembrete de vacina)
export default function AvisoAmarelo({ texto, onPress }) {
  return (
    <Card mode="contained" style={styles.aviso} contentStyle={styles.conteudo} onPress={onPress}>
      <MaterialCommunityIcons name="information-outline" size={24} color={cores.amareloEscuro} />
      <Text style={styles.texto}>{texto}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  aviso: {
    backgroundColor: cores.amareloSuave,
    borderColor: cores.destaque,
    borderWidth: 1.5,
    borderRadius: raios.cartao,
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  texto: {
    ...tipografia.corpoMedio,
    flex: 1,
    color: cores.amareloEscuro,
  },
});
