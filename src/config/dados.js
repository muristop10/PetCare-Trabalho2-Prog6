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
