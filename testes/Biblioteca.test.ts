import { Biblioteca } from "../classes/Biblioteca";
import { Membro } from "../classes/Membro";
import { Livro } from "../classes/Livro";
import { Emprestimo } from "../classes/Emprestimo";

describe("Biblioteca", () => {
    let biblioteca: Biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
    });

    it("deve adicionar um membro à biblioteca", () => {
        const membro = new Membro("Fulano de Tal", "Rua Principal, 123", "123-456-7890", "001");
        biblioteca.adicionarMembro(membro);
        const membros = biblioteca.consultarMembros();
        expect(membros).toContain(membro);
    });

    it("deve adicionar um livro à biblioteca", () => {
        const livro = new Livro("1234567890", "Título do Livro", "Autor", "Editora", "2022", "Gênero");
        biblioteca.adicionarLivro(livro);
        const livros = biblioteca.consultarLivros();
        expect(livros).toContain(livro);
    });

    it("deve adicionar um empréstimo à biblioteca", () => {
        const membro = new Membro("Fulano de Tal", "Rua Principal, 123", "123-456-7890", "001");
        const livro = new Livro("123456789", "Título do Livro", "Autor do Livro", "Editora do Livro", "2020", "Gênero do Livro");
        biblioteca.adicionarMembro(membro);
        biblioteca.adicionarLivro(livro);
        const dataEmprestimo = new Date();
        const dataDevolucao = new Date(dataEmprestimo.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias depois
        const emprestimo = new Emprestimo(dataEmprestimo, dataDevolucao, livro, membro);
        biblioteca.adicionarEmprestimo(emprestimo);
        const emprestimos = biblioteca.consultarEmprestimos();
        expect(emprestimos).toContain(emprestimo);
    });

    it("deve remover um membro da biblioteca", () => {
        const membro = new Membro("Fulano de Tal", "Rua Principal, 123", "123-456-7890", "001");
        biblioteca.adicionarMembro(membro);
        biblioteca.excluirMembro(membro.getMatricula());
        const membros = biblioteca.consultarMembros();
        expect(membros).not.toContain(membro);
    });

    it("deve remover um livro da biblioteca", () => {
        const livro = new Livro("1234567890", "Título do Livro", "Autor", "Editora", "2022", "Gênero");
        biblioteca.adicionarLivro(livro);
        biblioteca.excluirLivro(livro.getIsbn());
        const livros = biblioteca.consultarLivros();
        expect(livros).not.toContain(livro);
    });

    it("deve atualizar as informações de um membro", () => {
        const membro = new Membro("Fulano de Tal", "Rua Principal, 123", "123-456-7890", "001");
        biblioteca.adicionarMembro(membro);
        const novosDados = {
            nome: "Beltrano da Silva",
            endereco: "Avenida Secundária, 456",
            telefone: "987-654-3210",
        };
        biblioteca.alterarMembro(membro.getMatricula(), novosDados);
        const membros = biblioteca.consultarMembros();
        const membroAtualizado = membros.find((m) => m.getMatricula() === membro.getMatricula());
        expect(membroAtualizado?.getNome()).toBe(novosDados.nome);
        expect(membroAtualizado?.getEndereco()).toBe(novosDados.endereco);
        expect(membroAtualizado?.getTelefone()).toBe(novosDados.telefone);
    });

    it("deve atualizar as informações de um livro", () => {
        const livro = new Livro("1234567890", "Título do Livro", "Autor", "Editora", "2022", "Gênero");
        biblioteca.adicionarLivro(livro);
        const novosDados = {
            titulo: "Novo Título",
            autor: "Novo Autor",
            editora: "Nova Editora",
            ano: "2023",
            genero: "Novo Gênero",
        };
        biblioteca.alterarLivro(livro.getIsbn(), novosDados);
        const livros = biblioteca.consultarLivros();
        const livroAtualizado = livros.find((l) => l.getIsbn() === livro.getIsbn());
        expect(livroAtualizado?.getTitulo()).toBe(novosDados.titulo);
        expect(livroAtualizado?.getAutor()).toBe(novosDados.autor);
        expect(livroAtualizado?.getEditora()).toBe(novosDados.editora);
        expect(livroAtualizado?.getAno()).toBe(novosDados.ano);
        expect(livroAtualizado?.getGenero()).toBe(novosDados.genero);
    });

    it("deve retornar todos os membros da biblioteca", () => {
        const membro1 = new Membro("Fulano de Tal", "Rua Principal, 123", "123-456-7890", "001");
        const membro2 = new Membro("Beltrano da Silva", "Avenida Secundária, 456", "987-654-3210", "002");
        biblioteca.adicionarMembro(membro1);
        biblioteca.adicionarMembro(membro2);
        const membros = biblioteca.consultarMembros();
        expect(membros).toContain(membro1);
        expect(membros).toContain(membro2);
    });

    it("deve retornar todos os livros da biblioteca", () => {
        const livro1 = new Livro("1234567890", "Título do Livro 1", "Autor 1", "Editora 1", "2022", "Gênero 1");
        const livro2 = new Livro("0987654321", "Título do Livro 2", "Autor 2", "Editora 2", "2023", "Gênero 2");
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        const livros = biblioteca.consultarLivros();
        expect(livros).toContain(livro1);
        expect(livros).toContain(livro2);
    });

    it("deve retornar todos os empréstimos da biblioteca", () => {
        const membro1 = new Membro("Fulano de Tal", "Rua Principal, 123", "123-456-7890", "001");
        const membro2 = new Membro("Beltrano da Silva", "Avenida Secundária, 456", "987-654-3210", "002");
        const livro1 = new Livro("1234567890", "Título do Livro 1", "Autor 1", "Editora 1", "2022", "Gênero 1");
        const livro2 = new Livro("0987654321", "Título do Livro 2", "Autor 2", "Editora 2", "2023", "Gênero 2");
        biblioteca.adicionarMembro(membro1);
        biblioteca.adicionarMembro(membro2);
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        const dataEmprestimo1 = new Date();
        const dataDevolucao1 = new Date(dataEmprestimo1.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias depois
        const emprestimo1 = new Emprestimo(dataEmprestimo1, dataDevolucao1, livro1, membro1);
        const dataEmprestimo2 = new Date();
        const dataDevolucao2 = new Date(dataEmprestimo2.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias depois
        const emprestimo2 = new Emprestimo(dataEmprestimo2, dataDevolucao2, livro2, membro2);
        biblioteca.adicionarEmprestimo(emprestimo1);
        biblioteca.adicionarEmprestimo(emprestimo2);
        const emprestimos = biblioteca.consultarEmprestimos();
        expect(emprestimos).toContain(emprestimo1);
        expect(emprestimos).toContain(emprestimo2);
    });
    it("deve buscar o histórico de empréstimos de um membro", () => {
        const membro = new Membro("Fulano de Tal", "Rua Principal, 123", "123-456-7890", "001");
        const livro1 = new Livro("1234567890", "Título do Livro 1", "Autor 1", "Editora 1", "2022", "Gênero 1");
  const livro2 = new Livro("0987654321", "Título do Livro 2", "Autor 2", "Editora 2", "2023", "Gênero 2");
  const dataEmprestimo1 = new Date("2022-01-01");
  const dataDevolucao1 = new Date("2022-01-08");
  const emprestimo1 = new Emprestimo(dataEmprestimo1, dataDevolucao1, livro1, membro);
  const dataEmprestimo2 = new Date("2022-02-01");
  const dataDevolucao2 = new Date("2022-02-08");
  const emprestimo2 = new Emprestimo(dataEmprestimo2, dataDevolucao2, livro2, membro);
  const biblioteca = new Biblioteca();
  biblioteca.adicionarMembro(membro);
  biblioteca.adicionarLivro(livro1);
  biblioteca.adicionarLivro(livro2);
  biblioteca.adicionarEmprestimo(emprestimo1);
  biblioteca.adicionarEmprestimo(emprestimo2);
  
  const historico = biblioteca.buscarHistoricoPorMembro(membro.getMatricula());

  expect(historico).toContain(
    `Empréstimo de ${livro1.getTitulo()} por ${membro.getNome()} em ${dataEmprestimo1.toLocaleDateString()} até ${dataDevolucao1.toLocaleDateString()}`
  );
  expect(historico).toContain(
    `Empréstimo de ${livro2.getTitulo()} por ${membro.getNome()} em ${dataEmprestimo2.toLocaleDateString()} até ${dataDevolucao2.toLocaleDateString()}`
  );
});
});