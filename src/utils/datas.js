// Funções para datas no formato DD/MM/AAAA (o app guarda a data como texto)

// Converte "12/03/2023" em Date (ou null se a data não existir, como 31/02)
function lerData(texto) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(texto)) return null;

  const [dia, mes, ano] = texto.split('/').map(Number);
  const data = new Date(ano, mes - 1, dia);

  // O Date "corrige" datas inválidas (31/02 vira 03/03); se mudou, é inválida
  if (data.getDate() !== dia || data.getMonth() !== mes - 1) return null;
  return data;
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
