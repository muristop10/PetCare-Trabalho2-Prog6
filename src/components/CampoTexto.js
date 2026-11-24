import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { cores, fontes, raios, tipografia } from '../config/theme';

// Rótulo em cima + caixa de texto (o rótulo fica fora da caixa, como no Figma).
// "icone" mostra um ícone à direita, só visual.
export default function CampoTexto({ rotulo, valor, onChangeText, placeholder, icone, keyboardType, maxLength, style }) {
  return (
    <View style={[styles.campo, style]}>
      <Text style={styles.rotulo}>{rotulo}</Text>

      <TextInput
        mode="outlined"
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={cores.textoSecundario}
        keyboardType={keyboardType}
        maxLength={maxLength}
        outlineColor={cores.borda}
        activeOutlineColor={cores.primaria}
        outlineStyle={styles.borda}
        style={styles.caixa}
        contentStyle={styles.texto}
        right={icone && <TextInput.Icon icon={icone} color={cores.textoSecundario} disabled />}
      />
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
  borda: {
    borderRadius: raios.campo,
  },
  caixa: {
    height: 48,
    backgroundColor: cores.superficie,
  },
  texto: {
    fontFamily: fontes.regular,
    fontSize: 14,
    color: cores.texto,
  },
});
