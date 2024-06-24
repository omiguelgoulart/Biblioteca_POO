import { createObjectCsvWriter } from 'csv-writer';
import { Membro } from './Membro';
import { Livro } from './Livro';
import { Emprestimo } from './Emprestimo';
import fs from 'fs';
import path from 'path';

export class Biblioteca {
    
    private membros: Membro[] = [];
    private livros: Livro[] = [];
    private emprestimos: Emprestimo[] = [];

    constructor() {
        this.carregarMembros();
        this.carregarLivros();
        this.carregarEmprestimos();
    }
    
    adicionarMembro(membro: Membro): void {
        this.membros.push(membro);
        this.salvarMembros(); // Chama o método para salvar membros após adicionar um novo membro
    }

    adicionarLivro(livro: Livro): void {
        this.livros.push(livro);
        this.salvarLivros(); // Chama o método para salvar livros após adicionar um novo livro
    }

    adicionarEmprestimo(emprestimo: Emprestimo): void {
        this.emprestimos.push(emprestimo);
        this.salvarEmprestimos(); // Chama o método para salvar empréstimos após adicionar um novo empréstimo
    }

    async salvarMembros(): Promise<void> {
        const csvWriter = createObjectCsvWriter({
            path: path.resolve('dados/membros.csv'),
            header: [
                { id: 'nome', title: 'Nome' },
                { id: 'endereco', title: 'Endereço' },
                { id: 'telefone', title: 'Telefone' },
                { id: 'matricula', title: 'Matrícula' }
            ]
        });

        const registros = this.membros.map(m => ({
            nome: m.getNome(),
            endereco: m.getEndereco(),
            telefone: m.getTelefone(),
            matricula: m.getMatricula()
        }));

        try {
            await csvWriter.writeRecords(registros);
            console.log('Membros salvos com sucesso.');
        } catch (err) {
            console.error('Erro ao salvar membros:', err);
        }
    }

    async salvarLivros(): Promise<void> {
        const csvWriter = createObjectCsvWriter({
            path: path.resolve('dados/livros.csv'),
            header: [
                { id: 'isbn', title: 'ISBN' },
                { id: 'titulo', title: 'Título' },
                { id: 'autor', title: 'Autor' },
                { id: 'editora', title: 'Editora' },
                { id: 'ano', title: 'Ano' },
                { id: 'genero', title: 'Gênero' }
            ]
        });

        const registros = this.livros.map(l => ({
            isbn: l.getIsbn(),
            titulo: l.getTitulo(),
            autor: l.getAutor(),
            editora: l.getEditora(),
            ano: l.getAno(),
            genero: l.getGenero()
        }));

        try {
            await csvWriter.writeRecords(registros);
            console.log('Livros salvos com sucesso.');
        } catch (err) {
            console.error('Erro ao salvar livros:', err);
        }
    }

    async salvarEmprestimos(): Promise<void> {
        const csvWriter = createObjectCsvWriter({
            path: path.resolve('dados/emprestimos.csv'),
            header: [
                { id: 'isbn', title: 'ISBN' },
                { id: 'matricula', title: 'Matrícula' },
                { id: 'dataEmprestimo', title: 'Data de Empréstimo' },
                { id: 'dataDevolucao', title: 'Data de Devolução' }
            ]
        });

        const registros = this.emprestimos.map(e => ({
            isbn: e.getLivro()?.getIsbn() ?? '',
            matricula: e.getMatricula() ?? '',
            dataEmprestimo: e.getDataEmprestimo()?.toISOString() ?? '',
            dataDevolucao: e.getDataDevolucao()?.toISOString() ?? ''
        }));

        try {
            await csvWriter.writeRecords(registros);
            console.log('Empréstimos salvos com sucesso.');
        } catch (err) {
            console.error('Erro ao salvar empréstimos:', err);
        }
    }

