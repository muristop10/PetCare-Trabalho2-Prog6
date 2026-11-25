import { dataEHoraParaDate, formatarDataCurta, lerData } from './datas';

// Próximo agendamento que ainda vai acontecer (Pendente ou Confirmado), ou null se não houver.
// Devolve a data no formato curto ("Qua, 18 nov") que o card do sino mostra.
export function acharProximoAgendamento(agendamentos) {
  const agora = new Date();
  let proximo = null;
  let momentoProximo = null;

  agendamentos.forEach((agendamento) => {
    const ativo = agendamento.status === 'Pendente' || agendamento.status === 'Confirmado';
    const momento = dataEHoraParaDate(agendamento.data, agendamento.hora);

    if (ativo && momento && momento >= agora && (!momentoProximo || momento < momentoProximo)) {
      proximo = agendamento;
      momentoProximo = momento;
    }
  });

  if (!proximo) return null;
  return { ...proximo, data: formatarDataCurta(proximo.data) };
}

// Aviso amarelo de Meus Pets. Regra: a vacina concluída vale 1 ano; quando faltam 30 dias ou menos
// para vencer (e o pet não tem outra vacinação marcada), avisa. Devolve o texto do aviso ou null.
export function acharAvisoVacina(pets, agendamentos) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  let aviso = null;
  let menosDias = null;

  pets.forEach((pet) => {
    const vacinas = agendamentos.filter((item) => item.pet === pet.nome && item.servico === 'Vacinação');
    const jaMarcada = vacinas.some((item) => item.status === 'Pendente' || item.status === 'Confirmado');
    const ultima = vacinas
      .filter((item) => item.status === 'Concluído' && lerData(item.data))
      .map((item) => lerData(item.data))
      .sort((a, b) => b - a)[0];

    if (jaMarcada || !ultima) return;

    const vencimento = new Date(ultima.getFullYear() + 1, ultima.getMonth(), ultima.getDate());
    const dias = Math.round((vencimento - hoje) / (1000 * 60 * 60 * 24));

    if (dias >= 0 && dias <= 30 && (menosDias === null || dias < menosDias)) {
      const artigo = pet.sexo === 'Fêmea' ? 'da' : 'do';
      const prazo = dias === 0 ? 'vence hoje' : dias === 1 ? 'vence em 1 dia' : `vence em ${dias} dias`;
      aviso = `A vacina ${artigo} ${pet.nome} ${prazo}. Que tal agendar o reforço?`;
      menosDias = dias;
    }
  });

  return aviso;
}
