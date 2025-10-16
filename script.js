/**
 * Jogo de Adivinhação de Número Simples
 * script.js
 */

// 1. Definição das variáveis de estado do jogo
let numeroSecreto;
let tentativasRestantes = 10;
let jogoAtivo = true;

// 2. Elementos do DOM (assumindo que existem IDs correspondentes no HTML)
const inputAdivinha = document.getElementById('inputAdivinha');
const botaoEnviar = document.getElementById('botaoEnviar');
const resultadoDiv = document.getElementById('resultado');
const tentativasSpan = document.getElementById('tentativas');
const mensagemStatus = document.getElementById('mensagemStatus');
const botaoNovoJogo = document.getElementById('botaoNovoJogo');

/**
 * Inicia um novo jogo: gera um número secreto e reseta o estado.
 */
function novoJogo() {
    // Gera um número aleatório entre 1 e 100
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = 10;
    jogoAtivo = true;

    // Reseta a interface
    resultadoDiv.textContent = 'Tente adivinhar um número entre 1 e 100!';
    tentativasSpan.textContent = tentativasRestantes;
    mensagemStatus.textContent = '';
    inputAdivinha.value = '';
    inputAdivinha.disabled = false;
    botaoEnviar.disabled = false;
    botaoNovoJogo.style.display = 'none'; // Esconde o botão de Novo Jogo

    console.log(`Novo jogo iniciado. Número secreto: ${numeroSecreto}`); // Apenas para debug
}

/**
 * Lida com o palpite do jogador.
 */
function checarPalpite() {
    if (!jogoAtivo) {
        mensagemStatus.textContent = 'O jogo acabou. Clique em "Novo Jogo" para começar de novo.';
        return;
    }

    // Pega e valida o palpite
    const palpite = parseInt(inputAdivinha.value);

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        resultadoDiv.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }

    // Decrementa as tentativas
    tentativasRestantes--;
    tentativasSpan.textContent = tentativasRestantes;

    // Lógica do jogo
    if (palpite === numeroSecreto) {
        // Venceu
        resultadoDiv.textContent = `🎉 Parabéns! Você acertou o número ${numeroSecreto}!`;
        mensagemStatus.textContent = `Você venceu em ${10 - tentativasRestantes} tentativas.`;
        finalizarJogo(true);
    } else if (tentativasRestantes === 0) {
        // Perdeu
        resultadoDiv.textContent = `💔 Game Over! O número era ${numeroSecreto}.`;
        mensagemStatus.textContent = 'Você esgotou suas tentativas.';
        finalizarJogo(false);
    } else {
        // Continua o jogo (dá dica)
        if (palpite < numeroSecreto) {
            resultadoDiv.textContent = 'Seu palpite está muito baixo! ⬆️ Tente um número maior.';
        } else {
            resultadoDiv.textContent = 'Seu palpite está muito alto! ⬇️ Tente um número menor.';
        }
    }

    // Limpa o input
    inputAdivinha.value = '';
    inputAdivinha.focus();
}

/**
 * Finaliza o jogo, desabilitando os controles.
 * @param {boolean} vitoria - Se o jogador venceu (true) ou perdeu (false).
 */
function finalizarJogo(vitoria) {
    jogoAtivo = false;
    inputAdivinha.disabled = true;
    botaoEnviar.disabled = true;
    botaoNovoJogo.style.display = 'block'; // Mostra o botão de Novo Jogo
}

// 3. Configuração dos Event Listeners

// Listener para o botão de envio
botaoEnviar.addEventListener('click', checarPalpite);

// Listener para permitir que o Enter submeta o palpite no campo de input
inputAdivinha.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checarPalpite();
    }
});

// Listener para o botão de novo jogo
botaoNovoJogo.addEventListener('click', novoJogo);

// 4. Inicialização do Jogo
// O jogo começa automaticamente quando o script é carregado
document.addEventListener('DOMContentLoaded', novoJogo);