    carregarMembros(): void {
        const caminho = path.resolve('dados/membros.csv');
        if (fs.existsSync(caminho)) {
            const dados = fs.readFileSync(caminho, 'utf-8').split('\n').slice(1);
            this.membros = dados.map(linha => {
                const [nome, endereco, telefone, matricula] = linha.split(',');
                return new Membro(nome, endereco, telefone, matricula);
            });
        }
    }

    carregarLivros(): void {
        const caminho = path.resolve('dados/livros.csv');
        if (fs.existsSync(caminho)) {
            const dados = fs.readFileSync(caminho, 'utf-8').split('\n').slice(1);
            this.livros = dados.map(linha => {
                const [isbn, titulo, autor, editora, ano, genero] = linha.split(',');
                return new Livro(isbn, titulo, autor, editora, ano, genero);
            });
        }
    }

    carregarEmprestimos(): void {
        const caminho = path.resolve('dados/emprestimos.csv');
        if (fs.existsSync(caminho)) {
            const dados = fs.readFileSync(caminho, 'utf-8').split('\n').slice(1);
            this.emprestimos = dados.map(linha => {
                const [isbn, matricula, dataEmprestimo, dataDevolucao] = linha.split(',');
                const livro = this.livros.find(l => l.getIsbn() === isbn);
                const membro = this.membros.find(m => m.getMatricula() === matricula);
                if (livro && membro) {
                    return new Emprestimo(livro, membro, new Date(dataEmprestimo), new Date(dataDevolucao));
                } else {
                    throw new Error('Livro ou membro não encontrado.');
                }
            });
        }
    }

    excluirMembro(matricula: string): void {
        this.membros = this.membros.filter(m => m.getMatricula() !== matricula);
        this.salvarMembros();
    }

    excluirLivro(isbn: string): void {
        this.livros = this.livros.filter(l => l.getIsbn() !== isbn);
        this.salvarLivros();
    }

    devolverLivro(isbn: string, matricula: string, dataDevolucao: Date): void {
        const emprestimo = this.emprestimos.find(e => e.getLivro().getIsbn() === isbn && e.getMembro().getMatricula() === matricula);
        if (emprestimo) {
            emprestimo.setDataDevolucao(dataDevolucao);
            this.salvarEmprestimos();
        }
    }

    alterarMembro(matricula: string, novosDados: Membro): void {
        const membro = this.membros.find(m => m.getMatricula() === matricula);
        if (membro) {
            if ((novosDados as any).nome !== undefined) membro.setNome((novosDados as any).nome);
            if ((novosDados as any).endereco !== undefined) membro.setEndereco((novosDados as any).endereco);
            if ((novosDados as any).telefone !== undefined) membro.setTelefone((novosDados as any).telefone);
            this.salvarMembros();
        }
    }

    alterarLivro(isbn: string, novosDados: Partial<Livro>): void {
        const livro = this.livros.find(l => l.getIsbn() === isbn);
        if (livro) {
            if ((novosDados as any).titulo !== undefined) livro.setTitulo((novosDados as any).titulo);
            if ((novosDados as any).autor !== undefined) livro.setAutor((novosDados as any).autor);
            if ((novosDados as any).editora !== undefined) livro.setEditora((novosDados as any).editora);
            if ((novosDados as any).ano !== undefined) livro.setAno((novosDados as any).ano);
            if ((novosDados as any).genero !== undefined) livro.setGenero((novosDados as any).genero);
            this.salvarLivros();
        }
    }

    consultarMembros(): Membro[] {
        return this.membros;
    }

    consultarLivros(): Livro[] {
        return this.livros;
    }

    consultarEmprestimos(): Emprestimo[] {
        return this.emprestimos;
    }

    consultarEmprestimosPorMembro(matricula: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.getMembro().getMatricula() === matricula);
    }

    consultarEmprestimosPorLivro(isbn: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.getLivro().getIsbn() === isbn);
    }
}