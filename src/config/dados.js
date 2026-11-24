// Dados fixos por enquanto. Depois serão trocados pelos dados do Firebase.

export const proximoAgendamento = {
  pet: 'Teodor',
  servico: 'Banho e tosa',
  data: 'Qua, 18 nov',
  hora: '14:30',
};

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

// Pets que já aparecem na lista ao abrir o app (a idade é calculada pela data)
export const petsIniciais = [
  { id: 'thor', nome: 'Thor', especie: 'Cachorro', raca: 'Golden Retriever', sexo: 'Macho', dataNascimento: '12/03/2023' },
  { id: 'mel', nome: 'Mel', especie: 'Gato', raca: 'Siamês', sexo: 'Fêmea', dataNascimento: '05/08/2024' },
  { id: 'luna', nome: 'Luna', especie: 'Cachorro', raca: 'Poodle', sexo: 'Fêmea', dataNascimento: '20/01/2021' },
];

// Aviso amarelo de Meus Pets (some se o pet for excluído)
export const avisoVacina = {
  petId: 'luna',
  texto: 'A vacina da Luna vence em 12 dias. Que tal agendar o reforço?',
};

// ---------- Tela Sobre ----------

export const empresa = {
  nome: 'PetCare Clínica Veterinária',
  endereco: 'Rua Princesa Isabel, 1536-E - São Cristóvão, Chapecó - SC, 89803-332',
  historia:
    'A PetCare nasceu em 2020 com a ideia de oferecer um cuidado completo aos animais, unindo saúde, conforto e praticidade em um só lugar. Seu objetivo é proporcionar atendimento veterinário de qualidade e produtos que contribuam para o bem-estar dos pets, sempre com carinho, responsabilidade, respeito e dedicação. A empresa busca crescer junto com seus clientes, construindo relações de confiança e tornando a vida dos animais cada vez melhor.',
  horario: 'Seg a sáb., das 8h às 18h.',
  telefone: '(00) 00000 - 0000',
  email: 'petcare.contato@gmail.com',
  // Posição do pino no mapa (aproximada: trecho da Rua Princesa Isabel - E; conferir no Google Maps)
  latitude: -27.0842422,
  longitude: -52.6259183,
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
      'mais coisa',
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
      'mais coisa',
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
