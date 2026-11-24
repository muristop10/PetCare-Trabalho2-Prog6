import { MD3LightTheme, configureFonts } from 'react-native-paper';

// Cores do Figma (estilos "Cor/...")
export const cores = {
  primaria: '#2B6CB0',
  secundaria: '#63B3ED',
  fundo: '#F5F9FC',
  superficie: '#FFFFFF',
  texto: '#1A2B3C',
  textoSecundario: '#566678',
  destaque: '#F6C945',
  primariaSuave: '#E3F1FC',
  borda: '#D9E4EF',
  perigo: '#C53030',
  perigoSuave: '#FBE1E1',
  botaoSinoFundo: 'rgba(255,255,255,0.18)',
  sobreposicao: 'rgba(0,0,0,0.5)', // fundo escurecido atrás dos modais
  // Pares fundo suave / texto escuro (cards de estatística; depois, selos de status e avatares)
  amareloSuave: '#FDF3CF',
  amareloEscuro: '#7A5700',
  verdeSuave: '#D8F0E2',
  verdeEscuro: '#1E6B43',
  azulSuave: '#DCE9F8',
  azulEscuro: '#1F4F85',
};

// Nomes das fontes carregadas no App.js (cada peso é um arquivo)
export const fontes = {
  regular: 'Inter_400Regular',
  medio: 'Inter_500Medium',
  seminegrito: 'Inter_600SemiBold',
  negrito: 'Inter_700Bold',
};

// Estilos de texto do Figma
export const tipografia = {
  saudacao: { fontFamily: fontes.negrito, fontSize: 20, lineHeight: 26 },
  tituloCabecalho: { fontFamily: fontes.negrito, fontSize: 24, lineHeight: 30 },
  marca: { fontFamily: fontes.negrito, fontSize: 18, letterSpacing: -0.3 },
  tituloSecao: { fontFamily: fontes.seminegrito, fontSize: 18, lineHeight: 24 },
  tituloCartao: { fontFamily: fontes.seminegrito, fontSize: 12, lineHeight: 15 },
  tituloCartaoGrande: { fontFamily: fontes.medio, fontSize: 15, lineHeight: 20 },
  corpoMedio: { fontFamily: fontes.medio, fontSize: 14, lineHeight: 20 },
  sobretitulo: {
    fontFamily: fontes.medio,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.48,
    textTransform: 'uppercase',
  },
  corpo: { fontFamily: fontes.regular, fontSize: 14, lineHeight: 20 },
  corpoPequeno: { fontFamily: fontes.regular, fontSize: 12, lineHeight: 16 },
  tituloModal: { fontFamily: fontes.negrito, fontSize: 18, lineHeight: 24 },
  nomePet: { fontFamily: fontes.seminegrito, fontSize: 16, lineHeight: 22 },
  rotuloChip: { fontFamily: fontes.seminegrito, fontSize: 14, lineHeight: 20 },
  rotuloCampo: { fontFamily: fontes.seminegrito, fontSize: 13, lineHeight: 18 },
  rotuloBotao: { fontFamily: fontes.seminegrito, fontSize: 16, lineHeight: 20 },
  rotuloBotaoPequeno: { fontFamily: fontes.seminegrito, fontSize: 13, lineHeight: 16 },
  rotuloAba: { fontFamily: fontes.medio, fontSize: 11, lineHeight: 14, letterSpacing: -0.22 },
};

export const espacos = {
  margem: 24, // margem lateral do conteúdo
  margemCabecalho: 20,
  entreCards: 12,
  entreBlocos: 10,
  entreSecoes: 24,
  entreCampos: 16, // entre os campos de um formulário
};

export const raios = {
  cabecalho: 28,
  cartaoDestaque: 18,
  cartao: 16,
  cartaoContorno: 6, // card com borda (Sobre os programadores)
  mapa: 12,
  caixaIcone: 12,
  caixaIconeGrande: 14,
  botaoPequeno: 10,
  botao: 16,
  campo: 12,
  modal: 16,
  pilula: 20,
  barraAbas: 20,
  indicadorAba: 14,
};

// Sombra da barra de abas (Sombra/Navegação: #1A2B3C a 8%, 0 -4, blur 16)
export const sombras = {
  navegacao: {
    shadowColor: cores.texto,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 8,
    elevation: 8,
  },
};

export const tema = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: { fontFamily: fontes.regular } }),
  colors: {
    ...MD3LightTheme.colors,
    primary: cores.primaria,
    secondary: cores.secundaria,
    background: cores.fundo,
    surface: cores.superficie,
    onSurface: cores.texto,
    onSurfaceVariant: cores.textoSecundario,
    outline: cores.borda,
    error: cores.perigo,
    secondaryContainer: cores.primariaSuave, // pílula da aba ativa
    shadow: cores.texto, // sombras na cor do texto, como no Figma
    backdrop: cores.sobreposicao, // fundo atrás dos modais
    // O Paper pinta cards e barras elevados com tons de azul; no Figma eles são brancos
    elevation: {
      level0: 'transparent',
      level1: cores.superficie,
      level2: cores.superficie,
      level3: cores.superficie,
      level4: cores.superficie,
      level5: cores.superficie,
    },
  },
};
