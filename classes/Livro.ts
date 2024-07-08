export interface LivroDados {
    isbn: string;
    titulo: string;
    autor: string;
    editora: string;
    ano: string;
    genero: string;
}export class Livro implements LivroDados {
    public isbn: string;
    public titulo: string;
    public autor: string;
    public editora: string;
    public ano: string;
    public genero: string;
        constructor(isbn: string,titulo: string,autor: string,editora: string,ano: string,genero: string
    ) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.ano = ano;
        this.genero = genero;
    }
    setIsbn(isbn: string): void {
        this.isbn = isbn;
    }
    setTitulo(titulo: string): void {
        this.titulo = titulo;
    }
    setAutor(autor: string): void {
        this.autor = autor;
    }
    setEditora(editora: string): void {
        this.editora = editora;
    }
    setAno(ano: string): void {
        this.ano = ano;
    }
    setGenero(genero: string): void {
        this.genero = genero;
    }
    getIsbn(): string {
        return this.isbn;
    }
    getTitulo(): string {
        return this.titulo;
    }
    getAutor(): string {
        return this.autor;
    }
    getEditora(): string {
        return this.editora;
    }
    getAno(): string {
        return this.ano;
    }
    getGenero(): string {
        return this.genero;
    }
}
