import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import CaixaIcone from './CaixaIcone';
import { cores, raios, tipografia } from '../config/theme';

// Card de um serviço com o botão "Agendar".
// Serviços veterinários usam o quadrado do ícone azul escuro com ícone branco.
export default function CartaoServico({ nome, descricao, icone, veterinario, onAgendar }) {
  return (
    <Card style={styles.cartao} contentStyle={styles.conteudo}>
      <CaixaIcone
        icone={icone}
        tamanho={36}
        tamanhoIcone={22}
        corFundo={veterinario ? cores.primaria : cores.primariaSuave}
        corIcone={veterinario ? cores.superficie : cores.primaria}
      />

      <View style={styles.textos}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>

      <Button
        mode="contained"
        onPress={onAgendar}
        style={styles.botao}
        contentStyle={styles.botaoConteudo}
        labelStyle={styles.botaoRotulo}
      >
        Agendar
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  cartao: {
    width: 156,
    borderRadius: raios.cartao,
  },
  conteudo: {
    flexGrow: 1,
    padding: 12,
    gap: 6,
  },
  // flex: 1 empurra o botão para baixo quando a descrição é mais curta
  textos: {
    flex: 1,
    gap: 2,
  },
  nome: {
    ...tipografia.tituloCartao,
    color: cores.texto,
  },
  descricao: {
    ...tipografia.corpoPequeno,
    color: cores.textoSecundario,
  },
  botao: {
    borderRadius: raios.botaoPequeno,
  },
  botaoConteudo: {
    height: 34,
  },
  botaoRotulo: {
    ...tipografia.rotuloBotaoPequeno,
    marginVertical: 0,
    marginHorizontal: 0,
    letterSpacing: 0,
  },
});
