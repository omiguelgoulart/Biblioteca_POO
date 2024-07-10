import { Biblioteca } from "./classes/Biblioteca";
import PromptSync from "prompt-sync";
import { Membro } from "./classes/Membro";
import { Livro } from "./classes/Livro";
import { menuPrincipal } from "./Index";
import { Emprestimo } from "./classes/Emprestimo";

const prompt = PromptSync();
const biblioteca = new Biblioteca();


// Menu livro
export function menuLivro(): void {
    console.log("+----------------------+");
    console.log("|     Menu Livro       |");
    console.log("+----------------------+");
    console.log("| 1. Adicionar livro   |");
    console.log("| 2. Listar livros     |");
    console.log("| 3. Alterar livros    |");
    console.log("| 4. Excluir livros    |");
    console.log("| 5. Voltar            |");
    console.log("+----------------------+");


    const opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            adicionarLivro();
            break;
        case "2":
            listarLivros();
            break;
        case "3":
            alterarLivro();
            break;
        case "4":
            excluirLivro();
            break;
        case "5":
            menuPrincipal();
            break;
        default:
            console.log("Opção inválida.");
    }
}

function adicionarLivro(): void {
    const isbn = prompt("ISBN: ");
    const titulo = prompt("Título: ");
    const autor = prompt("Autor: ");
    const editora = prompt("Editora: ");
    const ano = prompt("Ano: ");
    const genero = prompt("Gênero: ");

    const novoLivro = new Livro(isbn, titulo, autor, editora, ano, genero);
    biblioteca.adicionarLivro(novoLivro);
}

function listarLivros(): void {
    const livros: Livro[] = biblioteca.consultarLivros(); // Certifique-se de definir o tipo de retorno corretamente
    console.table(livros.map(livro => ({
        ISBN: livro.getIsbn(),
        Título: livro.getTitulo(),
        Autor: livro.getAutor(),
        Editora: livro.getEditora(),
        Ano: livro.getAno(),
        Gênero: livro.getGenero()
    })));
}

function alterarLivro(): void {
    const isbn = prompt("ISBN do livro: ");
    const titulo = prompt("Título: ");
    const autor = prompt("Autor: ");
    const editora = prompt("Editora: ");
    const ano = prompt("Ano: ");
    const genero = prompt("Gênero: ");

    const novosDados = new Livro(titulo, autor, editora, ano, genero, isbn);
    biblioteca.alterarLivro(isbn, novosDados);
}

function excluirLivro(): void {
    const isbn = prompt("ISBN do livro: ");
    biblioteca.excluirLivro(isbn);
}

// Menu membro
export function menuMembro(): void {
    console.log("+----------------------+");
    console.log("|     Menu Membro      |");
    console.log("+----------------------+");
    console.log("| 1. Adicionar membro  |");
    console.log("| 2. Listar membros    |");
    console.log("| 3. Alterar membros   |");
    console.log("| 4. Excluir membros   |");
    console.log("| 5. Voltar            |");
    console.log("+----------------------+");

    const opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            adicionarMembro();
            break;
        case "2":
            listarMembros();
            break;
        case "3":
            alterarMembro();
            break;
        case "4":
            excluirMembro();
            break;
        case "5":
            menuPrincipal();
            break;
        default:
            console.log("Opção inválida.");
    }
}

function adicionarMembro(): void {
    const nome = prompt("Nome: ");
    const endereco = prompt("Endereço: ");
    const telefone = prompt("Telefone: ");
    const matricula = prompt("Matrícula: ");

    const novoMembro = new Membro(nome, endereco, telefone, matricula);
    biblioteca.adicionarMembro(novoMembro);
}

function listarMembros(): void {
    const membros = biblioteca.consultarMembros();
    console.table(membros.map(membro => ({
        Nome: membro.getNome(),
        Endereço: membro.getEndereco(),
        Telefone: membro.getTelefone(),
        Matrícula: membro.getMatricula()
    })));
}

