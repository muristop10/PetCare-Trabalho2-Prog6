import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import AppNavigator from './src/navigation/AppNavigator';
import { cores, tema } from './src/config/theme';

// Fundo das telas igual ao do Figma (aparece atrás dos cantos arredondados)
const temaNavegacao = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: cores.fundo },
};

export default function App() {
  const [fontesCarregadas] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Espera a fonte Inter carregar antes de mostrar o app
  if (!fontesCarregadas) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={tema}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer theme={temaNavegacao}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
