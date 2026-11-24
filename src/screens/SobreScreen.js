import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Cabecalho from '../components/Cabecalho';
import CartaoEstatistica from '../components/CartaoEstatistica';
import ColunaProgramador from '../components/ColunaProgramador';
import Mapa from '../components/Mapa';
import BotaoContato from '../components/BotaoContato';
import { contatos, empresa, estatisticas, programadores } from '../config/dados';
import { cores, espacos, raios, tipografia } from '../config/theme';

// Linhas com seta da seção "Onde estamos" (só texto por enquanto).
// "destaque" deixa o texto azul; o horário fica na cor normal, como no Figma.
const linhasEndereco = [
  { id: 'endereco', texto: `Endereço: ${empresa.endereco}`, destaque: true },
  { id: 'horario', texto: empresa.horario, destaque: false },
  { id: 'telefone', texto: `Telefone: ${empresa.telefone}`, destaque: true },
  { id: 'email', texto: `Email para contato: ${empresa.email}`, destaque: true },
];

export default function SobreScreen({ navigation }) {
  return (
    <View style={styles.tela}>
      <Cabecalho
        titulo="Sobre"
        subtitulo="Conheça sobre a PetCare, e sobre quem criou o app"
        onVoltar={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        {/* Nossa história */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Nossa história</Text>

          <Card style={styles.cartao} contentStyle={styles.cartaoConteudo}>
            <View style={styles.empresa}>
              <Image source={require('../../assets/favicon.png')} style={styles.logo} />
              <View style={styles.empresaTextos}>
                <Text style={styles.empresaNome}>{empresa.nome}</Text>
                <Text style={styles.empresaEndereco}>{empresa.endereco}</Text>
              </View>
            </View>

            <Text style={styles.paragrafo}>{empresa.historia}</Text>

            <View style={styles.estatisticas}>
              {estatisticas.map((item) => (
                <CartaoEstatistica key={item.id} texto={item.texto} cor={item.cor} />
              ))}
            </View>
          </Card>
        </View>

        {/* Sobre os programadores */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Sobre os programadores</Text>

          <Card mode="outlined" style={styles.cartaoContorno} contentStyle={styles.programadores}>
            {programadores.map((pessoa) => (
              <ColunaProgramador key={pessoa.id} foto={pessoa.foto} itens={pessoa.itens} />
            ))}
          </Card>
        </View>

        {/* Onde estamos */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Onde estamos</Text>

          <Card style={styles.cartao} contentStyle={styles.cartaoConteudo}>
            <Mapa
              latitude={empresa.latitude}
              longitude={empresa.longitude}
              titulo={empresa.nome}
              descricao={empresa.endereco}
            />

            <View style={styles.linhas}>
              {linhasEndereco.map((linha) => {
                const cor = linha.destaque ? cores.primaria : cores.texto;
                return (
                  <View key={linha.id} style={styles.linha}>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={cor} />
                    <Text style={[styles.linhaTexto, { color: cor }]}>{linha.texto}</Text>
                  </View>
                );
              })}
            </View>
          </Card>
        </View>

        {/* Mais contatos (botões sem link por enquanto) */}
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Mais contatos</Text>

          <View style={styles.contatos}>
            {contatos.map((contato) => (
              <BotaoContato key={contato.id} nome={contato.nome} icone={contato.icone} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: espacos.margem,
    gap: espacos.entreSecoes,
  },
  secao: {
    gap: 12,
  },
  tituloSecao: {
    ...tipografia.tituloSecao,
    color: cores.texto,
  },
  cartao: {
    borderRadius: raios.cartao,
  },
  cartaoConteudo: {
    padding: 16,
    gap: 12,
  },
  empresa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
  },
  empresaTextos: {
    flex: 1,
  },
  empresaNome: {
    ...tipografia.tituloCartaoGrande,
    color: cores.texto,
  },
  empresaEndereco: {
    ...tipografia.corpoPequeno,
    color: cores.textoSecundario,
  },
  paragrafo: {
    ...tipografia.corpoPequeno,
    color: cores.texto,
  },
  estatisticas: {
    flexDirection: 'row',
    gap: espacos.entreCards,
    marginTop: 4,
  },
  cartaoContorno: {
    borderRadius: raios.cartaoContorno,
  },
  programadores: {
    flexDirection: 'row',
    padding: 14,
    gap: 16,
  },
  linhas: {
    gap: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  linhaTexto: {
    ...tipografia.corpoMedio,
    flex: 1,
  },
  contatos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espacos.entreCards,
  },
});
