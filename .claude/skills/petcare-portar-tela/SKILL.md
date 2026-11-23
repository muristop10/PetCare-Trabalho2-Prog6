---
name: petcare-portar-tela
description: Porta para React Native (Expo, rodando no Snack) as telas do app PetCare que estão no Figma, reaproveitando componentes e tokens, fazendo perguntas antes de implementar e gastando o mínimo de chamadas do MCP do Figma. Use SEMPRE que o usuário pedir para portar, implementar, converter, criar ou ajustar uma tela, modal ou componente do PetCare a partir do Figma ou de um print, mesmo que ele só diga "porta a tela de Agendar", "faz essa tela" ou mande um print do app. Cobre as telas Início, Agendamentos, Meus Pets (cadastrar, sair sem salvar, excluir), Agendar e Sobre. Nunca cria nada no Figma.
---

# Portar telas do PetCare (Figma → React Native)

Projeto escolar (ensino médio técnico). O objetivo é código **simples**, **fiel ao Figma** e **sem poluição**.
Figma: https://www.figma.com/design/1pm6qe6dJz5OfEY9CfJgHg/PetCare---App-Mobile (file key `1pm6qe6dJz5OfEY9CfJgHg`)

Leia sempre antes de começar:
- `references/tokens.md`: cores, espaçamentos, raios, sombras, tipografia (já levantados do Figma e dos prints, para não chamar o Figma por causa deles)
- `references/telas.md`: inventário de cada tela, componentes compartilhados, textos e perguntas já conhecidas
- Os prints das telas **não** ficam na skill: procure em `assets/screenshots/` do projeto ou use o que o usuário enviar na conversa (o da conversa tem prioridade). Prints antigos podem estar desatualizados: no Modo A, pergunte uma vez se o print é da versão atual do Figma.

## Regras inegociáveis

1. **Componentizar e reutilizar.** Antes de criar qualquer coisa, procure no projeto (`src/components`, `src/config`, `src/navigation`, `src/screens`) o que já existe: componente, token, dado fixo, hook. Só crie o que faltar. Um componente usado em 2 ou mais lugares vai para `src/components`. Não duplique estilos: use os tokens.
2. **Economizar chamadas do Figma.** Ver "Modos de operação". Nunca chame o Figma para algo que já está em `references/`.
3. **Nunca criar nem alterar nada no Figma.** Só ferramentas de leitura (`get_design_context`, `get_screenshot`, `get_variable_defs`). É proibido usar `use_figma`, `create_*`, `generate_*`, `upload_assets`, `send_code_*`, `add_code_connect_map`, `html_to_figma`, `weave_*` e qualquer outra que escreva.
4. **Grill me.** Em dúvida, pergunte antes de implementar. O **Figma é a fonte da verdade**; os prints antigos estão desatualizados. Se um print divergir de `tokens.md` marcado `[Figma]`, vale o `tokens.md`. Se divergir em algo que só existe no print (texto, dado, regra), pergunte qual é a versão atual. **Nunca invente**: regra de negócio, texto, dado, comportamento de botão, nome de rota, dependência. Se não está no Figma, no print, em `references/` ou na resposta do usuário, é pergunta.
5. **Código simples.** Sem bibliotecas extras, sem abstrações avançadas. Ver "Padrões de código".
6. **Dependências aprovadas até agora:** React Navigation (`@react-navigation/native`, `bottom-tabs`, `native-stack`, e os pares que ele exige: `react-native-screens`, `react-native-safe-area-context`), `react-native-paper` e a fonte Inter (`@expo-google-fonts/inter` com `expo-font`, que já vem no Expo/Snack). `@expo/vector-icons` também já vem com o Expo/Snack. Qualquer outra (date picker, image picker, Firebase, Cloudinary, SVG, biblioteca de ícones...) exige pergunta e aprovação explícita antes.
7. **Fidelidade ao Figma via React Native Paper.** A prioridade é usar os componentes do Paper e **customizá-los** (tema em `src/config/theme.js`, props `style`, `contentStyle`, `labelStyle`, `outlineStyle`) até ficarem o mais próximo possível do Figma. A fidelidade **não** é motivo para trocar o Paper por componente próprio. `View`, `Text`, `ScrollView`, `Pressable` ficam para layout e estrutura, ou onde o Paper não tem equivalente (avise no resumo final quando isso acontecer).

## Contexto fixo do projeto

- O app roda no **Snack (snack.expo.dev)**, mesmo sendo editado no VS Code. Tudo precisa funcionar no Snack:
  - imports **relativos** (nada de alias `@/`, que exigiria mexer no babel);
  - sem arquivos `.env`, sem módulos nativos fora do Expo Go, sem mexer em `babel.config.js`, `metro.config.js` ou plugins do `app.json`;
  - imagens em `assets/` e importadas com `require('../../assets/...')` (o usuário exporta todas do Figma; a skill nunca baixa assets pelo MCP);
  - nomes de arquivo sem espaços e sem acentos.
