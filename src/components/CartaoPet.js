import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BotaoIcone from './BotaoIcone';
import { calcularIdade } from '../utils/datas';
import { cores, raios, tipografia } from '../config/theme';

// Cores do círculo do avatar, usadas em sequência pela ordem da lista
const coresAvatar = [
  { fundo: cores.primariaSuave, icone: cores.primaria },
  { fundo: cores.amareloSuave, icone: cores.amareloEscuro },
  { fundo: cores.verdeSuave, icone: cores.verdeEscuro },
];

export default function CartaoPet({ pet, posicao, onEditar, onExcluir }) {
  const cor = coresAvatar[posicao % coresAvatar.length];
  // Sem raça, mostra só a espécie
  const especieRaca = pet.raca ? `${pet.especie} · ${pet.raca}` : pet.especie;

  return (
    <Card style={styles.cartao} contentStyle={styles.conteudo}>
      <View style={[styles.avatar, { backgroundColor: cor.fundo }]}>
        <MaterialCommunityIcons name="paw-outline" size={28} color={cor.icone} />
      </View>

      <View style={styles.textos}>
        <Text style={styles.nome}>{pet.nome}</Text>
        <Text style={styles.especie}>{especieRaca}</Text>
        <Text style={styles.detalhes}>
          {pet.sexo} · {calcularIdade(pet.dataNascimento)}
        </Text>
      </View>

      <View style={styles.botoes}>
        <BotaoIcone icone="pencil-outline" onPress={onEditar} />
        <BotaoIcone icone="trash-can-outline" perigo onPress={onExcluir} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cartao: {
    borderRadius: raios.cartao,
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  nome: {
    ...tipografia.nomePet,
    color: cores.texto,
  },
  especie: {
    ...tipografia.corpo,
    color: cores.textoSecundario,
  },
  detalhes: {
    ...tipografia.corpoPequeno,
    color: cores.textoSecundario,
  },
  botoes: {
    gap: 8,
  },
});
