import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import CartaoServico from './CartaoServico';
import { cores, espacos, tipografia } from '../config/theme';

// Título + lista horizontal de cards de serviço
export default function SecaoServicos({ titulo, servicos, veterinario, onAgendar }) {
  return (
    <View style={styles.secao}>
      <Text style={styles.titulo}>{titulo}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.lista}
      >
        {servicos.map((servico) => (
          <CartaoServico
            key={servico.id}
            nome={servico.nome}
            descricao={servico.descricao}
            icone={servico.icone}
            veterinario={veterinario}
            onAgendar={() => onAgendar(servico)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  secao: {
    gap: 8,
  },
  titulo: {
    ...tipografia.tituloSecao,
    color: cores.texto,
    marginHorizontal: espacos.margem,
  },
  // paddingVertical deixa espaço para a sombra dos cards não ser cortada
  lista: {
    paddingHorizontal: espacos.margem,
    paddingVertical: 4,
    gap: espacos.entreCards,
  },
});
