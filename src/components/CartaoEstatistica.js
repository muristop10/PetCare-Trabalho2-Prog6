import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { cores, raios, tipografia } from '../config/theme';

// Caixinha colorida com um número da empresa (ex.: "+ 2500 pets atendidos").
// "cor" pode ser 'amarelo', 'verde' ou 'azul' (pares de cores do tema).
export default function CartaoEstatistica({ texto, cor }) {
  return (
    <View style={[styles.cartao, { backgroundColor: cores[`${cor}Suave`] }]}>
      <Text style={[styles.texto, { color: cores[`${cor}Escuro`] }]}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: raios.cartao,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  texto: {
    ...tipografia.rotuloCampo,
    textAlign: 'center',
  },
});
