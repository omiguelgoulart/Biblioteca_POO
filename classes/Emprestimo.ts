import { Livro } from "./Livro";
import { Membro } from "./Membro";

export class Emprestimo {
  private dataDevolucao: Date | null;
  private dataEmprestimo: Date;
  private livro: Livro;
  private membro: Membro;
  private isbnLivro: string;
  private matriculaMembro: string;
    constructor(
      dataEmprestimo: Date,
      dataDevolucao: Date | null,
      livro: Livro,
      membro: Membro)
    {
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
    this.livro = livro;
    this.membro = membro;
    this.isbnLivro = livro.getIsbn();
    this.matriculaMembro = membro.getMatricula();
  }
  public getDataEmprestimo(): Date {
    return this.dataEmprestimo;
  }
  public getDataDevolucao(): Date | null {
    return this.dataDevolucao;
  }
  public getLivro(): Livro {
    return this.livro;
  }
  public getMembro(): Membro {
    return this.membro;
  }
  public getIsbnLivro(): string {
    return this.isbnLivro;
  }
  public getMatriculaMembro(): string {
    return this.matriculaMembro;
  }
  public setDataDevolucao(dataDevolucao: Date | null): void {
    this.dataDevolucao = dataDevolucao;
  }
  public setDataEmprestimo(dataEmprestimo: Date): void {
    this.dataEmprestimo = dataEmprestimo;
  }

}
