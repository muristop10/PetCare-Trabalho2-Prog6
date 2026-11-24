import { servicosEsteticos, servicosVeterinarios } from '../config/dados';

// Diz se o serviço (pelo nome, ex.: "Consulta") é veterinário
export function ehVeterinario(nomeServico) {
  return servicosVeterinarios.some((servico) => servico.nome === nomeServico);
}

// Nome do ícone do serviço (ex.: "Banho" -> "water-outline")
export function iconeDoServico(nomeServico) {
  const todos = [...servicosEsteticos, ...servicosVeterinarios];
  const servico = todos.find((item) => item.nome === nomeServico);
  return servico ? servico.icone : 'paw-outline';
}