- Pastas atuais (podem mudar; confira o projeto antes): raiz com `assets/` (hoje só `screenshots/`) e `src/`; dentro de `src/`: `components/`, `config/`, `navigation/`, `screens/`. Tokens e tema em `src/config/theme.js`; dados fixos em `src/config/dados.js` (decisão provisória do usuário: se a estrutura do projeto já tiver outro lugar, siga o do projeto e avise no resumo).
- Decisões já tomadas (não perguntar de novo): fonte **Inter**; ícones do **MaterialCommunityIcons** (equivalentes mais próximos, ver `tokens.md`); **data e hora** como campo de texto com máscara (sem date picker); **"Adicionar foto"** só visual até existir Cloudinary; textos que parecem placeholder: **perguntar o texto real antes de portar**.
- Estado: `useState` no componente pai e **prop drilling** (props e funções passadas para baixo). Sem Context, Redux, Zustand etc.
- Dados por enquanto são fixos. **Firebase** (dados) e **Cloudinary** (fotos) virão depois, e ainda não há chave de API. Não implemente nem instale nada disso sem o usuário pedir; deixe a estrutura pronta para trocar os dados fixos depois (funções simples como `adicionarPet`, `excluirPet` no componente pai).
- Navegação: React Navigation com abas inferiores (5 abas). A barra do Figma tem indicador em formato de pílula; o jeito mais próximo é `BottomNavigation.Bar` do Paper como `tabBar` do `createBottomTabNavigator` (confira na documentação da versão instalada). Telas de formulário (Cadastrar pet) ficam num stack dentro da aba, mantendo a barra visível como no Figma.
- **Não desenhe** a barra de status (9:41, sinal, bateria) nem o indicador da home do iPhone: são do sistema. Use `react-native-safe-area-context` para o respeito às áreas seguras.

## Modos de operação

**Modo A: com print (padrão, 0 chamadas ao Figma).**
O usuário enviou um print da tela na conversa, ou o print já está em `assets/screenshots/` do projeto. Porte a partir do print + `references/tokens.md` + `references/telas.md`, depois de confirmar que o print é da versão atual (se não for, vá para o Modo B). Só use o Figma se o print deixar uma dúvida que nem uma pergunta ao usuário resolve (ex.: texto cortado na borda da tela).

**Modo B: sem print (até 1 chamada por tela).**
1. Peça ao usuário o link do frame no Figma (botão direito no frame > Copy link to selection). Isso evita gastar uma chamada só para descobrir o `node-id`.
2. Pergunte quantas chamadas ainda restam no mês e, se estiverem acabando, peça o print em vez de chamar.
3. Antes de chamar, leia o skill `figma-design-to-code` se estiver disponível (a ferramenta exige; ler não gasta chamada). Faça **uma** chamada `get_design_context` para a tela. Trate o código retornado só como referência visual (ele vem em React/Tailwind): traduza para React Native Paper, sem copiar.
4. `get_screenshot` só se o resultado vier ambíguo. `get_variable_defs` só se o usuário disser que os tokens mudaram.
5. Registre no resumo final quantas chamadas foram usadas.

Em qualquer modo, se o usuário disser que o Figma mudou em algo dos tokens, atualize `references/tokens.md` (peça autorização antes de editar a skill).

## Fluxo para cada tela

1. **Identifique** a tela/modal pedido e o modo (A ou B). Se o pedido for vago, pergunte qual tela.
2. **Leia** `references/tokens.md` e a seção da tela em `references/telas.md`.
3. **Inventário do projeto:** liste o que já existe e pode ser reaproveitado (componentes, tema, dados, rotas). Dependências já instaladas ficam em `package.json`.
4. **Entrevista (grill me), em UMA mensagem:** perguntas numeradas, fechadas, cada uma com uma proposta marcada com ✅. Comece pelas "Perguntas em aberto" da tela em `references/telas.md` e acrescente as novas que surgirem. Se não houver dúvida real, diga isso e siga.
   Sempre pergunte quando houver: texto que parece placeholder ("wawawawaw", "mais coisa", "endereço, endereço"), texto cortado, comportamento de botão não mostrado, regra de negócio (validação, status, ordenação, cálculo de datas), dependência nova, comportamento diferente entre telas parecidas.
5. **Espere as respostas.** Não implemente com dúvida aberta.
6. **Implemente** alterando só o que foi pedido, direto nos arquivos do projeto (a entrega é no próprio projeto; sem `.zip`, sem comentários estilo Jira). Escreva os arquivos completos, não trechos soltos.
7. **Resumo final** curto: arquivos criados/alterados, componentes reaproveitados, chamadas do Figma usadas, onde o Paper não bastou, e (só aqui) sugestões extras que não foram implementadas.
8. **Validação:** não diga que ficou ótimo sem ver. Peça um print da tela rodando no Snack e compare com o Figma. Se possível, em duas larguras (360 e 390).

## Padrões de código

- JavaScript, componentes de função, `useState` e `useEffect` só quando necessário.
- Um componente por arquivo, nome em português e PascalCase (`CartaoPet.js`), props simples e nomeadas pelo que significam.
- Estilos com `StyleSheet.create` no fim do arquivo, usando valores do tema (nada de cor ou número solto repetido).
- Listas com `map` ou `FlatList` e `key` estável. Dados fixos em `src/config/dados.js`.
- Textos exatamente como no Figma (acentos, caixa, pontuação), exceto os que forem placeholder (pergunte).
- Layout flexível (flex, porcentagem, `width: '100%'`), sem larguras fixas de tela inteira. Base de referência: 390 de largura.
- Comentários curtos em português só onde ajudam um aluno a entender.
- Não deixe `console.log`, código morto nem imports sem uso.
