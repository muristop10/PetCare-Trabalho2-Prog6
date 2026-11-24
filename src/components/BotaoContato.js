import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cores, raios, tipografia } from '../config/theme';

// Botão branco com ícone e nome de uma rede social (seção "Mais contatos")
export default function BotaoContato({ nome, icone, onPress }) {
  return (
    <Button
      mode="elevated"
      buttonColor={cores.superficie}
      textColor={cores.primaria}
      // Função no lugar do nome do ícone para poder usar tamanho 24 (o padrão do Paper é menor)
      icon={({ color }) => <MaterialCommunityIcons name={icone} size={24} color={color} />}
      onPress={onPress}
      style={styles.botao}
      contentStyle={styles.conteudo}
      labelStyle={styles.rotulo}
    >
      {nome}
    </Button>
  );
}

const styles = StyleSheet.create({
  botao: {
    flexGrow: 1,
    flexBasis: '40%', // dois botões por linha
    borderRadius: raios.cartao,
  },
  conteudo: {
    height: 52,
  },
  rotulo: {
    ...tipografia.rotuloBotao,
    letterSpacing: 0,
  },
});
