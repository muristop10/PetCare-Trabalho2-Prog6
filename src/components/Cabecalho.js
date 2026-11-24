import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cores, espacos, raios, tipografia } from '../config/theme';

// Faixa azul do topo.
// Telas internas usam titulo/subtitulo (e onVoltar para mostrar a seta).
// A Início monta o próprio conteúdo (logo, sino, saudação) com children.
export default function Cabecalho({ titulo, subtitulo, onVoltar, children }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.cabecalho, { paddingTop: insets.top + 2 }]}>
      {titulo && (
        <View style={styles.linhaTitulo}>
          {onVoltar && (
            <IconButton
              icon="chevron-left"
              size={28}
              iconColor={cores.superficie}
              onPress={onVoltar}
              style={styles.voltar}
            />
          )}
          <Text style={styles.titulo}>{titulo}</Text>
        </View>
      )}

      {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}

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
  linhaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  voltar: {
    margin: 0,
    marginLeft: -10, // alinha a seta com o subtítulo
    width: 36,
    height: 36,
  },
  titulo: {
    ...tipografia.tituloCabecalho,
    color: cores.superficie,
  },
  subtitulo: {
    ...tipografia.corpoPequeno,
    color: cores.superficie,
  },
});
