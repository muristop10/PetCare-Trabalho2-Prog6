import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { cores, tipografia } from '../config/theme';

// Tela temporária para as abas que ainda não foram portadas do Figma.
// Apagar quando todas as telas estiverem prontas.
export default function TelaProvisoria({ titulo }) {
  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
  titulo: {
    ...tipografia.tituloSecao,
    color: cores.texto,
  },
});
