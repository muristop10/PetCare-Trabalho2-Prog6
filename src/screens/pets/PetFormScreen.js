import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePreventRemove } from '@react-navigation/native';
import Cabecalho from '../../components/Cabecalho';
import CampoTexto from '../../components/CampoTexto';
import CampoOpcoes from '../../components/CampoOpcoes';
import BotaoGrande from '../../components/BotaoGrande';
import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import { especies, sexos } from '../../config/dados';
import { dataNascimentoValida, mascararData } from '../../utils/datas';
import { cores, espacos, tipografia } from '../../config/theme';

const petVazio = { nome: '', especie: '', raca: '', dataNascimento: '', sexo: '' };

// Serve para cadastrar e para editar: se vier um pet nos parâmetros da rota, é edição
export default function PetFormScreen({ navigation, route, onAdicionar, onEditar }) {
  const petOriginal = route.params?.pet ?? petVazio;
  const editando = Boolean(route.params?.pet);

  const [nome, setNome] = useState(petOriginal.nome);
  const [especie, setEspecie] = useState(petOriginal.especie);
  const [raca, setRaca] = useState(petOriginal.raca);
  const [dataNascimento, setDataNascimento] = useState(petOriginal.dataNascimento);
  const [sexo, setSexo] = useState(petOriginal.sexo);
  const [salvo, setSalvo] = useState(false);
  const [salvando, setSalvando] = useState(false);
  // Ação de sair que ficou esperando a resposta do modal (null = modal fechado)
  const [saidaPendente, setSaidaPendente] = useState(null);

  const alterado =
    nome !== petOriginal.nome ||
    especie !== petOriginal.especie ||
    raca !== petOriginal.raca ||
    dataNascimento !== petOriginal.dataNascimento ||
    sexo !== petOriginal.sexo;

  const podeSalvar = nome.trim() !== '' && especie !== '' && sexo !== '' && dataNascimentoValida(dataNascimento);

  // Segura qualquer saída da tela (seta, Cancelar, voltar do Android) se houver algo alterado
  usePreventRemove(alterado && !salvo, ({ data }) => {
    setSaidaPendente(data.action);
  });

  // Depois de salvar, espera a tela atualizar (sem o bloqueio acima) e volta para a lista
  useEffect(() => {
    if (salvo) {
      navigation.goBack();
    }
  }, [salvo, navigation]);

  // Grava no Firebase e só volta para a lista se deu certo (se falhar, o AppNavigator mostra o erro)
  async function salvar() {
    const pet = { nome: nome.trim(), especie, raca: raca.trim(), dataNascimento, sexo };

    setSalvando(true);
    const deuCerto = editando ? await onEditar({ ...pet, id: petOriginal.id }) : await onAdicionar(pet);
    setSalvando(false);

    if (deuCerto) {
      setSalvo(true);
    }
  }

  function sairSemSalvar() {
    navigation.dispatch(saidaPendente);
    setSaidaPendente(null);
  }

  return (
    <View style={styles.tela}>
      <Cabecalho
        titulo={editando ? 'Editar pet' : 'Cadastrar pet'}
        subtitulo="Preencha os dados do seu pet"
        onVoltar={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Foto só visual por enquanto (o envio virá com o Cloudinary) */}
        <View style={styles.foto}>
          <View style={styles.circuloFoto}>
            <MaterialCommunityIcons name="camera-outline" size={28} color={cores.primaria} />
          </View>
          <Text style={styles.textoFoto}>Adicionar foto</Text>
        </View>

        <CampoTexto rotulo="Nome" valor={nome} onChangeText={setNome} placeholder="Ex.: Thor" />

        <CampoOpcoes rotulo="Espécie" opcoes={especies} valor={especie} onChange={setEspecie} />

        <CampoTexto rotulo="Raça" valor={raca} onChangeText={setRaca} placeholder="Ex.: Golden Retriever" />

        <View style={styles.linha}>
          <CampoTexto
            rotulo="Data de nascimento"
            valor={dataNascimento}
            onChangeText={(texto) => setDataNascimento(mascararData(texto))}
            placeholder="DD/MM/AAAA"
            icone="calendar-blank-outline"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.metade}
          />
          <CampoOpcoes
            rotulo="Sexo"
            opcoes={sexos}
            valor={sexo}
            onChange={setSexo}
            esticar
            style={styles.metade}
          />
        </View>

        <View style={styles.linha}>
          <BotaoGrande texto="Cancelar" contorno onPress={() => navigation.goBack()} style={styles.metade} />
          <BotaoGrande
            texto="Salvar pet"
            onPress={salvar}
            disabled={!podeSalvar || salvando}
            carregando={salvando}
            style={styles.metade}
          />
        </View>
      </ScrollView>

      <DialogoConfirmacao
        visivel={saidaPendente !== null}
        titulo="Sair sem salvar?"
        texto="Tem certeza que deseja sair da tela sem salvar o registro?"
        textoConfirmar="Sair"
        onConfirmar={sairSemSalvar}
        onCancelar={() => setSaidaPendente(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    paddingHorizontal: espacos.margem,
    paddingTop: 16,
    paddingBottom: espacos.margem,
    gap: espacos.entreCampos,
  },
  foto: {
    alignItems: 'center',
    gap: 8,
  },
  circuloFoto: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: cores.primaria,
    backgroundColor: cores.primariaSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoFoto: {
    ...tipografia.rotuloBotao,
    color: cores.primaria,
  },
  linha: {
    flexDirection: 'row',
    gap: espacos.entreCards,
  },
  metade: {
    flex: 1,
  },
});
