import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cores, raios } from '../config/theme';

// Quadrado arredondado com um ícone no meio (usado nos cards)
export default function CaixaIcone({
  icone,
  tamanho,
  tamanhoIcone,
  raio = raios.caixaIcone,
  corFundo = cores.primariaSuave,
  corIcone = cores.primaria,
}) {
  return (
    <View
      style={[
        styles.caixa,
        { width: tamanho, height: tamanho, borderRadius: raio, backgroundColor: corFundo },
      ]}
    >
      <MaterialCommunityIcons name={icone} size={tamanhoIcone} color={corIcone} />
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
