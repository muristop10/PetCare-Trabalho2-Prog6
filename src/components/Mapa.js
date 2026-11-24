import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { raios } from '../config/theme';

// Mapa fixo no endereço, com um pino. Arrastar fica desligado para não brigar
// com a rolagem da tela; o zoom com dois dedos continua funcionando.
export default function Mapa({ latitude, longitude, titulo, descricao }) {
  const regiao = {
    latitude,
    longitude,
    latitudeDelta: 0.01, // quanto menor, mais perto (zoom)
    longitudeDelta: 0.01,
  };

  return (
    // A View arredonda os cantos (o MapView sozinho ignora borderRadius no Android)
    <View style={styles.moldura}>
      <MapView style={styles.mapa} initialRegion={regiao} scrollEnabled={false}>
        <Marker coordinate={{ latitude, longitude }} title={titulo} description={descricao} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  moldura: {
    width: '100%',
    height: 280,
    borderRadius: raios.mapa,
    overflow: 'hidden',
  },
  mapa: {
    flex: 1,
  },
});
