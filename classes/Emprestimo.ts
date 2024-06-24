import { Livro } from "./Livro";
import { Membro } from "./Membro";

export class Emprestimo {
  getMatricula(): any {
    throw new Error("Method not implemented.");
  }
  private livro: Livro;
  private membro: Membro;
  private dataEmprestimo: Date;
  private dataDevolucao: Date | null;

  constructor(
    livro: Livro,
    membro: Membro,
    dataEmprestimo: Date,
    dataDevolucao: Date | null = null
  ) {
    this.livro = livro;
    this.membro = membro;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
  }

  setLivro(livro: Livro): void {
    this.livro = livro;
  }

  setMembro(membro: Membro): void {
    this.membro = membro;
  }

  setDataEmprestimo(data: Date): void {
    this.dataEmprestimo = data;
  }

  setdataDevolucao(data: Date): void {
    this.dataDevolucao = data;
  }

  getLivro(): Livro {
    return this.livro;
  }

  getMembro(): Membro {
    return this.membro;
  }

  getDataEmprestimo(): Date {
    return this.dataEmprestimo;
  }

  getDataDevolucao(): Date | null {
    if (this.dataDevolucao === null) {
      return null;
    }
    return this.dataDevolucao;
  }

  setDataDevolucao(data: Date): void {
    this.dataDevolucao = data;
  }
}
