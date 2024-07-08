import { Pessoa } from './Pessoa';

export class Membro extends Pessoa {
    private matricula: string;

    constructor(
        nome: string,
        endereco: string,
        telefone: string,
        matricula: string) {
        super(nome, endereco, telefone);
        this.matricula = matricula;
    }

    public setMatricula(novamatricula: string): void {
        this.matricula = novamatricula;
    }

    public getMatricula(): string {
        return this.matricula;
    }

    
}
