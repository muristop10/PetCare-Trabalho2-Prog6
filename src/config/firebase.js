// Acesso ao Firebase Realtime Database pela API REST (só fetch: não precisa instalar nada no Snack).
// Os dados ficam em dois "nós" do banco: /pets e /agendamentos.
// Cada registro tem um id gerado pelo Firebase (a chave dele).
const URL_BANCO = 'https://petcare-murilolaura-default-rtdb.firebaseio.com';

// Faz a chamada HTTP e devolve o JSON da resposta
async function chamar(caminho, metodo, dados) {
  const resposta = await fetch(`${URL_BANCO}/${caminho}.json`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: dados === undefined ? undefined : JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao falar com o Firebase`);
  }
  return resposta.json();
}

// O id vai na chave do Firebase, não dentro dos dados salvos
function semId(registro) {
  const { id, ...dados } = registro;
  return dados;
}

// READ: devolve a lista de uma coleção, ex.: [{ id: '-Abc', nome: 'Thor', ... }]
export async function listar(colecao) {
  const registros = await chamar(colecao, 'GET');

  // Coleção vazia vem como null
  if (!registros) return [];
  return Object.keys(registros).map((id) => ({ ...registros[id], id }));
}

// CREATE: grava um registro novo e devolve o id criado pelo Firebase
export async function salvar(colecao, registro) {
  const resposta = await chamar(colecao, 'POST', semId(registro));
  return resposta.name;
}

// UPDATE: troca os dados do registro que tem esse id
export async function atualizar(colecao, registro) {
  await chamar(`${colecao}/${registro.id}`, 'PUT', semId(registro));
}

// DELETE: remove o registro
export async function excluir(colecao, id) {
  await chamar(`${colecao}/${id}`, 'DELETE');
}
