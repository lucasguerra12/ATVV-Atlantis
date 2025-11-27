export default class Endereco {
    private rua: string
    private bairro: string
    private cidade: string
    private estado: string
    private pais: string
    private codigoPostal: string

    constructor(rua: string, bairro: string, cidade: string, estado: string, pais: string, codigoPostal: string) {
        this.rua = rua
        this.bairro = bairro
        this.cidade = cidade
        this.estado = estado
        this.pais = pais
        this.codigoPostal = codigoPostal
    }

    public get Rua() { return this.rua }
    public set Rua(rua: string) { this.rua = rua }

    public get Bairro() { return this.bairro }
    public set Bairro(bairro: string) { this.bairro = bairro }

    public get Cidade() { return this.cidade }
    public set Cidade(cidade: string) { this.cidade = cidade }

    public get Estado() { return this.estado }
    public set Estado(estado: string) { this.estado = estado }

    public get Pais() { return this.pais }
    public set Pais(pais: string) { this.pais = pais }

    public get CodigoPostal() { return this.codigoPostal }
    public set CodigoPostal(codigoPostal: string) { this.codigoPostal = codigoPostal }
}