# Inventário das telas do PetCare

Origem: prints do Figma enviados pelo usuário, que estão **desatualizados** (o Figma é a fonte da verdade). Só a tela Início foi conferida no Figma atual (frame `8:195`). Nas demais, textos, nomes e tamanhos podem ter mudado: peça um print atual ou use o Modo B. O que não está aqui, ou está em "Perguntas em aberto", precisa ser perguntado ao usuário. Textos entre aspas são literais do Figma.

## Componentes compartilhados (criar uma vez, reutilizar em todas as telas)

| Componente sugerido | Usado em | Base no Paper |
|---|---|---|
| `Cabecalho` (título, subtítulo, seta de voltar opcional, área extra opcional) | todas as telas | `Appbar`/`View` com fundo `primaria` e cantos inferiores arredondados |
| `BarraAbas` | todas as telas | `BottomNavigation.Bar` como `tabBar` do bottom-tabs |
| `BotaoGrande` (preenchido ou contorno) | Agendar, Cadastrar pet, modais | `Button` (`contained` / `outlined`) |
| `BotaoIcone` (editar azul, lixeira vermelha) | Agendamentos, Meus Pets | `IconButton` com fundo suave |
| `CampoTexto` (rótulo + input) | Agendar, Cadastrar pet | `TextInput mode="outlined"` |
| `CampoSelecao` (dropdown) | Agendar | `Menu` + `TextInput`/`Button` |
| `ChipOpcao` (selecionado/não) | Agendamentos (filtro), Cadastrar pet (espécie, sexo) | `Chip` |
| `SeloStatus` | Agendamentos | `Chip` com ponto |
| `CartaoServico` | Início | `Card`/`Surface` |
| `CartaoPet` | Meus Pets | `Card`/`Surface` |
| `CartaoAgendamento` | Agendamentos | `Card`/`Surface` |
| `DialogoConfirmacao` (título, texto, botão perigo, botão cancelar) | Sair sem salvar, Excluir pet | `Portal` + `Dialog` |
| `AvisoAmarelo` | Meus Pets | `Surface` |

## 1 - Início

- Cabeçalho alto (158): pílula branca com a logo (patinha com coração) + "PetCare" (Pet em `texto`, Care em `primaria`); botão circular do sino à direita; saudação "Olá! Como podemos cuidar do seu pet hoje?".
- Card amarelo (`destaque`): ícone de calendário em quadrado branco, "PRÓXIMO AGENDAMENTO", "Teodor · Banho e tosa" (Figma atual; o print antigo dizia "Thor"), "Qua, 18 nov · 14:30", seta `>` à direita.
- Dois cards lado a lado: "Cadastrar pet" (ícone +) e "Ver agendamentos" (ícone calendário).
- Seção "Serviços estéticos" (lista horizontal; textos do Figma `8:195`): **Banho** ("Banho completo com secagem e perfume"), **Tosa** ("Tosa higiênica ou completa"), **Banho e tosa** ("Banho e tosa no mesmo atendimento"), **Higienização** ("Limpeza de ouvidos, unhas e dentes").
- Seção "Serviços veterinários" (lista horizontal): **Consulta** ("Avaliação clínica completa do seu pet"), **Vacinação** ("Vacinas para cães e gatos em dia"), **Exames** ("Exames de sangue, imagem e laboratório"). Ícones estéticos em quadrado `primariaSuave`; veterinários em quadrado `primaria` com ícone branco.
- Cada card tem botão "Agendar" (pequeno, `primaria`).
- Aba ativa: Início.

Perguntas em aberto:
1. ~~Textos dos cards cortados, "Thor"/"Teodor" e tamanhos de fonte~~ **Resolvido:** vale o Figma (acima e `tokens.md`).
2. O que o sino faz? (✅ propor: nada por enquanto, só visual)
3. "Agendar" de um card abre a tela Agendar já com aquele serviço escolhido? (✅ propor: sim, passando o serviço por parâmetro de rota)
4. O card amarelo e as setas levam para onde? Como se calcula o "próximo agendamento"? (✅ propor: o mais próximo no futuro entre os agendamentos fixos; toque abre Agendamentos)
5. "Cadastrar pet" e "Ver agendamentos" navegam para Cadastrar pet e Agendamentos? (✅ sim)

## 2 - Agendamentos

