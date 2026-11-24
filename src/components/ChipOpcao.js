import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { cores, tipografia } from '../config/theme';

// Opção em formato de pílula: azul quando escolhida, branca com borda quando não.
// "esticar" faz o chip ocupar o espaço que sobrar na linha, com o texto no meio.
export default function ChipOpcao({ texto, selecionado, onPress, esticar }) {
  return (
    <Chip
      mode="outlined"
      selected={selecionado}
      showSelectedCheck={false}
      onPress={onPress}
      style={[styles.chip, selecionado && styles.chipSelecionado, esticar && styles.esticar]}
      textStyle={[styles.texto, selecionado && styles.textoSelecionado, esticar && styles.esticar]}
    >
      {texto}
    </Chip>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 18,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
  },
  chipSelecionado: {
    borderColor: cores.primaria,
    backgroundColor: cores.primaria,
  },
  // marginVertical 8 + linha de 20 deixam o chip com 36 de altura
  texto: {
    ...tipografia.rotuloChip,
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    color: cores.texto,
  },
  textoSelecionado: {
    color: cores.superficie,
  },
  esticar: {
    flex: 1,
  },
});
