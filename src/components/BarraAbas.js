import { StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import { cores, raios, sombras, tipografia } from '../config/theme';

// Barra de abas do Paper usada no lugar da barra padrão do React Navigation
// (é ela que tem o indicador em formato de pílula, como no Figma).
export default function BarraAbas({ navigation, state, descriptors, insets }) {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      style={styles.barra}
      activeColor={cores.primaria}
      inactiveColor={cores.textoSecundario}
      activeIndicatorStyle={styles.indicador}
      onTabPress={({ route, preventDefault }) => {
        const evento = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (evento.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({ route, focused, color }) =>
        descriptors[route.key].options.tabBarIcon({ focused, color, size: 22 })
      }
      getLabelText={({ route }) => descriptors[route.key].options.title}
      renderLabel={({ route, color }) => (
        <Text style={[styles.rotulo, { color }]} numberOfLines={1}>
          {descriptors[route.key].options.title}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: cores.superficie,
    borderTopLeftRadius: raios.barraAbas,
    borderTopRightRadius: raios.barraAbas,
    ...sombras.navegacao,
  },
  indicador: {
    width: 56,
    height: 28,
    borderRadius: raios.indicadorAba,
  },
  rotulo: {
    ...tipografia.rotuloAba,
    textAlign: 'center',
  },
});
