import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { cores, fontes, raios, tipografia } from '../config/theme';

// Foto + lista de informações de um programador.
// O último item (papel no projeto) aparece em destaque azul.
export default function ColunaProgramador({ foto, itens }) {
  return (
    <View style={styles.coluna}>
      <Image source={foto} style={styles.foto} />

      {itens.map((item, indice) => {
        const ultimo = indice === itens.length - 1;
        return (
          <Text key={item} style={[styles.item, ultimo && styles.itemDestaque]}>
            {'•  '}
            {item}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  coluna: {
    flex: 1,
  },
  foto: {
    width: '100%',
    aspectRatio: 144 / 167, // proporção da foto no Figma
    borderRadius: raios.cartao,
    backgroundColor: cores.primariaSuave, // aparece enquanto a foto carrega
    marginBottom: 12,
  },
  item: {
    ...tipografia.corpoPequeno,
    color: cores.texto,
  },
  itemDestaque: {
    fontFamily: fontes.medio,
    color: cores.primaria,
  },
});
