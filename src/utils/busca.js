// Deixa o texto em minúsculas e sem acentos, para "fêmea" achar "femea" e "BANHO" achar "banho"
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

// Filtra a lista: fica quem tem o texto buscado em algum dos "campos" (nomes das propriedades)
export function filtrarPorBusca(lista, busca, campos) {
  const termo = normalizar(busca.trim());
  if (termo === '') return lista;

  return lista.filter((item) => campos.some((campo) => normalizar(String(item[campo] ?? '')).includes(termo)));
}
