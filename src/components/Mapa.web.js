import { StyleSheet, View } from 'react-native';
import { raios } from '../config/theme';

// Versão para o navegador (o react-native-maps não funciona na web).
// O Expo usa este arquivo sozinho quando o app roda na web.
export default function Mapa({ latitude, longitude, titulo }) {
  const endereco = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <View style={styles.mapa}>
      <iframe title={titulo} src={endereco} style={{ border: 0, width: '100%', height: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  mapa: {
    width: '100%',
    height: 280,
    borderRadius: raios.mapa,
    overflow: 'hidden',
  },
});
