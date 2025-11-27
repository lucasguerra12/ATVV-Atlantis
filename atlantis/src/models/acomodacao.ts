import { NomeAcomodacao } from "../utils/NomeAcomodacao";

export default class Acomodacao {
    private nomeAcomodacao: NomeAcomodacao
    private camaSolteiro: Number
    private camaCasal: Number
    private suite: Number
    private climatizacao: Boolean
    private garagem: Number

    constructor(nomeAcomodacao: NomeAcomodacao, camaSolteiro: Number, camaCasal: Number,
        suite: Number, climatizacao: Boolean, garagem: Number) {
        this.nomeAcomodacao = nomeAcomodacao
        this.camaSolteiro = camaSolteiro
        this.camaCasal = camaCasal
        this.suite = suite
        this.climatizacao = climatizacao
        this.garagem = garagem
    }

    public get NomeAcomodacao() { return this.nomeAcomodacao }
    public get CamaSolteiro() { return this.camaSolteiro }
    public get CamaCasal() { return this.camaCasal }
    public get Suite() { return this.suite }
    public get Climatizacao() { return this.climatizacao }
    public get Garagem() { return this.garagem }

}