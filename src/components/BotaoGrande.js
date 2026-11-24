import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { cores, raios, tipografia } from '../config/theme';

// Botão de largura total (formulários e modais).
// contorno: branco com borda azul. perigo: vermelho (Sair, Excluir).
export default function BotaoGrande({ texto, onPress, contorno, perigo, disabled, style }) {
  let corFundo = cores.primaria;
  if (perigo) corFundo = cores.perigo;
  if (contorno) corFundo = cores.superficie;

  return (
    <Button
      mode={contorno ? 'outlined' : 'contained'}
      buttonColor={disabled ? undefined : corFundo}
      textColor={contorno ? cores.primaria : undefined}
      onPress={onPress}
      disabled={disabled}
      style={[styles.botao, contorno && styles.contorno, style]}
      contentStyle={styles.conteudo}
      labelStyle={styles.rotulo}
    >
      {texto}
    </Button>
  );
}

const styles = StyleSheet.create({
  botao: {
    borderRadius: raios.botao,
  },
  contorno: {
    borderColor: cores.primaria,
    borderWidth: 1.5,
  },
  conteudo: {
    height: 52,
  },
  rotulo: {
    ...tipografia.rotuloBotao,
    marginVertical: 0,
    letterSpacing: 0,
  },
});
