import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Badge, IconButton, Menu, Text } from 'react-native-paper';
import CartaoProximoAgendamento from './CartaoProximoAgendamento';
import { cores, espacos, raios, tipografia } from '../config/theme';

// Sino do topo da Início. Ao tocar, abre (ou fecha) o menu com as notificações.
// Por enquanto só mostra o próximo agendamento; depois entram vacinas e serviços pendentes.
export default function MenuNotificacoes({ agendamento, onAbrirAgendamento }) {
  const [aberto, setAberto] = useState(false);
  // O menu ocupa a largura da tela menos as margens do cabeçalho
  const { width } = useWindowDimensions();
  const quantidade = agendamento ? 1 : 0;

  function abrirAgendamento() {
    setAberto(false);
    onAbrirAgendamento();
  }

  return (
    <Menu
      visible={aberto}
      onDismiss={() => setAberto(false)}
      // Anima ao abrir, mas fecha na hora (senão o menu ainda aparece na próxima tela)
      theme={{ animation: { scale: aberto ? 1 : 0 } }}
      anchorPosition="bottom"
      contentStyle={[styles.menu, { width: width - espacos.margemCabecalho * 2 }]}
      anchor={
        <View>
          <IconButton
            icon={aberto ? 'bell' : 'bell-outline'}
            size={20}
            iconColor={cores.superficie}
            containerColor={cores.botaoSinoFundo}
            onPress={() => setAberto(!aberto)}
            style={styles.sino}
          />
          {quantidade > 0 && (
            <Badge size={16} style={styles.contador}>
              {quantidade}
            </Badge>
          )}
        </View>
      }
    >
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Notificações</Text>

        {agendamento && (
          <CartaoProximoAgendamento agendamento={agendamento} onPress={abrirAgendamento} />
        )}
      </View>
    </Menu>
  );
}

const styles = StyleSheet.create({
  sino: {
    margin: 0,
  },
  // Bolinha com o número de notificações, no canto do sino
  contador: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: cores.destaque,
    color: cores.texto,
  },
  menu: {
    backgroundColor: cores.superficie,
    borderRadius: raios.cartao,
    paddingVertical: 0,
  },
  conteudo: {
    padding: 16,
    gap: espacos.entreCards,
  },
  titulo: {
    ...tipografia.nomePet,
    color: cores.texto,
  },
});
