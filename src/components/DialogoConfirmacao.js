import { StyleSheet, View } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';
import BotaoGrande from './BotaoGrande';
import { cores, espacos, raios, tipografia } from '../config/theme';

// Modal de confirmação: botão vermelho (confirmar) e botão de contorno (Cancelar).
// Usado em "Sair sem salvar?" e "Excluir registro?".
export default function DialogoConfirmacao({ visivel, titulo, texto, textoConfirmar, onConfirmar, onCancelar }) {
  return (
    <Portal>
      <Dialog visible={visivel} onDismiss={onCancelar} style={styles.dialogo}>
        <View style={styles.conteudo}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.texto}>{texto}</Text>

          <View style={styles.botoes}>
            <BotaoGrande texto={textoConfirmar} perigo onPress={onConfirmar} />
            <BotaoGrande texto="Cancelar" contorno onPress={onCancelar} />
          </View>
        </View>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialogo: {
    marginHorizontal: espacos.margem,
    borderRadius: raios.modal,
  },
  // marginTop: 0 tira o espaço que o Dialog do Paper coloca sozinho no primeiro filho
  conteudo: {
    marginTop: 0,
    padding: 24,
  },
  titulo: {
    ...tipografia.tituloModal,
    color: cores.texto,
  },
  texto: {
    ...tipografia.corpo,
    color: cores.textoSecundario,
    marginTop: 12,
  },
  botoes: {
    marginTop: 24,
    gap: 12,
  },
});
