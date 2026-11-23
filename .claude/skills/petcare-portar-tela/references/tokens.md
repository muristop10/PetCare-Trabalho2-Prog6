# Tokens do PetCare

Fontes dos valores:
- **[Figma]** = confirmado numa chamada ao Figma no frame "1 - Início" (node `8:195`). Nome dos estilos do Figma entre parênteses.
- **[print]** = medido nos prints antigos enviados pelo usuário (frame de 390 × 844, exportado em 3x). Podem estar desatualizados.
- `~` = aproximado. Valores sem `[Figma]` podem mudar quando uma tela for portada com o Figma ou com print novo.

Fonte: **Inter** (decidido; instalar `@expo-google-fonts/inter` e carregar com `useFonts` no `App.js`).

## O Figma é a fonte da verdade (decidido pelo usuário)

Os prints enviados antes estão **desatualizados** (ex.: o nome no card amarelo era "Thor" e no Figma é "Teodor"; títulos de card e rótulo de botão tinham tamanhos maiores). Por isso:
- Onde houver valor `[Figma]`, ele vale. O print só serve de apoio visual.
- Valores `[print]` e `~` são **provisórios**: confirme com um print atual ou com o Figma (Modo B) antes de usar numa tela nova.
- Em conflito entre print e este arquivo, vale este arquivo (se for `[Figma]`); se o valor for só `[print]`, pergunte.

## Cores [Figma]

| Token | Valor | Estilo no Figma | Onde aparece |
|---|---|---|---|
| `primaria` | `#2B6CB0` | Cor/Primária | cabeçalho, botões, aba/chip selecionado, ícones, FAB, links |
| `fundo` | `#F5F9FC` | Cor/Fundo | fundo das telas |
| `superficie` | `#FFFFFF` | Cor/Branco | cards, inputs, barra de abas, modal |
| `texto` | `#1A2B3C` | Cor/Texto | títulos e textos principais; indicador da home |
| `textoSecundario` | `#566678` | Cor/Texto Suave | descrições, abas inativas |
| `destaque` | `#F6C945` | Cor/Destaque | card "Próximo agendamento", borda do aviso |
| `primariaSuave` | `#E3F1FC` | Cor/Azul Claro | fundo de ícones, pílula da aba ativa, seletor Serviços/Consultas, círculo da foto, botão editar |
| `botaoSinoFundo` | `rgba(255,255,255,0.18)` | | botão do sino |

Cores [print] (ainda não vistas no Figma):

| Token | Valor | Onde aparece |
|---|---|---|
| `secundaria` | `#63B3ED` | da paleta escolhida; não aparece nos prints |
| `borda` | `#D9E4EF` | borda de inputs e chips, divisor dos cards |
| `perigo` / `perigoSuave` | `#C53030` / `#FBE1E1` | botão Sair/Excluir, lixeira |
| `sobreposicao` | `rgba(0,0,0,0.5)` | fundo atrás dos modais |

Status de agendamento [print] (fundo do selo = cor da borda do card):

| Status | Fundo | Texto/ponto |
|---|---|---|
| Pendente | `#FDF3CF` | `#7A5700` |
| Confirmado | `#D8F0E2` | `#1E6B43` |
| Concluído | `#DCE9F8` | `#1F4F85` |
| Cancelado | `#FBE1E1` | `#A12E2E` |

Avatares de pet [print] (círculo / ícone): azul `#E3F1FC` / `#2B6CB0`; amarelo `#FDF3CF` / `#7A5700`; verde `#D8F0E2` / `#1E6B43`. Regra de qual pet recebe qual cor: perguntar.
Aviso amarelo (Meus Pets) [print]: fundo `#FDF3CF`, borda `#F6C945` ~, texto/ícone `#7A5700`.

## Sombras [Figma] (cor `#1A2B3C` com 8% de opacidade)

| Uso | Offset | Blur (Figma/CSS) |
|---|---|---|
| Card amarelo (Sombra/Cartão) | 0, 4 | 16 |
| Cards de serviço e atalhos | 0, 4 | 8 |
| Barra de abas (Sombra/Navegação) | 0, -4 | 16 |

No React Native: iOS usa `shadowColor`, `shadowOpacity: 0.08`, `shadowOffset`, `shadowRadius` (≈ metade do blur); Android usa `elevation` (valor baixo, 2 a 4, ajustar olhando o resultado). Em componente do Paper (`Surface`, `Card`) use `elevation` e ajuste com `style`.

## Raios [Figma]

Cabeçalho (cantos de baixo) **28**; card amarelo **18**; cards de serviço e atalhos **16**; caixa de ícone **12** (36 e 32) e **14** (48, no card amarelo); botão pequeno "Agendar" **10**; pílula da marca **20**; botão do sino **18** (círculo de 36); pílula do indicador da aba **14** (56 × 28); barra de abas (cantos de cima) **20**.
Raios [print], `~`: botão grande 16, input 12, chip e selo em pílula, modal 16.

## Espaçamento e medidas (dp) [Figma, tela Início]

