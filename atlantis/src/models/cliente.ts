// CORREÇÃO: Imports limpos (sem .js e no diretório atual ./)
import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";

// CORREÇÃO: Removemos "implements Prototipo" pois não trouxemos essa interface
export default class Cliente {
    private nome: string
    private nomeSocial: string
    private dataNascimento: Date
    private dataCadastro: Date
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes: Cliente[] = []
    private titular!: Cliente

    constructor(nome: string, nomeSocial: string, dataNascimento: Date) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.dataNascimento = dataNascimento
        this.dataCadastro = new Date()
    }

    public get Nome() { return this.nome }
    public set Nome(nome: string) { this.nome = nome }

    public get NomeSocial() { return this.nomeSocial }
    public set NomeSocial(nomeSocial: string) { this.nomeSocial = nomeSocial }

    public get DataNascimento() { return this.dataNascimento }
    public set DataNascimento(dataNascimento: Date) { this.dataNascimento = dataNascimento }

    public get DataCadastro() { return this.dataCadastro }
    
    public get Telefones() { return this.telefones }
    public get Endereco() { return this.endereco }
    public set Endereco(endereco: Endereco) { this.endereco = endereco }

    public get Documentos() { return this.documentos }
    public get Dependentes() { return this.dependentes }
    public get Titular() { return this.titular }
}