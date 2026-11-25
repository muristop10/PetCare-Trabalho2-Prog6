import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { cores } from '../config/theme';

// Tela cheia mostrada enquanto os dados vêm do Firebase
export default function TelaCarregando() {
  return (
    <View style={styles.tela}>
      <ActivityIndicator size="large" color={cores.primaria} />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: cores.fundo,
  },
});
