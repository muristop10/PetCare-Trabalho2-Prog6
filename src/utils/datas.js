// Funções para datas no formato DD/MM/AAAA (o app guarda a data como texto)

// Transforma o que foi digitado em DD/MM/AAAA, colocando as barras sozinho
export function mascararData(texto) {
  const numeros = texto.replace(/\D/g, '').slice(0, 8);

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
}

// Converte "12/03/2023" em Date (ou null se a data não existir, como 31/02)
export function lerData(texto) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) return null;

  const [dia, mes, ano] = texto.split('/').map(Number);
  const data = new Date(ano, mes - 1, dia);

  // O Date "corrige" datas inválidas (31/02 vira 03/03); se mudou, é inválida
  if (data.getDate() !== dia || data.getMonth() !== mes - 1) return null;
  return data;
}

// Transforma o que foi digitado em HH:MM, colocando os dois-pontos sozinho
export function mascararHora(texto) {
  const numeros = texto.replace(/\D/g, '').slice(0, 4);

  if (numeros.length <= 2) return numeros;
  return `${numeros.slice(0, 2)}:${numeros.slice(2)}`;
}

// Junta "18/11/2026" e "14:30" em um Date (para comparar qual agendamento vem primeiro)
export function dataEHoraParaDate(texto, hora) {
  const data = lerData(texto);
  if (!data) return null;

  const [horas, minutos] = hora.split(':').map(Number);
  data.setHours(horas, minutos);
  return data;
}

// "18/11/2026" -> "Qua, 18 nov" (usado no próximo agendamento do sino)
export function formatarDataCurta(texto) {
  const data = lerData(texto);
  if (!data) return texto;

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${diasSemana[data.getDay()]}, ${data.getDate()} ${meses[data.getMonth()]}`;
}

// Mensagem de erro da data do agendamento ('' = sem erro).
// Só confere quando a data está completa, para não reclamar enquanto a pessoa digita.
export function erroDataAgendamento(texto) {
  if (texto.length < 10) return '';

  const data = lerData(texto);
  if (!data) return 'Data inválida';

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); // compara só o dia, sem a hora
  if (data < hoje) return 'Data no passado';

  return '';
}

// Mensagem de erro do horário ('' = sem erro)
export function erroHora(texto) {
  if (texto.length < 5) return '';

  const [horas, minutos] = texto.split(':').map(Number);
  if (horas > 23 || minutos > 59) return 'Horário inválido';

  return '';
}

// Data de nascimento válida: completa, existente e que não está no futuro
export function dataNascimentoValida(texto) {
  const data = lerData(texto);
  return data !== null && data <= new Date();
}

// "3 anos", "1 ano", "8 meses" ou "1 mês"
export function calcularIdade(texto) {
  const nascimento = lerData(texto);
  if (!nascimento) return '';

  const hoje = new Date();
  let meses =
    (hoje.getFullYear() - nascimento.getFullYear()) * 12 +
    (hoje.getMonth() - nascimento.getMonth());

  // Ainda não chegou o dia do "mesversário" neste mês
  if (hoje.getDate() < nascimento.getDate()) {
    meses = meses - 1;
  }

  const anos = Math.floor(meses / 12);
  if (anos >= 1) {
    return anos === 1 ? '1 ano' : `${anos} anos`;
  }
  return meses === 1 ? '1 mês' : `${meses} meses`;
}
