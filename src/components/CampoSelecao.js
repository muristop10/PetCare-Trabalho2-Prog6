import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Menu } from 'react-native-paper';
import CampoTexto from './CampoTexto';
import { cores, fontes, raios } from '../config/theme';

// Campo de seleção (dropdown): parece um CampoTexto com seta e abre um menu ao tocar.
// "opcoes" é uma lista de { valor, texto } (ex.: { valor: 'Thor', texto: 'Thor · Cachorro' }).
export default function CampoSelecao({ rotulo, opcoes, valor, onChange, placeholder }) {
  const [aberto, setAberto] = useState(false);
  // Largura do campo, para o menu abrir com o mesmo tamanho
  const [largura, setLargura] = useState(0);

  const escolhida = opcoes.find((opcao) => opcao.valor === valor);
  // Se a opção não existe mais na lista (ex.: pet excluído), mostra o valor guardado
  const textoMostrado = escolhida ? escolhida.texto : valor;

  function escolher(opcao) {
    onChange(opcao.valor);
    setAberto(false);
  }

  return (
    <Menu
      visible={aberto}
      onDismiss={() => setAberto(false)}
      anchorPosition="bottom"
      contentStyle={[styles.menu, { width: largura }]}
      anchor={
        <Pressable onPress={() => setAberto(true)} onLayout={(e) => setLargura(e.nativeEvent.layout.width)}>
          {/* pointerEvents none: o toque vai para o Pressable, não para a caixa de texto */}
          <View style={styles.semToque}>
            <CampoTexto
              rotulo={rotulo}
              valor={textoMostrado}
              placeholder={placeholder}
              icone="chevron-down"
              editable={false}
            />
          </View>
        </Pressable>
      }
    >
      {opcoes.map((opcao) => (
        <Menu.Item
          key={opcao.valor}
          title={opcao.texto}
          onPress={() => escolher(opcao)}
          style={{ maxWidth: largura }}
          contentStyle={{ maxWidth: largura - 24 }}
          titleStyle={[styles.opcao, opcao.valor === valor && styles.opcaoEscolhida]}
        />
      ))}
    </Menu>
  );
}

const styles = StyleSheet.create({
  semToque: {
    pointerEvents: 'none',
  },
  menu: {
    backgroundColor: cores.superficie,
    borderRadius: raios.campo,
  },
  opcao: {
    fontFamily: fontes.regular,
    fontSize: 14,
    color: cores.texto,
  },
  opcaoEscolhida: {
    fontFamily: fontes.seminegrito,
    color: cores.primaria,
  },
});
