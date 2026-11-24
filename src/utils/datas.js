// Funções para datas no formato DD/MM/AAAA (o app guarda a data como texto)

// Transforma o que foi digitado em DD/MM/AAAA, colocando as barras sozinho
export function mascararData(texto) {
  const numeros = texto.replace(/\D/g, '').slice(0, 8);

  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
}

// Converte "12/03/2023" em Date (ou null se a data não existir, como 31/02)
function lerData(texto) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) return null;

  const [dia, mes, ano] = texto.split('/').map(Number);
  const data = new Date(ano, mes - 1, dia);

  // O Date "corrige" datas inválidas (31/02 vira 03/03); se mudou, é inválida
  if (data.getDate() !== dia || data.getMonth() !== mes - 1) return null;
  return data;
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
