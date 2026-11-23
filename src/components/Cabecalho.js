import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores, espacos, raios } from '../config/theme';

// Faixa azul do topo. O conteúdo (logo, título, botões) vem como children.
export default function Cabecalho({ children }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.cabecalho, { paddingTop: insets.top + 2 }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    backgroundColor: cores.primaria,
    borderBottomLeftRadius: raios.cabecalho,
    borderBottomRightRadius: raios.cabecalho,
    paddingHorizontal: espacos.margemCabecalho,
    paddingBottom: 14,
    gap: 8,
  },
});
