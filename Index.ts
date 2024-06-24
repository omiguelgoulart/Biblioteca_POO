// Importando as funções de menu (substitua pelo seu próprio código)
import { exit } from 'process';
import { menuEmprestimo, menuLivro, menuMembro } from './Util';

// Importando a função prompt de forma adequada
import promptSync from "prompt-sync";
const prompt = promptSync();

// Função do menu principal
export function menuPrincipal() {
    while (true) {
    console.log("+-----------------------+");
    console.log("|   Menu Principal      |");
    console.log("+-----------------------+");
    console.log("| 1. Livros             |");
    console.log("| 2. Membros            |");
    console.log("| 3. Empréstimos        |");
    console.log("| 4. Sair               |");
    console.log("+-----------------------+");

    const opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            menuLivro();
            break;
        case "2":
            menuMembro();
            break;
        case "3":
            menuEmprestimo();
            break;
        case "4":
            console.log("Saindo...");
            return; // Encerra a função, o que encerrará o loop no menuPrincipal()
        default:
            console.log("Opção inválida.");
    }
}
}

menuPrincipal(); 