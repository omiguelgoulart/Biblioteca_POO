import { Biblioteca } from '../classes/Biblioteca';
import { Membro } from '../classes/Membro';
import { Livro } from '../classes/Livro';
import { Emprestimo } from '../classes/Emprestimo';
import * as fs from 'fs';
import { mocked } from 'jest-mock';

jest.mock('fs');

const mockedFs = mocked(fs, { shallow: true });

describe('Biblioteca', () => {
    let biblioteca: Biblioteca;

    beforeEach(() => {
        jest.clearAllMocks();
        biblioteca = new Biblioteca();
    });

    it('deve adicionar um membro', () => {
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        biblioteca.adicionarMembro(membro);
        expect(biblioteca.consultarMembros()).toContain(membro);
    });

    it('deve adicionar um livro', () => {
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.consultarLivros()).toContain(livro);
    });

    it('deve adicionar um empréstimo', () => {
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        biblioteca.adicionarMembro(membro);
        biblioteca.adicionarLivro(livro);
        const emprestimo = new Emprestimo(new Date(), null, livro, membro);
        biblioteca.adicionarEmprestimo(emprestimo);
        expect(biblioteca.consultarEmprestimos()).toContain(emprestimo);
    });

    it('deve excluir um membro', () => {
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        biblioteca.adicionarMembro(membro);
        biblioteca.excluirMembro('12345');
        expect(biblioteca.consultarMembros()).not.toContain(membro);
    });

    it('deve excluir um livro', () => {
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        biblioteca.adicionarLivro(livro);
        biblioteca.excluirLivro('ISBN123');
        expect(biblioteca.consultarLivros()).not.toContain(livro);
    });

    it('deve devolver um livro', () => {
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        biblioteca.adicionarMembro(membro);
        biblioteca.adicionarLivro(livro);
        const emprestimo = new Emprestimo(new Date(), null, livro, membro);
        biblioteca.adicionarEmprestimo(emprestimo);
        const dataDevolucao = new Date();
        biblioteca.devolverLivro('ISBN123', '12345', dataDevolucao);
        expect(emprestimo.getDataDevolucao()).toEqual(dataDevolucao);
    });

    it('deve alterar dados de um membro', () => {
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        biblioteca.adicionarMembro(membro);
        biblioteca.alterarMembro('12345', { nome: 'Novo Nome' });
        expect(membro.getNome()).toEqual('Novo Nome');
        biblioteca.alterarMembro('12345', { endereco: 'Novo Endereço' });
        expect(membro.getEndereco()).toEqual('Novo Endereço');
        biblioteca.alterarMembro('12345', { telefone: 'Novo Telefone' });
        expect(membro.getTelefone()).toEqual('Novo Telefone');
    });

    it('deve alterar dados de um livro', () => {
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        biblioteca.adicionarLivro(livro);
        biblioteca.alterarLivro('ISBN123', { titulo: 'Novo Título' });
        expect(livro.getTitulo()).toEqual('Novo Título');
        biblioteca.alterarLivro('ISBN123', { autor: 'Novo Autor' });
        expect(livro.getAutor()).toEqual('Novo Autor');
        biblioteca.alterarLivro('ISBN123', { editora: 'Nova Editora' });
        expect(livro.getEditora()).toEqual('Nova Editora');
        biblioteca.alterarLivro('ISBN123', { ano: '2021' });
        expect(livro.getAno()).toEqual('2021');
        biblioteca.alterarLivro('ISBN123', { genero: 'Novo Gênero' });
        expect(livro.getGenero()).toEqual('Novo Gênero');
    });

    // Testes para carregar e salvar dados
    it('deve carregar membros de um arquivo', () => {
        const dadosMembros = 'Nome,Endereço,Telefone,Matrícula\nNome Teste,Endereço Teste,Telefone Teste,12345\n';
        mockedFs.readFileSync.mockReturnValue(dadosMembros);
        biblioteca.carregarMembros();
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        expect(biblioteca.consultarMembros()).toContainEqual(membro);
    });

    it('deve carregar livros de um arquivo', () => {
        const dadosLivros = 'ISBN,Título,Autor,Editora,Ano,Gênero\nISBN123,Título Teste,Autor Teste,Editora Teste,2020,Gênero Teste\n';
        mockedFs.readFileSync.mockReturnValue(dadosLivros);
        biblioteca.carregarLivros();
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        expect(biblioteca.consultarLivros()).toContainEqual(livro);
    });

    it('deve carregar empréstimos de um arquivo', () => {
        const dadosMembros = 'Nome,Endereço,Telefone,Matrícula\nNome Teste,Endereço Teste,Telefone Teste,12345\n';
        const dadosLivros = 'ISBN,Título,Autor,Editora,Ano,Gênero\nISBN123,Título Teste,Autor Teste,Editora Teste,2020,Gênero Teste\n';
        const dadosEmprestimos = 'ISBN,Matrícula,Data de Empréstimo,Data de Devolução\nISBN123,12345,2023-01-01T00:00:00.000Z,\n';
        mockedFs.readFileSync
            .mockReturnValueOnce(dadosMembros)
            .mockReturnValueOnce(dadosLivros)
            .mockReturnValueOnce(dadosEmprestimos);
        biblioteca.carregarMembros();
        biblioteca.carregarLivros();
        biblioteca.carregarEmprestimos();
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        const emprestimo = new Emprestimo(new Date('2023-01-01T00:00:00.000Z'), null, livro, membro);
        expect(biblioteca.consultarEmprestimos()).toContainEqual(emprestimo);
    });

    it('deve consultar empréstimos por membro', () => {
        const membro1 = new Membro('Nome Teste 1', 'Endereço Teste 1', 'Telefone Teste 1', '12345');
        const membro2 = new Membro('Nome Teste 2', 'Endereço Teste 2', 'Telefone Teste 2', '67890');
        const livro1 = new Livro('ISBN123', 'Título Teste 1', 'Autor Teste 1', 'Editora Teste 1', '2020', 'Gênero Teste 1');
        const livro2 = new Livro('ISBN456', 'Título Teste 2', 'Autor Teste 2', 'Editora Teste 2', '2021', 'Gênero Teste 2');
        const emprestimo1 = new Emprestimo(new Date(), null, livro1, membro1);
        const emprestimo2 = new Emprestimo(new Date(), null, livro2, membro1);
        const emprestimo3 = new Emprestimo(new Date(), null, livro1, membro2);
        biblioteca.adicionarMembro(membro1);
        biblioteca.adicionarMembro(membro2);
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        biblioteca.adicionarEmprestimo(emprestimo1);
        biblioteca.adicionarEmprestimo(emprestimo2);
        biblioteca.adicionarEmprestimo(emprestimo3);
        const emprestimosMembro1 = biblioteca.consultarEmprestimosPorMembro('12345');
        const emprestimosMembro2 = biblioteca.consultarEmprestimosPorMembro('67890');
        expect(emprestimosMembro1).toEqual([emprestimo1, emprestimo2]);
        expect(emprestimosMembro2).toEqual([emprestimo3]);
    });

    it('deve consultar empréstimos por livro', () => {
        const membro1 = new Membro('Nome Teste 1', 'Endereço Teste 1', 'Telefone Teste 1', '12345');
        const membro2 = new Membro('Nome Teste 2', 'Endereço Teste 2', 'Telefone Teste 2', '67890');
        const livro1 = new Livro('ISBN123', 'Título Teste 1', 'Autor Teste 1', 'Editora Teste 1', '2020', 'Gênero Teste 1');
        const livro2 = new Livro('ISBN456', 'Título Teste 2', 'Autor Teste 2', 'Editora Teste 2', '2021', 'Gênero Teste 2');
        const emprestimo1 = new Emprestimo(new Date(), null, livro1, membro1);
        const emprestimo2 = new Emprestimo(new Date(), null, livro1, membro2);
        const emprestimo3 = new Emprestimo(new Date(), null, livro2, membro1);
        biblioteca.adicionarMembro(membro1);
        biblioteca.adicionarMembro(membro2);
        biblioteca.adicionarLivro(livro1);
        biblioteca.adicionarLivro(livro2);
        biblioteca.adicionarEmprestimo(emprestimo1);
        biblioteca.adicionarEmprestimo(emprestimo2);
        biblioteca.adicionarEmprestimo(emprestimo3);
        const emprestimosLivro1 = biblioteca.consultarEmprestimosPorLivro('ISBN123');
        const emprestimosLivro2 = biblioteca.consultarEmprestimosPorLivro('ISBN456');
        expect(emprestimosLivro1).toEqual([emprestimo1, emprestimo2]);
        expect(emprestimosLivro2).toEqual([emprestimo3]);
    });

    it('deve salvar membros em um arquivo', () => {
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        biblioteca.adicionarMembro(membro);
        biblioteca.salvarMembros();
        expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
            'membros.csv',
            'Nome,Endereço,Telefone,Matrícula\nNome Teste,Endereço Teste,Telefone Teste,12345\n'
        );
    });

    it('deve salvar livros em um arquivo', () => {
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        biblioteca.adicionarLivro(livro);
        biblioteca.salvarLivros();
        expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
            'livros.csv',
            'ISBN,Título,Autor,Editora,Ano,Gênero\nISBN123,Título Teste,Autor Teste,Editora Teste,2020,Gênero Teste\n'
        );
    });

    it('deve salvar empréstimos em um arquivo', () => {
        const membro = new Membro('Nome Teste', 'Endereço Teste', 'Telefone Teste', '12345');
        const livro = new Livro('ISBN123', 'Título Teste', 'Autor Teste', 'Editora Teste', '2020', 'Gênero Teste');
        biblioteca.adicionarMembro(membro);
        biblioteca.adicionarLivro(livro);
        const emprestimo = new Emprestimo(new Date('2023-01-01T00:00:00.000Z'), null, livro, membro);
        biblioteca.adicionarEmprestimo(emprestimo);
        biblioteca.salvarEmprestimos();
        expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
            'emprestimos.csv',
            'ISBN,Matrícula,Data de Empréstimo,Data de Devolução\nISBN123,12345,2023-01-01T00:00:00.000Z,\n'
        );
    });
});
