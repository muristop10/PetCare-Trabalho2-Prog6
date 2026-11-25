// Dados fixos do app (serviços, opções dos formulários e tela Sobre).
// Pets e agendamentos NÃO ficam aqui: são gravados e lidos no Firebase (veja config/firebase.js).

// "icone" é o nome do ícone no MaterialCommunityIcons
export const servicosEsteticos = [
  { id: 'banho', nome: 'Banho', descricao: 'Banho completo com secagem e perfume', icone: 'water-outline' },
  { id: 'tosa', nome: 'Tosa', descricao: 'Tosa higiênica ou completa', icone: 'content-cut' },
  { id: 'banho-e-tosa', nome: 'Banho e tosa', descricao: 'Banho e tosa no mesmo atendimento', icone: 'shimmer' },
  { id: 'higienizacao', nome: 'Higienização', descricao: 'Limpeza de ouvidos, unhas e dentes', icone: 'spray-bottle' },
];

export const servicosVeterinarios = [
  { id: 'consulta', nome: 'Consulta', descricao: 'Avaliação clínica completa do seu pet', icone: 'stethoscope' },
  { id: 'vacinacao', nome: 'Vacinação', descricao: 'Vacinas para cães e gatos em dia', icone: 'needle' },
  { id: 'exames', nome: 'Exames', descricao: 'Exames de sangue, imagem e laboratório', icone: 'flask-outline' },
];

// ---------- Meus Pets ----------

export const especies = ['Cachorro', 'Gato', 'Outro'];
export const sexos = ['Macho', 'Fêmea'];

// ---------- Agendamentos ----------

// Cada agendamento no Firebase tem: pet (nome), servico (nome de um serviço das listas acima),
// data (DD/MM/AAAA), hora, observacoes e status ('Pendente', 'Confirmado', 'Concluído' ou 'Cancelado')

// Filtros da tela Agendamentos
export const filtrosAgendamento = ['Todos', 'Estética', 'Veterinário'];

// ---------- Tela Sobre ----------

export const empresa = {
  nome: 'PetCare Clínica Veterinária',
  endereco: 'R. Uruguai, 294 - Centro, Chapecó - SC, 89801-570',
  historia:
    'A PetCare nasceu em 2020 com a ideia de oferecer um cuidado completo aos animais, unindo saúde, conforto e praticidade em um só lugar. Seu objetivo é proporcionar atendimento veterinário de qualidade e produtos que contribuam para o bem-estar dos pets, sempre com carinho, responsabilidade, respeito e dedicação. A empresa busca crescer junto com seus clientes, construindo relações de confiança e tornando a vida dos animais cada vez melhor.',
  horario: 'Seg a sáb., das 8h às 18h.',
  telefone: '(00) 00000 - 0000',
  email: 'petcare.contato@gmail.com',
  // Posição do pino no mapa (R. Uruguai, 294, tirada do Google Maps)
  latitude: -27.1067434,
  longitude: -52.6086373,
};

// "cor" é o nome do par de cores no tema (amarelo, verde, azul)
export const estatisticas = [
  { id: 'anos', texto: '5+ anos de história', cor: 'amarelo' },
  { id: 'pets', texto: '+ 2500 pets atendidos', cor: 'verde' },
  { id: 'avaliacoes', texto: '+ 100 avaliações positivas no Reclame Aqui', cor: 'azul' },
];

// Fotos provisórias (mock). Trocar por require('../../assets/...') quando houver as fotos reais.
// O último item de "itens" é o papel no projeto (aparece em azul).
export const programadores = [
  {
    id: 'laura',
    nome: 'Laura',
    foto: { uri: 'https://i.pravatar.cc/400?img=47' },
    itens: [
      'Estudante do Módulo IV, IFSC.',
      'Dona de um gato de 4 de 3 anos de idade, Oliver.',
      'UX/UI designer, figma + css/layout da aplicação.',
    ],
  },
  {
    id: 'murilo',
    nome: 'Murilo',
    foto: { uri: 'https://i.pravatar.cc/400?img=12' },
    itens: [
      'Estudante do Módulo IV, IFSC.',
      'Dono de uma cachorra de 4 anos de idade, Amora.',
      'Dev fullstack react-native, desenvolvedor da aplicação.',
    ],
  },
];

// Botões de "Mais contatos" (sem link por enquanto)
export const contatos = [
  { id: 'instagram', nome: 'Instagram', icone: 'instagram' },
  { id: 'facebook', nome: 'Facebook', icone: 'facebook' },
  { id: 'linkedin', nome: 'LinkedIn', icone: 'linkedin' },
  { id: 'email', nome: 'E-mail', icone: 'email-outline' },
];
