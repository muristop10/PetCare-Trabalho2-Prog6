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