function alterarMembro() {
    const matricula = prompt("Matrícula do membro: ");
    const nome = prompt("Nome: ");
    const endereco = prompt("Endereço: ");
    const telefone = prompt("Telefone: ");

    const novosDados = {
        nome: nome,
        endereco: endereco,
        telefone: telefone
    };
    biblioteca.alterarMembro(matricula, novosDados);
}

function excluirMembro(): void {
    const matricula = prompt("Matrícula do membro: ");
    biblioteca.excluirMembro(matricula);
}


// Menu empréstimo
export function menuEmprestimo(): void {
    console.log("+-----------------------+");
    console.log("|   Menu Empréstimo     |");
    console.log("+-----------------------+");
    console.log("| 1. Realizar empréstimo|");
    console.log("| 2. Listar empréstimos |");
    console.log("| 3. Devolver livro     |");
    console.log("| 4. Historico Membro   |");
    console.log("| 5. Voltar             |");
    console.log("+-----------------------+");

    const opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            realizarEmprestimo();
            break;
        case "2":
            listarEmprestimos();
            break;
        case "3":
            devolverLivro();
            break;
        case "4":
            buscarHistoricoPorMembro();
            break;
        case "5":
            menuPrincipal();
            break;
        default:
            console.log("Opção inválida.");
    }
}

function realizarEmprestimo(): void {
    if (biblioteca.consultarLivros().length === 0 || biblioteca.consultarMembros().length === 0) {
        console.log("Não é possível realizar empréstimos sem livros ou membros cadastrados.");
        return;
    }

    console.table(biblioteca.consultarLivros().map(livro => ({
        Título: livro.getTitulo(),
        ISBN: livro.getIsbn()
    })));

    const isbn = prompt("ISBN do livro: ");
    const livroSelecionado = biblioteca.consultarLivros().find(livro => livro.getIsbn() === isbn);

    if (!livroSelecionado) {
        console.log(`Livro com ISBN ${isbn} não encontrado.`);
        return;
    }

    const matricula = prompt("Matrícula do membro: ");
    const membroSelecionado = biblioteca.consultarMembros().find(membro => membro.getMatricula() === matricula);

    if (!membroSelecionado) {
        console.log(`Membro com matrícula ${matricula} não encontrado.`);
        return;
    }

    const dataEmprestimo = new Date();
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataDevolucao.getDate() + 7); 

    const novoEmprestimo = new Emprestimo(dataEmprestimo, dataDevolucao, livroSelecionado, membroSelecionado);
    biblioteca.adicionarEmprestimo(novoEmprestimo);

    console.log("Empréstimo realizado com sucesso.");
    console.log(`A devolução deve ser feita até ${dataDevolucao.toLocaleDateString()}.`);
}

function listarEmprestimos(): void {
    const emprestimos = biblioteca.consultarEmprestimos();
    console.table(emprestimos.map(emprestimo => ({
        Membro: emprestimo.getMembro().getNome(),
        Livro: emprestimo.getLivro().getTitulo(),
        "Data de empréstimo": emprestimo.getDataEmprestimo()
    })));
}

function devolverLivro(): void {
    const isbn = prompt("ISBN do livro: ");
    const matricula = prompt("Matrícula do membro: ");
    const dataDevolucao = new Date();

    biblioteca.devolverLivro(isbn, matricula, dataDevolucao);
    console.log("Livro devolvido com sucesso.");
}

function buscarHistoricoPorMembro(): void {
    const matricula = prompt("Matrícula do membro: ");
    const membro = biblioteca.consultarMembros().find(membro => membro.getMatricula() === matricula);

    if (!membro) {
        console.log(`Membro com matrícula ${matricula} não encontrado.`);
        return;
    }
    const historico = biblioteca.buscarHistoricoPorMembro(matricula);
    console.log(historico);
}













