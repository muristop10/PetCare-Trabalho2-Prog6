import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import CaixaIcone from './CaixaIcone';
import { cores, raios, tipografia } from '../config/theme';

// Card pequeno com ícone e texto (ex.: "Cadastrar pet")
export default function CartaoAtalho({ icone, titulo, onPress }) {
  return (
    <Card style={styles.cartao} contentStyle={styles.conteudo} onPress={onPress}>
      <CaixaIcone icone={icone} tamanho={32} tamanhoIcone={20} />
      <Text style={styles.titulo}>{titulo}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flex: 1,
    borderRadius: raios.cartao,
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  titulo: {
    ...tipografia.rotuloCampo,
    flex: 1,
    color: cores.texto,
  },
});
