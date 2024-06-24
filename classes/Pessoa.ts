export class Pessoa {
    private nome: string;
    private endereco: string;
    private telefone: string;

    constructor(nome: string, endereco: string, telefone: string) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    setTelefone(telefone: string): void {
        this.telefone = telefone;
    }

    getNome(): string {
        return this.nome;
    }

    getEndereco(): string {
        return this.endereco;
    }

    getTelefone(): string {
        return this.telefone;
    }
}
