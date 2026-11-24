import { StyleSheet, View } from 'react-native';
import { HelperText, Text, TextInput } from 'react-native-paper';
import { cores, fontes, raios, tipografia } from '../config/theme';

// Rótulo em cima + caixa de texto (o rótulo fica fora da caixa, como no Figma).
// "icone" mostra um ícone à direita, só visual.
// "erro" pinta a borda de vermelho e mostra a mensagem embaixo.
// "multiline" deixa a caixa mais alta (Observações).
// "editable={false}" é usado pelo CampoSelecao, que abre um menu ao tocar.
export default function CampoTexto({
  rotulo,
  valor,
  onChangeText,
  placeholder,
  icone,
  keyboardType,
  maxLength,
  erro,
  multiline,
  editable = true,
  style,
}) {
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
        multiline={multiline}
        editable={editable}
        error={Boolean(erro)}
        outlineColor={cores.borda}
        activeOutlineColor={cores.primaria}
        outlineStyle={styles.borda}
        style={[styles.caixa, multiline && styles.caixaAlta]}
        contentStyle={[styles.texto, multiline && styles.textoAlto]}
        right={icone && <TextInput.Icon icon={icone} color={cores.textoSecundario} disabled />}
      />

      {erro ? (
        <HelperText type="error" style={styles.erro}>
          {erro}
        </HelperText>
      ) : null}
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
  caixaAlta: {
    height: 86,
  },
  texto: {
    fontFamily: fontes.regular,
    fontSize: 14,
    color: cores.texto,
  },
  // Texto começa no alto da caixa (no Android ele ficaria no meio)
  textoAlto: {
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  // Tira o recuo do Paper para alinhar a mensagem com a caixa
  erro: {
    ...tipografia.corpoPequeno,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: -4,
  },
});
