import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { cores, fontes, raios } from '../config/theme';

// Campo de busca no topo das listagens (Meus Pets e Agendamentos)
export default function CampoBusca({ valor, onChangeText, placeholder }) {
  return (
    <Searchbar
      value={valor}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={cores.textoSecundario}
      iconColor={cores.textoSecundario}
      elevation={0}
      style={styles.campo}
      inputStyle={styles.texto}
    />
  );
}

const styles = StyleSheet.create({
  campo: {
    height: 48,
    backgroundColor: cores.superficie,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.campo,
  },
  texto: {
    minHeight: 0,
    fontFamily: fontes.regular,
    fontSize: 14,
    color: cores.texto,
  },
});
