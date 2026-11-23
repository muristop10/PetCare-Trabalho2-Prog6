import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import Cabecalho from '../components/Cabecalho';
import CartaoProximoAgendamento from '../components/CartaoProximoAgendamento';
import CartaoAtalho from '../components/CartaoAtalho';
import SecaoServicos from '../components/SecaoServicos';
import { proximoAgendamento, servicosEsteticos, servicosVeterinarios } from '../config/dados';
import { cores, espacos, raios, tipografia } from '../config/theme';

export default function InicioScreen({ navigation }) {

  function Agendar(servico) {
    navigation.navigate('Agendar', { servico: servico.nome });
  }

  return (
    <View style={styles.tela}>
      <Cabecalho>
        <View style={styles.linhaTopo}>
          <View style={styles.marca}>
            <Image source={require('../../assets/favicon.png')} style={styles.logo} />
            <Text style={styles.textoMarca}>
              Pet<Text style={styles.textoMarcaDestaque}>Care</Text>
            </Text>
          </View>

          {/* Sino só visual por enquanto */}
          <IconButton
            icon="bell-outline"
            size={20}
            iconColor={cores.superficie}
            containerColor={cores.botaoSinoFundo}
            style={styles.sino}
          />
        </View>

        <Text style={styles.saudacao}>Olá! Como podemos cuidar do seu pet hoje?</Text>
      </Cabecalho>

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <View style={styles.blocoComMargem}>
          <CartaoProximoAgendamento
            agendamento={proximoAgendamento}
            onPress={() => navigation.navigate('Agendamentos')}
          />
        </View>

        <View style={[styles.blocoComMargem, styles.atalhos]}>
          <CartaoAtalho
            icone="plus"
            titulo="Cadastrar pet"
            onPress={() => navigation.navigate('MeusPets', { screen: 'CadastrarPet', initial: false })}
          />
          <CartaoAtalho
            icone="calendar-blank-outline"
            titulo="Ver agendamentos"
            onPress={() => navigation.navigate('Agendamentos')}
          />
        </View>

        <SecaoServicos titulo="Serviços estéticos" servicos={servicosEsteticos} onAgendar={agendar} />

        <SecaoServicos
          titulo="Serviços veterinários"
          servicos={servicosVeterinarios}
          veterinario
          onAgendar={agendar}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  linhaTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: cores.superficie,
    borderRadius: raios.pilula,
    paddingLeft: 6,
    paddingRight: 14,
    paddingVertical: 5,
  },
  logo: {
    width: 28,
    height: 28,
  },
  textoMarca: {
    ...tipografia.marca,
    color: cores.texto,
  },
  textoMarcaDestaque: {
    color: cores.primaria,
  },
  sino: {
    margin: 0,
  },
  saudacao: {
    ...tipografia.saudacao,
    color: cores.superficie,
  },
  conteudo: {
    paddingTop: 12,
    paddingBottom: espacos.margem,
    gap: espacos.entreBlocos,
  },
  blocoComMargem: {
    marginHorizontal: espacos.margem,
  },
  atalhos: {
    flexDirection: 'row',
    gap: espacos.entreCards,
  },
});
