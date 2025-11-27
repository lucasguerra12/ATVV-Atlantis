import { NomeAcomodacao } from "./NomeAcomodacao";

export const REGRAS_ACOMODACAO = {
  [NomeAcomodacao.SolteiroSimples]: { camaCasal: 0, camaSolteiro: 1, suite: 1, garagem: 0, climatizacao: true },
  [NomeAcomodacao.SolteiroMais]:    { camaCasal: 1, camaSolteiro: 0, suite: 1, garagem: 1, climatizacao: true },
  [NomeAcomodacao.CasalSimples]:    { camaCasal: 1, camaSolteiro: 0, suite: 1, garagem: 1, climatizacao: true },
  [NomeAcomodacao.FamiliaSimples]:  { camaCasal: 1, camaSolteiro: 2, suite: 1, garagem: 1, climatizacao: true },
  [NomeAcomodacao.FamiliaMais]:     { camaCasal: 1, camaSolteiro: 5, suite: 2, garagem: 2, climatizacao: true },
  [NomeAcomodacao.FamiliaSuper]:    { camaCasal: 2, camaSolteiro: 6, suite: 3, garagem: 2, climatizacao: true },
};