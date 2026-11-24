import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ChipOpcao from './ChipOpcao';
import { cores, tipografia } from '../config/theme';

// Rótulo + chips em que só um pode ser escolhido (Espécie, Sexo).
// "esticar" faz os chips dividirem a largura igualmente.
export default function CampoOpcoes({ rotulo, opcoes, valor, onChange, esticar, style }) {
  return (
    <View style={[styles.campo, style]}>
      <Text style={styles.rotulo}>{rotulo}</Text>

      <View style={styles.chips}>
        {opcoes.map((opcao) => (
          <ChipOpcao
            key={opcao}
            texto={opcao}
            selecionado={valor === opcao}
            onPress={() => onChange(opcao)}
            esticar={esticar}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  campo: {
    gap: 8,
  },
  rotulo: {
    ...tipografia.rotuloCampo,
    color: cores.texto,
  },
  chips: {
    flexDirection: 'row',
    gap: 8,
  },
});
