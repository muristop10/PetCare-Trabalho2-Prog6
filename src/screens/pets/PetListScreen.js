import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import Cabecalho from '../../components/Cabecalho';
import CartaoPet from '../../components/CartaoPet';
import AvisoAmarelo from '../../components/AvisoAmarelo';
import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import { avisoVacina } from '../../config/dados';
import { cores, espacos, tipografia } from '../../config/theme';

// A lista de pets vem do AppNavigator (pets e onExcluir chegam por props)
export default function PetListScreen({ navigation, pets, onExcluir }) {
  // Pet escolhido na lixeira (null = modal fechado)
  const [petParaExcluir, setPetParaExcluir] = useState(null);

  const contador = pets.length === 1 ? '1 pet cadastrado' : `${pets.length} pets cadastrados`;
  const mostrarAviso = pets.some((pet) => pet.id === avisoVacina.petId);

  function confirmarExclusao() {
    onExcluir(petParaExcluir.id);
    setPetParaExcluir(null);
  }

  return (
    <View style={styles.tela}>
      <Cabecalho
        titulo="Meus Pets"
        subtitulo="Gerencie os pets cadastrados"
        onVoltar={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
        <Text style={styles.contador}>{contador}</Text>

        {pets.map((pet, posicao) => (
          <CartaoPet
            key={pet.id}
            pet={pet}
            posicao={posicao}
            onEditar={() => navigation.navigate('CadastrarPet', { pet })}
            onExcluir={() => setPetParaExcluir(pet)}
          />
        ))}

        {mostrarAviso && (
          <AvisoAmarelo
            texto={avisoVacina.texto}
            onPress={() => navigation.navigate('Agendar', { servico: 'Vacinação' })}
          />
        )}
      </ScrollView>

      <FAB
        icon="plus"
        color={cores.superficie}
        customSize={56}
        style={styles.fab}
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
  fab: {
    position: 'absolute',
    right: espacos.margem,
    bottom: 16,
    borderRadius: 28,
    backgroundColor: cores.primaria,
  },
});