- Cabeçalho (124) com seta de voltar, "Agendamentos", "Acompanhe os atendimentos dos seus pets".
- Filtros em chip: "Todos" (selecionado), "Estética", "Veterinário".
- Cards com borda na cor do status: ícone do serviço (quadrado), nome do pet, nome do serviço, selo de status, divisor, ícone calendário + data (ex.: "18 nov 2026"), ícone relógio + hora (ex.: "14:30"), botões editar e lixeira.
- Dados vistos: Thor · Banho e tosa · Pendente · 18 nov 2026 · 14:30; Mel · Consulta · Confirmado · 20 nov 2026 · 09:00; Luna · Vacinação · Concluído · 05 nov 2026 · 16:15; Thor · Banho · Cancelado · 02 nov 2026 · 10:00.
- Ícones: estético com fundo suave e ícone azul; veterinário com fundo `primaria` e ícone branco (o card Banho e tosa usa ícone de brilhos).

Perguntas em aberto:
1. A seta de voltar aparece numa tela que é aba. Ela faz o quê? (✅ propor: `navigation.goBack()`; ou ficar só visual)
2. Editar leva ao Agendar preenchido? Lixeira cancela ou exclui o agendamento? Há modal de confirmação (só existe o de pet no Figma)?
3. Editar/excluir aparecem também em Concluído e Cancelado (como no print)? Quem muda o status (Pendente → Confirmado...)?
4. Ordenação da lista e comportamento dos filtros (Estética = Banho, Tosa, Banho e tosa, Higienização; Veterinário = Consulta, Vacinação, Exames).
5. Ícone de cada serviço (Banho = gota, Tosa = tesoura, Banho e tosa = brilhos, Consulta = estetoscópio, Vacinação = seringa): confirmar.

## 3 - Meus Pets

- Cabeçalho (124) com voltar, "Meus Pets", "Gerencie os pets cadastrados".
- "3 pets cadastrados" (contador).
- Cards: avatar circular com patinha (azul, amarelo, verde), nome, "Espécie · Raça", "Sexo · idade", botões editar e lixeira.
- Dados vistos: Thor · Cachorro · Golden Retriever · Macho · 3 anos; Mel · Gato · Siamês · Fêmea · 2 anos; Luna · Cachorro · Poodle · Fêmea · 5 anos.
- Aviso amarelo com ícone de info: "A vacina da Luna vence em 12 dias. Que tal agendar o reforço?"
- FAB "+" no canto inferior direito. Aba ativa: Meus Pets.

Perguntas em aberto:
1. Idade vem da data de nascimento (calculada) ou é texto fixo? Singular/plural ("1 pet cadastrado")? Lista vazia: haverá tela vazia (não existe no Figma)?
2. De onde vem o aviso da vacina (12 dias)? (✅ propor: texto fixo por enquanto; o botão/toque do aviso abre Agendar)
3. Qual cor de avatar cada pet recebe? (✅ propor: alternar azul, amarelo, verde pela ordem da lista)
4. FAB abre Cadastrar pet; editar abre Cadastrar pet preenchido? Qual o título nesse caso (o Figma só mostra "Cadastrar pet")?

## 3.1 - Cadastrar pet

- Cabeçalho (124) com voltar, "Cadastrar pet", "Preencha os dados do seu pet". Barra de abas visível, aba Meus Pets ativa.
- Círculo tracejado com câmera e "Adicionar foto" (texto `primaria`).
- Campos: Nome (ex.: "Thor"); Espécie (chips "Cachorro" selecionado, "Gato", "Outro"); Raça (ex.: "Golden Retriever"); Data de nascimento (ex.: "12/03/2023", ícone calendário); Sexo (chips "Macho" selecionado, "Fêmea"; no Figma o chip Fêmea está cortado na borda direita, erro do layout, não copiar o corte).
- Botões lado a lado: "Cancelar" (contorno) e "Salvar pet" (preenchido).
- Os valores do print (Thor, Golden Retriever...) parecem preenchimento de exemplo: o formulário vazio mostra o quê? Perguntar (placeholder, rótulo vazio).

Perguntas em aberto:
1. Campos obrigatórios e mensagens de erro (não existem no Figma). (✅ propor: Nome, Espécie, Sexo obrigatórios; sem tela de erro nova, só desabilitar "Salvar pet")
2. ~~Seletor de data~~ **Decidido:** campo de texto com máscara 00/00/0000, sem dependência nova.
3. ~~"Adicionar foto"~~ **Decidido:** só visual até existir Cloudinary (sem `expo-image-picker`).
4. "Cancelar" e a seta de voltar abrem o modal "Sair sem salvar?" sempre, ou só se houver algo preenchido? (✅ propor: só se houver algo preenchido)

## 3.2 - Modal "Sair sem salvar?"

