let nomes = [];
let sorteio = {};

// Função para adicionar nome
function adicionarNome() {
    const inputNome = document.getElementById("nome").value.trim();
    if (inputNome) {
        if (!nomes.includes(inputNome)) {
            nomes.push(inputNome);
            document.getElementById("nome").value = "";
            exibirNomes();
        } else {
            alert("Este nome já foi adicionado.");
        }
    } else {
        alert("Por favor, insira um nome.");
    }
}

// Captura o campo de input e adiciona o listener para "Enter"
const inputNome = document.getElementById("nome");
inputNome.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        adicionarNome();
    }
});

// Função para exibir os nomes
function exibirNomes() {
    const lista = document.getElementById("listaNomes");
    lista.innerHTML = "";
    nomes.forEach((nome) => {
        const li = document.createElement("li");
        li.textContent = nome;
        lista.appendChild(li);
    });

    // Desabilita o botão de sorteio se houver menos de 2 nomes
    const botaoSortear = document.querySelector("button[onclick='sortear()']");
    botaoSortear.disabled = nomes.length < 2;
}

// Função para realizar o sorteio
function sortear() {
    if (nomes.length < 2) {
        alert("Precisa de pelo menos 2 nomes para sortear.");
        return;
    }

    const nomesSorteados = [...nomes]; // Copia o array original
    sorteio = {}; // Reinicia o objeto de sorteio

    nomes.forEach((nome) => {
        let indiceSorteado;
        do {
            indiceSorteado = Math.floor(Math.random() * nomesSorteados.length);
        } while (nomesSorteados[indiceSorteado] === nome); // Garante que a pessoa não sorteie a si mesma

        sorteio[nome] = nomesSorteados[indiceSorteado]; // Armazena o resultado
        nomesSorteados.splice(indiceSorteado, 1); // Remove o nome sorteado
    });

    alert("Sorteio realizado! Agora cada um pode ver quem tirou.");
    document.getElementById("consulta").style.display = "block"; // Mostra o campo de consulta
}

// Função para consultar o sorteio
function consultarSorteio() {
    const nomeConsulta = document.getElementById("nomeConsulta").value.trim();
    if (nomeConsulta) {
        if (sorteio[nomeConsulta]) {
            document.getElementById("resultado").textContent = `Você tirou: ${sorteio[nomeConsulta]}`;

            // Disparar confetes
            confetti({
                particleCount: 100, // Quantidade de confetes
                spread: 70, // Quão espalhados os confetes estarão
                origin: { y: 0.6 }, // Origem dos confetes (0.6 = 60% da altura da tela)
            });
        } else {
            alert("Nome não encontrado. Verifique se digitou corretamente.");
        }
    } else {
        alert("Por favor, insira um nome para consultar.");
    }
}

// Função para resetar o sorteio
function resetarSorteio() {
    nomes = [];
    sorteio = {};
    exibirNomes();
    document.getElementById("resultado").textContent = "";
    document.getElementById("consulta").style.display = "none"; // Esconde o campo de consulta
}