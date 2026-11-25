import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import Cabecalho from '../../components/Cabecalho';
import CartaoPet from '../../components/CartaoPet';
import AvisoAmarelo from '../../components/AvisoAmarelo';
import CampoBusca from '../../components/CampoBusca';
import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import { filtrarPorBusca } from '../../utils/busca';
import { cores, espacos, tipografia } from '../../config/theme';

// A lista de pets vem do AppNavigator (pets, avisoVacina e onExcluir chegam por props)
// erro = true quando não deu para ler os pets do Firebase
export default function PetListScreen({ navigation, pets, erro, avisoVacina, onExcluir }) {
  const [busca, setBusca] = useState('');
  // Pet escolhido na lixeira (null = modal fechado)
  const [petParaExcluir, setPetParaExcluir] = useState(null);

  const petsFiltrados = filtrarPorBusca(pets, busca, ['nome', 'especie', 'raca', 'sexo']);
  const contador = pets.length === 1 ? '1 pet cadastrado' : `${pets.length} pets cadastrados`;

  async function confirmarExclusao() {
    const pet = petParaExcluir;
    setPetParaExcluir(null);
    await onExcluir(pet.id);
  }

  return (
    <View style={styles.tela}>
      <Cabecalho
        titulo="Meus Pets"
        subtitulo="Gerencie os pets cadastrados"
        onVoltar={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <CampoBusca valor={busca} onChangeText={setBusca} placeholder="Buscar por nome, espécie ou raça" />

        <Text style={styles.contador}>{contador}</Text>

        {petsFiltrados.map((pet) => (
          <CartaoPet
            key={pet.id}
            pet={pet}
            // A cor do avatar segue a posição do pet na lista completa (não muda ao buscar)
            posicao={pets.indexOf(pet)}
            onEditar={() => navigation.navigate('CadastrarPet', { pet })}
            onExcluir={() => setPetParaExcluir(pet)}
          />
        ))}

        {erro && <Text style={styles.vazio}>Não foi possível carregar os pets. Verifique a conexão.</Text>}
        {!erro && pets.length === 0 && (
          <Text style={styles.vazio}>Nenhum pet cadastrado ainda. Toque no + para cadastrar.</Text>
        )}
        {pets.length > 0 && petsFiltrados.length === 0 && <Text style={styles.vazio}>Nenhum pet encontrado.</Text>}

        {avisoVacina && (
          <AvisoAmarelo
            texto={avisoVacina}
            onPress={() => navigation.navigate('Agendar', { servico: 'Vacinação' })}
          />
        )}
      </ScrollView>

      <FAB
        icon="plus"
        color={cores.superficie}
        customSize={56}
        style={[styles.fab, erro && styles.fabDesabilitado]}
        disabled={erro}
        onPress={() => navigation.navigate('CadastrarPet')}
      />

      <DialogoConfirmacao
        visivel={petParaExcluir !== null}
        titulo="Excluir registro?"
        texto="Tem certeza de que deseja excluir este pet? Essa ação não pode ser desfeita."
        textoConfirmar="Excluir Pet"
        onConfirmar={confirmarExclusao}
        onCancelar={() => setPetParaExcluir(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  // paddingBottom deixa o último card rolar para cima do botão "+"
  conteudo: {
    paddingHorizontal: espacos.margem,
    paddingTop: 16,
    paddingBottom: 96,
    gap: espacos.entreCards,
  },
  contador: {
    ...tipografia.corpo,
    color: cores.textoSecundario,
  },
  vazio: {
    ...tipografia.corpo,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginTop: espacos.margem,
  },
  fab: {
    position: 'absolute',
    right: espacos.margem,
    bottom: 16,
    borderRadius: 28,
    backgroundColor: cores.primaria,
  },
  fabDesabilitado: {
    backgroundColor: cores.borda,
  },
});
