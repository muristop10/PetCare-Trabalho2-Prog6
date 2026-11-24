import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { cores, raios } from '../config/theme';

// Botão quadrado só com ícone (editar azul, excluir vermelho)
export default function BotaoIcone({ icone, perigo, onPress }) {
  return (
    <IconButton
      icon={icone}
      size={20}
      mode="contained"
      containerColor={perigo ? cores.perigoSuave : cores.primariaSuave}
      iconColor={perigo ? cores.perigo : cores.primaria}
      onPress={onPress}
      style={styles.botao}
    />
  );
}

const styles = StyleSheet.create({
  botao: {
    width: 36,
    height: 36,
    margin: 0,
    borderRadius: raios.caixaIcone,
  },
});