- Fundo escurecido (`sobreposicao`), card branco centralizado: título "Sair sem salvar?", texto "Tem certeza que deseja sair da tela sem salvar o registro?", botão vermelho "Sair" e botão contorno "Cancelar" (empilhados, largura total).
- "Sair" volta para Meus Pets descartando; "Cancelar" fecha o modal (ações dedutíveis pelo texto; confirmar se houver dúvida).

## 3.3 - Modal "Excluir registro?"

- Mesmo componente (`DialogoConfirmacao`): título "Excluir registro?", texto "Tem certeza de que deseja excluir este pet? Essa ação não pode ser desfeita.", botão vermelho "Excluir Pet", contorno "Cancelar".
- Aparece sobre Meus Pets ao tocar na lixeira de um card. Perguntar: excluir um pet exclui os agendamentos dele? (✅ propor: não fazer nada além de remover o pet da lista)

## 4 - Agendar

- Cabeçalho (124) com voltar, "Agendar", "Marque um serviço ou consulta para seu pet".
- Seletor "Serviços" (selecionado) / "Consultas".
- Campos: "Escolher pet" (dropdown, ex.: "Thor · Cachorro"); "Serviço" (dropdown, ex.: "Banho e tosa"); "Data" (ex.: "20/11/2026", ícone calendário) e "Horário" (ex.: "14:30", ícone relógio) lado a lado; "Observações (opcional)" (área de texto com placeholder "Ex.: meu pet tem alergia a alguns shampoos").
- Botões: "Confirmar agendamento" (preenchido) e "Cancelar" (contorno). Aba ativa: Agendar.

Perguntas em aberto:
1. A aba "Consultas" não tem design: o que muda? (✅ propor: mesma tela, dropdown "Serviço" passa a listar os serviços veterinários; confirmar)
2. Quais opções entram em cada dropdown? (✅ propor: pets vêm da lista de Meus Pets; Serviços: Banho, Tosa, Banho e tosa, Higienização; Consultas: Consulta, Vacinação, Exames, como nos cards da Início)
3. ~~Data e horário~~ **Decidido:** campo de texto com máscara (00/00/0000 e 00:00), sem dependência nova.
4. Regras de negócio: horário de funcionamento (Sobre diz "Seg a sáb., das 8h às 18h."), data no passado, conflito de horário. (✅ propor: sem validação além de campos obrigatórios)
5. "Confirmar agendamento" cria um agendamento com status "Pendente" e leva a Agendamentos? "Cancelar" volta sem modal?

## 5 - Sobre (tela longa com rolagem)

- Cabeçalho (124) com voltar, "Sobre", "Conheça sobre a PetCare, e sobre quem criou o app".
- "Nossa história": card com logo, "PetCare Clínica Veterinária", linha "Endereço, endereço, endereço" (placeholder), parágrafo "A PetCare nasceu em 2020 ...", três cards de estatística (amarelo "5+ anos de história", verde "+ 2500 pets atendidos", azul "+ 100 avaliações positivas no Reclame Aqui").
- "Sobre os programadores": dois cards com foto (retângulo colorido amarelo "laura" e azul "morilo" como placeholder) e lista: "Estudante do Módulo VI, IFSC.", "Dona de um gato de 4 de 3 anos de idade, Oliver.", "mais coisa", "UX/UI designer, figma + css/layout da aplicação." / "Estudante do módulo VI, IFSC.", "Dono de uma cachorra de 4 anos de idade, Amora.", "mais coisa", "Dev fullstack react-native, desenvolvedor da aplicação.".
- "Onde estamos": card com imagem de mapa (captura do Google Maps) e lista com seta: "Endereço: wawawawaw" (placeholder), "Seg a sáb., das 8h às 18h.", "Telefone: (00) 00000 - 0000", "Email para contato: petcare.contato@gmail.com".
- "Mais contatos": 4 botões (Instagram, Facebook, LinkedIn, E-mail), todos com ícone de câmera (provavelmente placeholder). Aba ativa: Sobre.

Perguntas em aberto:
1. **Decidido:** perguntar o texto real antes de portar. Pedir: endereço, "mais coisa", "wawawawaw", telefone, e os textos dos programadores (há "de 4 de 3 anos" na primeira lista e o nome "morilo").
2. Fotos dos programadores e imagem do mapa: o usuário exporta e coloca em `assets/`. Perguntar os nomes dos arquivos.
3. Ícones reais dos 4 botões de contato (os do print são câmeras, provavelmente placeholder; usar MaterialCommunityIcons) e para onde cada botão leva (links reais). (✅ propor: links vazios por enquanto)
4. Linhas com seta (endereço, horário, telefone, e-mail): são só texto ou tocáveis (abrir mapa, ligar, e-mail)?
