import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { usePreventRemove } from '@react-navigation/native';
import Cabecalho from '../../components/Cabecalho';
import CampoSelecao from '../../components/CampoSelecao';
import CampoTexto from '../../components/CampoTexto';
import BotaoGrande from '../../components/BotaoGrande';
import DialogoConfirmacao from '../../components/DialogoConfirmacao';
import { servicosEsteticos, servicosVeterinarios } from '../../config/dados';
import { erroDataAgendamento, erroHora, mascararData, mascararHora } from '../../utils/datas';
import { ehVeterinario } from '../../utils/servicos';
import { cores, espacos, raios, tipografia } from '../../config/theme';

const agendamentoVazio = { pet: '', servico: '', data: '', hora: '', observacoes: '' };

// "servicos" ou "consultas", conforme o serviço escolhido
function tipoDoServico(servico) {
  return ehVeterinario(servico) ? 'consultas' : 'servicos';
}

// Serve para agendar (aba Agendar) e para editar (aberta pelo lápis em Agendamentos):
// se vier um agendamento nos parâmetros da rota, é edição
export default function AgendamentoFormScreen({ navigation, route, pets, onAdicionar, onEditar }) {
  const original = route.params?.agendamento ?? agendamentoVazio;
  const editando = Boolean(route.params?.agendamento);

  const [tipo, setTipo] = useState(tipoDoServico(original.servico));
  const [pet, setPet] = useState(original.pet);
  const [servico, setServico] = useState(original.servico);
  const [data, setData] = useState(original.data);
  const [hora, setHora] = useState(original.hora);
  const [observacoes, setObservacoes] = useState(original.observacoes);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [salvando, setSalvando] = useState(false);
  // Fica true quando a pessoa confirmou que quer sair (libera a saída da tela)
  const [saindo, setSaindo] = useState(false);

  const alterado =
    pet !== original.pet ||
    servico !== original.servico ||
    data !== original.data ||
    hora !== original.hora ||
    observacoes !== original.observacoes;

  const erroData = erroDataAgendamento(data);
  const erroHorario = erroHora(hora);
  const podeConfirmar =
    pet !== '' &&
    servico !== '' &&
    data.length === 10 &&
    erroData === '' &&
    hora.length === 5 &&
    erroHorario === '';

  const opcoesPets = pets.map((item) => ({ valor: item.nome, texto: `${item.nome} · ${item.especie}` }));
  const listaServicos = tipo === 'consultas' ? servicosVeterinarios : servicosEsteticos;
  const opcoesServicos = listaServicos.map((item) => ({ valor: item.nome, texto: item.nome }));

  // Serviço escolhido num card da Início ou no aviso de vacina de Meus Pets
  const servicoRecebido = route.params?.servico;
  useEffect(() => {
    if (servicoRecebido) {
      setTipo(tipoDoServico(servicoRecebido));
      setServico(servicoRecebido);
      // Limpa o parâmetro para ele não voltar a ser aplicado na próxima visita à aba
      navigation.setParams({ servico: undefined });
    }
  }, [servicoRecebido, navigation]);

  // Na edição, segura o voltar do Android se houver algo alterado
  usePreventRemove(alterado && !saindo, () => setMostrarModal(true));

  // Depois de confirmar a saída (ou salvar a edição), limpa o formulário e volta
  useEffect(() => {
    if (saindo) {
      limpar();
      setSaindo(false);
      navigation.goBack();
    }
  }, [saindo]);

  function limpar() {
    setTipo(tipoDoServico(original.servico));
    setPet(original.pet);
    setServico(original.servico);
    setData(original.data);
    setHora(original.hora);
    setObservacoes(original.observacoes);
  }

  function trocarTipo(novoTipo) {
    if (novoTipo !== tipo) {
      setTipo(novoTipo);
      setServico(''); // o serviço escolhido não existe na outra lista
    }
  }

  // Seta de voltar e Cancelar
  function sair() {
    if (alterado) {
      setMostrarModal(true);
    } else {
      navigation.goBack();
    }
  }

  function confirmarSaida() {
    setMostrarModal(false);
    setSaindo(true);
  }

  // Grava no Firebase e só sai da tela se deu certo (se falhar, o AppNavigator mostra o erro)
  async function confirmar() {
    const dados = { pet, servico, data, hora, observacoes: observacoes.trim() };

    setSalvando(true);
    // Na edição mantém o id e o status do agendamento original
    const deuCerto = editando ? await onEditar({ ...original, ...dados }) : await onAdicionar(dados);
    setSalvando(false);

    if (!deuCerto) return;

    if (editando) {
      setSaindo(true);
    } else {
      limpar();
      navigation.navigate('Agendamentos', { screen: 'ListaAgendamentos' });
    }
  }

  // Cada opção do seletor Serviços / Consultas
  function opcaoSeletor(valor, rotulo) {
    return {
      value: valor,
      label: rotulo,
      checkedColor: cores.superficie,
      uncheckedColor: cores.textoSecundario,
      style: [styles.itemSeletor, tipo === valor && styles.itemSeletorAtivo],
      labelStyle: styles.rotuloSeletor,
    };
  }

  return (
    <View style={styles.tela}>
      <Cabecalho
        titulo={editando ? 'Editar agendamento' : 'Agendar'}
        subtitulo={editando ? 'Altere os dados do agendamento' : 'Marque um serviço ou consulta para seu pet'}
        onVoltar={sair}
      />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SegmentedButtons
          value={tipo}
          onValueChange={trocarTipo}
          style={styles.seletor}
          buttons={[opcaoSeletor('servicos', 'Serviços'), opcaoSeletor('consultas', 'Consultas')]}
        />

        <CampoSelecao
          rotulo="Escolher pet"
          opcoes={opcoesPets}
          valor={pet}
          onChange={setPet}
          placeholder="Selecione o pet"
        />

        <CampoSelecao
          rotulo="Serviço"
          opcoes={opcoesServicos}
          valor={servico}
          onChange={setServico}
          placeholder="Selecione o serviço"
        />

        <View style={styles.linha}>
          <CampoTexto
            rotulo="Data"
            valor={data}
            onChangeText={(texto) => setData(mascararData(texto))}
            placeholder="DD/MM/AAAA"
            icone="calendar-blank-outline"
            keyboardType="number-pad"
            maxLength={10}
            erro={erroData}
            style={styles.metade}
          />
          <CampoTexto
            rotulo="Horário"
            valor={hora}
            onChangeText={(texto) => setHora(mascararHora(texto))}
            placeholder="HH:MM"
            icone="clock-outline"
            keyboardType="number-pad"
            maxLength={5}
            erro={erroHorario}
            style={styles.metade}
          />
        </View>

        <CampoTexto
          rotulo="Observações (opcional)"
          valor={observacoes}
          onChangeText={setObservacoes}
          placeholder="Ex.: meu pet tem alergia a alguns shampoos"
          multiline
        />

        <View style={styles.botoes}>
          <BotaoGrande
            texto={editando ? 'Salvar alterações' : 'Confirmar agendamento'}
            onPress={confirmar}
            disabled={!podeConfirmar || salvando}
            carregando={salvando}
          />
          <BotaoGrande texto="Cancelar" contorno onPress={sair} />
        </View>
      </ScrollView>

      <DialogoConfirmacao
        visivel={mostrarModal}
        titulo="Sair sem salvar?"
        texto="Tem certeza que deseja sair da tela sem salvar o registro?"
        textoConfirmar="Sair"
        onConfirmar={confirmarSaida}
        onCancelar={() => setMostrarModal(false)}
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
  // Fundo azul claro em volta das duas opções (48 de altura no total)
  seletor: {
    backgroundColor: cores.primariaSuave,
    borderRadius: 14,
    padding: 4,
  },
  itemSeletor: {
    height: 40,
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: raios.botaoPequeno,
    backgroundColor: 'transparent',
  },
  itemSeletorAtivo: {
    backgroundColor: cores.primaria,
  },
  rotuloSeletor: {
    ...tipografia.rotuloChip,
  },
  // Data e Horário lado a lado; alignItems evita que um campo estique quando o outro mostra erro
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: espacos.entreCards,
  },
  metade: {
    flex: 1,
  },
  botoes: {
    gap: espacos.entreCards,
  },
});