- Margem lateral do conteúdo: **24**; dentro do cabeçalho: **20**.
- Cabeçalho: barra de status 44 (do sistema, não desenhar) + bloco de texto (padding topo 2, base 14, lado 20, espaço entre linhas 8) = **158**. Nas demais telas o cabeçalho tem **124** [print].
- Conteúdo: padding de topo 12, espaço entre blocos 10. Seção: título + 8 + carrossel. Carrossel: espaço entre cards 12, rolagem horizontal, margem esquerda 24.
- Card de serviço: largura **156**, padding 12, espaço interno 6; caixa de ícone 36 (ícone 22); textos com espaço 2; botão "Agendar" de largura total, altura **34**.
- Card amarelo: padding 14, espaço 12, caixa de ícone branca 48 (ícone 24), seta 22.
- Atalhos (Cadastrar pet / Ver agendamentos): 2 cards lado a lado com espaço 12, padding 12 × 10, espaço interno 10, caixa de ícone 32 (ícone 20).
- Pílula da marca: padding `6 / 14 / 5` (esq / dir / vertical), logo 28, espaço 8. Sino: 36 (ícone 20).
- Barra de abas: altura **84**, padding topo 8 e base 22, 5 itens iguais (flex 1), espaço entre indicador e rótulo 4, indicador **56 × 28** (ícone 22). Item ativo: indicador `primariaSuave`, ícone e rótulo `primaria`; inativos: rótulo `textoSecundario`. O traço escuro no rodapé (indicador da home) é do sistema: não desenhar.

Medidas [print], `~` (telas ainda não conferidas no Figma): botão grande altura 52; input ~48; área de observações ~86; seletor Serviços/Consultas 48 com item de 40; chip 36; selo de status 26; caixa de ícone 44 (Agendamentos); botões editar/lixeira 36 × 36; avatar 60; círculo da foto 84 (borda tracejada); FAB 56; card de pet ~108; card de agendamento ~126; modal com largura = tela − 48 e padding ~24.

## Tipografia (Inter)

[Figma] (nome do estilo: tamanho / altura de linha / peso):

| Papel | Estilo | Tamanho / linha | Peso | Extra |
|---|---|---|---|---|
| Saudação do cabeçalho | Display/Saudação | 20 / 26 | bold | |
| Marca "PetCare" | | 18 | bold | `letterSpacing -0.3` |
| Título de seção | Título/H2 | 18 / 24 | semibold | |
| Título de card / linha do card amarelo | Título/H3 | 12 / 15 | semibold | |
| Data do card amarelo | Corpo/Medium | 14 / 20 | medium | |
| "PRÓXIMO AGENDAMENTO" | | 12 / 16 | medium | maiúsculas, `letterSpacing 0.48` |
| Descrição de card | Corpo/Pequeno | 12 / 16 | regular | |
| Rótulo de atalho / campo | Rótulo/Campo | 13 / 18 | semibold | |
| Botão pequeno | Rótulo/Botão Pequeno | 13 / 16 | semibold | |
| Rótulo da aba | Rótulo/Nav | 11 / 14 | medium | `letterSpacing -0.22` (-2%) |

[print], `~` (papéis ainda não conferidos no Figma): título do cabeçalho 24 bold; subtítulo 14 regular; texto de input 14; selo de status 12 semibold; botão grande 15 a 16 semibold; título do modal 18 bold; texto do modal 14.

## Ícones (no Figma são SVGs de traço fino; decidido usar MaterialCommunityIcons)

Início `home-outline`, Agendamentos `calendar-blank-outline`, Meus Pets `paw-outline`, Agendar `calendar-plus`, Sobre `information-outline`; sino `bell-outline`; voltar `chevron-left`; editar `pencil-outline`; lixeira `trash-can-outline`; câmera `camera-outline`; relógio `clock-outline`; calendário `calendar-blank-outline`; setas `chevron-right`/`chevron-down`; Banho `water-outline`; Tosa `content-cut`; Banho e tosa `shimmer` (brilhos); Higienização `spray-bottle`; Consulta `stethoscope`; Vacinação `needle`; Exames `flask-outline`. Se o usuário exportar os SVGs do Figma, isso exigiria `react-native-svg` (dependência não aprovada: perguntar).

## Tema do Paper (ponto de partida para `src/config/theme.js`)

```js
import { MD3LightTheme } from 'react-native-paper';

export const cores = {
  primaria: '#2B6CB0', secundaria: '#63B3ED', fundo: '#F5F9FC', superficie: '#FFFFFF',
  texto: '#1A2B3C', textoSecundario: '#566678', destaque: '#F6C945',
  primariaSuave: '#E3F1FC', borda: '#D9E4EF', perigo: '#C53030', perigoSuave: '#FBE1E1',
};

export const espacos = { margem: 24, margemCabecalho: 20, entreCards: 12 };

export const tema = {
  ...MD3LightTheme,
  roundness: 4, // multiplicador do Paper; ajustar nos componentes quando o raio do Figma for maior
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
  },
};
```
