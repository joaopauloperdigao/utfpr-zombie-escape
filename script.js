let acertos = 0;
let erros = 0;
const maxErros = 5;

const musicaFundo = new Audio("assets/terror.mp3");
musicaFundo.loop = true;
musicaFundo.volume = 0.35;
const somAcerto = new Audio("assets/acerto.mp3");
const somErro = new Audio("assets/erro.mp3");
const somDerrota = new Audio("assets/zumbi.mp3");
const somVitoria = new Audio("assets/vitoria.mp3");

somAcerto.volume = 0.6;
somErro.volume = 0.6;
somDerrota.volume = 0.7;
somVitoria.volume = 0.7;

function tocarSom(som) {
    som.currentTime = 0;
    som.play().catch(() => {});
}
function trocarFundo(fundo) {

    document.body.classList.remove(
        "fundo-ru",
        "fundo-portaria",
        "fundo-biblioteca",
        "fundo-bloco-k",
        "fundo-laboratorio"
    );

    document.body.classList.add(fundo);
}
let faseAtual = 1;
let acertosNaFase = 0;
let metaDaFase = 1;
let localAtual = "RU — Bloco N";

const questoesFase1 = [
    {
        pergunta: "Três portas diferentes podem levar para fora do RU. Para cada porta existem duas rotas possíveis. De quantas maneiras você pode escolher uma porta e uma rota?",
        opcoes: ["4", "5", "6", "8"],
        correta: 2,
        resolucao: "3 portas × 2 rotas = 6 possibilidades."
    },
    {
        pergunta: "No balcão do RU há 4 tipos de lanche e 3 tipos de bebida. De quantas maneiras você pode escolher um lanche e uma bebida?",
        opcoes: ["7", "12", "16", "24"],
        correta: 1,
        resolucao: "4 lanches × 3 bebidas = 12 possibilidades."
    },
    {
        pergunta: "Há 3 corredores possíveis e, ao final de cada um, 2 escadas diferentes. Quantos caminhos diferentes existem?",
        opcoes: ["5", "6", "8", "9"],
        correta: 1,
        resolucao: "3 corredores × 2 escadas = 6 caminhos."
    },
    {
        pergunta: "Você encontra 2 portas de emergência. Para cada porta existem 4 caminhos possíveis até a saída. Quantas combinações existem?",
        opcoes: ["6", "8", "10", "12"],
        correta: 1,
        resolucao: "2 portas × 4 caminhos = 8 possibilidades."
    },
    {
        pergunta: "Para montar um kit de fuga, você pode escolher 1 entre 3 lanternas e 1 entre 4 mochilas. Quantos kits diferentes podem ser montados?",
        opcoes: ["7", "10", "12", "16"],
        correta: 2,
        resolucao: "3 lanternas × 4 mochilas = 12 kits."
    },
    {
        pergunta: "Existem 5 chaves diferentes e 2 portas trancadas. Quantas tentativas diferentes de escolher uma chave e uma porta podem ser feitas?",
        opcoes: ["7", "10", "12", "15"],
        correta: 1,
        resolucao: "5 chaves × 2 portas = 10 possibilidades."
    },
    {
        pergunta: "Você pode escolher entre 3 rotas pelo pátio e 3 entradas diferentes em um prédio. Quantas combinações de rota e entrada existem?",
        opcoes: ["6", "8", "9", "12"],
        correta: 2,
        resolucao: "3 rotas × 3 entradas = 9 possibilidades."
    },
    {
        pergunta: "Há 4 armários com suprimentos e 2 códigos possíveis para cada armário. Quantas combinações de armário e código existem?",
        opcoes: ["6", "8", "10", "12"],
        correta: 1,
        resolucao: "4 armários × 2 códigos = 8 possibilidades."
    },
    {
        pergunta: "Você encontra 2 rádios e 3 frequências possíveis para tentar pedir ajuda. Quantas combinações podem ser testadas?",
        opcoes: ["5", "6", "8", "9"],
        correta: 1,
        resolucao: "2 rádios × 3 frequências = 6 possibilidades."
    },
    {
        pergunta: "Para fugir, você precisa escolher uma entre 4 saídas e depois uma entre 3 rotas externas. Quantas possibilidades existem?",
        opcoes: ["7", "10", "12", "16"],
        correta: 2,
        resolucao: "4 saídas × 3 rotas = 12 possibilidades."
    }
];

const questoesFase2 = [
    {
        pergunta: "Na portaria existem 4 chaves diferentes. De quantas maneiras elas podem ser organizadas em sequência?",
        opcoes: ["12", "16", "24", "32"],
        correta: 2,
        resolucao: "São 4 elementos diferentes: 4! = 4 × 3 × 2 × 1 = 24."
    },
    {
        pergunta: "Três cachorros diferentes estão na portaria. De quantas maneiras eles podem ficar alinhados?",
        opcoes: ["3", "6", "9", "12"],
        correta: 1,
        resolucao: "3! = 3 × 2 × 1 = 6."
    },
    {
        pergunta: "Há 5 cartões de acesso diferentes. Dois deles devem ser usados em uma sequência de dois cartões. Quantas sequências são possíveis?",
        opcoes: ["10", "15", "20", "25"],
        correta: 2,
        resolucao: "Há 5 escolhas para o primeiro cartão e 4 para o segundo: 5 × 4 = 20."
    },
    {
        pergunta: "Quatro guardas diferentes precisam ocupar quatro postos diferentes. De quantas maneiras isso pode ser feito?",
        opcoes: ["16", "24", "32", "64"],
        correta: 1,
        resolucao: "4! = 24 maneiras."
    },
    {
        pergunta: "Existem 3 rádios e 4 frequências disponíveis. Quantas combinações de rádio e frequência podem ser escolhidas?",
        opcoes: ["7", "10", "12", "16"],
        correta: 2,
        resolucao: "3 rádios × 4 frequências = 12 combinações."
    },
    {
        pergunta: "Cinco estudantes formam uma fila, mas um deles deve obrigatoriamente ficar em primeiro. De quantas maneiras os outros podem se organizar?",
        opcoes: ["12", "20", "24", "120"],
        correta: 2,
        resolucao: "Com uma posição já fixada, restam 4 pessoas: 4! = 24."
    },
    {
        pergunta: "Quatro alarmes diferentes precisam ser verificados um após o outro. Em quantas ordens diferentes isso pode ser feito?",
        opcoes: ["8", "12", "16", "24"],
        correta: 3,
        resolucao: "4! = 24 ordens."
    },
    {
        pergunta: "Há 5 portas diferentes. Você precisa escolher duas delas em uma ordem específica. Quantas possibilidades existem?",
        opcoes: ["10", "20", "25", "30"],
        correta: 1,
        resolucao: "5 escolhas para a primeira e 4 para a segunda: 5 × 4 = 20."
    },
    {
        pergunta: "Quatro objetos diferentes precisam ser colocados em quatro compartimentos diferentes de uma mochila. Quantas distribuições são possíveis?",
        opcoes: ["12", "16", "24", "32"],
        correta: 2,
        resolucao: "4! = 24 distribuições."
    },
    {
        pergunta: "Cinco pessoas formam uma fila. Ana e Bia precisam permanecer juntas. De quantas maneiras isso pode acontecer?",
        opcoes: ["24", "36", "48", "60"],
        correta: 2,
        resolucao: "Ana e Bia formam um bloco. Temos 4 elementos para ordenar: 4! = 24. Como Ana e Bia podem trocar de posição: 24 × 2 = 48."
    }
];

const questoesFase3 = [
    {
        pergunta: "Você encontra 5 arquivos diferentes. Para formar uma chave de acesso, deve escolher 3 deles em uma ordem específica. Quantas possibilidades existem?",
        opcoes: ["20", "40", "60", "120"],
        correta: 2,
        resolucao: "5 × 4 × 3 = 60 possibilidades."
    },
    {
        pergunta: "De quantas maneiras diferentes podem ser organizadas as letras da palavra VIRUS?",
        opcoes: ["24", "60", "120", "240"],
        correta: 2,
        resolucao: "As 5 letras são diferentes: 5! = 120."
    },
    {
        pergunta: "Quantos anagramas diferentes podem ser formados com a palavra CODIGO?",
        opcoes: ["120", "180", "360", "720"],
        correta: 2,
        resolucao: "São 6 letras, com O repetido 2 vezes: 6! / 2! = 360."
    },
    {
        pergunta: "Uma senha usa 4 algarismos distintos escolhidos entre 1, 2, 3, 4, 5 e 6. Quantas senhas podem ser formadas?",
        opcoes: ["120", "240", "360", "720"],
        correta: 2,
        resolucao: "6 × 5 × 4 × 3 = 360 senhas."
    },
    {
        pergunta: "Há 7 arquivos diferentes. Três deles devem ser abertos em uma ordem específica. Quantas sequências são possíveis?",
        opcoes: ["35", "120", "210", "343"],
        correta: 2,
        resolucao: "7 × 6 × 5 = 210 sequências."
    },
    {
        pergunta: "Quantos anagramas diferentes podem ser formados com a palavra DADOS?",
        opcoes: ["30", "60", "120", "240"],
        correta: 1,
        resolucao: "São 5 letras, com D repetido duas vezes: 5! / 2! = 60."
    },
    {
        pergunta: "Quatro documentos diferentes precisam ser colocados em quatro gavetas diferentes, um em cada gaveta. Quantas distribuições existem?",
        opcoes: ["12", "16", "24", "36"],
        correta: 2,
        resolucao: "4! = 24 distribuições."
    },
    {
        pergunta: "Quantos anagramas diferentes podem ser formados com as letras AABBCC?",
        opcoes: ["60", "90", "120", "180"],
        correta: 1,
        resolucao: "6! / (2! × 2! × 2!) = 90."
    },
    {
        pergunta: "De quantas maneiras diferentes podem ser organizadas as letras da palavra SALA?",
        opcoes: ["6", "12", "18", "24"],
        correta: 1,
        resolucao: "São 4 letras com A repetido duas vezes: 4! / 2! = 12."
    },
    {
        pergunta: "Existem 6 cartões diferentes e você deve escolher e ordenar 2 deles para desbloquear um computador. Quantas possibilidades existem?",
        opcoes: ["12", "15", "30", "36"],
        correta: 2,
        resolucao: "6 escolhas para o primeiro e 5 para o segundo: 6 × 5 = 30."
    }
];

let questoesDisponiveisFase3 = [];
let questoesDisponiveisFase2 = [];

let questoesDisponiveis = [];
let questaoAtual = null;

function statusJogo() {
    return `
        <p style="font-size: 15px; color: #8ba88b;">
            ✅ Acertos: ${acertos}/12 &nbsp;&nbsp; | &nbsp;&nbsp;
            🎯 Fase ${faseAtual}: ${acertosNaFase}/${metaDaFase} &nbsp;&nbsp; | &nbsp;&nbsp;
            ❌ Erros: ${erros}/${maxErros} &nbsp;&nbsp; | &nbsp;&nbsp;
            📍 ${localAtual}
        </p>
    `;
}

function iniciarJogo() {
    musicaFundo.currentTime = 0;

    musicaFundo.play()
    .then(() => {
        console.log("Música iniciada!");
    })
    .catch((erro) => {
        alert("Erro ao tocar música: " + erro.message);
        console.error(erro);
    });

    trocarFundo("fundo-ru");

    acertos = 0;
    erros = 0;
    faseAtual = 1;
    acertosNaFase = 0;
    metaDaFase = 1;
    localAtual = "RU — Bloco N";

    questoesDisponiveis = questoesFase1.map((_, indice) => indice);

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 1</h1>

        <h2>Restaurante Universitário — Bloco N</h2>

        <p>
            Você estava terminando de comer seu delicioso fricassê quando gritos começaram
            a ecoar do lado de fora.
        </p>

        <p>
            Um estudante, um de seus veteranos, entra cambaleando no RU e ataca outra pessoa!
            As portas do recinto são fechadas às pressas.
        </p>

        <p>Algo está muito errado.</p>

        <p>
            Para encontrar uma saída alternativa, você precisará resolver
            o primeiro desafio.
        </p>

        <button onclick="mostrarQuestao()">CONTINUAR</button>
    `;
}

function mostrarQuestao() {

    if (questoesDisponiveis.length === 0) {
        questoesDisponiveis = questoesFase1.map((_, indice) => indice);
    }

    const posicaoAleatoria =
        Math.floor(Math.random() * questoesDisponiveis.length);

    const indiceQuestao =
        questoesDisponiveis.splice(posicaoAleatoria, 1)[0];

    questaoAtual = questoesFase1[indiceQuestao];

    let botoes = "";

    questaoAtual.opcoes.forEach((opcao, indice) => {
        botoes += `
            <button onclick="responder(${indice})">
                ${opcao}
            </button>
        `;
    });

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 1 — DESAFIO</h1>

        <h2>Restaurante Universitário</h2>

        <p>${questaoAtual.pergunta}</p>

        <div>
            ${botoes}
        </div>
    `;
}

function responder(indiceEscolhido) {

    if (indiceEscolhido === questaoAtual.correta) {
        tocarSom(somAcerto);

        acertos++;
        acertosNaFase++;
        document.body.innerHTML = `
            ${statusJogo()}

            <h1>RESPOSTA CORRETA</h1>

            <p>✅ ${questaoAtual.resolucao}</p>

            <p>
                Você finalmente encontrou uma saída pelos fundos do RU
                e conseguiu escapar do prédio.
            </p>

            <p>
                Agora, seu próximo objetivo é chegar à portaria e descobrir
                que raios está acontecendo no campus.
            </p>

            <button onclick="irParaFase2()">
                CORRER PARA A PORTARIA
            </button>
        `;

    } else {

        erros++;

        if (erros >= maxErros) {
            derrota();
            return;
        }
        tocarSom(somErro);

        document.body.innerHTML = `
            ${statusJogo()}

            <h1>RESPOSTA INCORRETA</h1>

            <p>❌ Você perdeu tempo precioso.</p>

            <p>
                Os gritos estão ficando cada vez mais próximos.
                Uma nova tentativa será necessária.
            </p>

            <button onclick="mostrarQuestao()">
                NOVA QUESTÃO
            </button>
        `;
    }
}

function irParaFase2() {

    faseAtual = 2;
    trocarFundo("fundo-portaria");
    acertosNaFase = 0;
    metaDaFase = 2;
    localAtual = "Portaria — Entrada do Campus";

    questoesDisponiveisFase2 =
        questoesFase2.map((_, indice) => indice);

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 2</h1>

        <h2>Portaria — Entrada do Campus</h2>

        <p>
            Você sai correndo do Restaurante Universitário
            em direção ao Bloco K.
        </p>

        <p>
            No caminho, decide parar na portaria.
            Talvez os guardas saibam o que está acontecendo.
        </p>

        <p>
            Os doguinhos do campus continuam por ali, aparentemente despreocupados.
            Mesmo durante um apocalipse zumbi, você obviamente
            para alguns segundos para dar um chamego neles.
        </p>

        <p>
            Mas os guardas então te revelam que receberam uma ordem sinistra:
            ninguém pode deixar o campus!
        </p>

        <p>
            Para acessar o sistema da portaria e descobrir quem
            enviou essa ordem, você precisará superar dois desafios.
        </p>

        <button onclick="mostrarQuestaoFase2()">
            ACESSAR SISTEMA
        </button>
    `;
}
function mostrarQuestaoFase2() {

    if (questoesDisponiveisFase2.length === 0) {
        questoesDisponiveisFase2 =
            questoesFase2.map((_, indice) => indice);
    }

    const posicaoAleatoria =
        Math.floor(Math.random() * questoesDisponiveisFase2.length);

    const indiceQuestao =
        questoesDisponiveisFase2.splice(posicaoAleatoria, 1)[0];

    questaoAtual = questoesFase2[indiceQuestao];

    let botoes = "";

    questaoAtual.opcoes.forEach((opcao, indice) => {
        botoes += `
            <button onclick="responderFase2(${indice})">
                ${opcao}
            </button>
        `;
    });

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 2 — DESAFIO</h1>

        <h2>Portaria</h2>

        <p>${questaoAtual.pergunta}</p>

        <div>
            ${botoes}
        </div>
    `;
}
function responderFase2(indiceEscolhido) {

    if (indiceEscolhido === questaoAtual.correta) {
        tocarSom(somAcerto);

        acertos++;
        acertosNaFase++;

        if (acertosNaFase >= 2) {

            document.body.innerHTML = `
                ${statusJogo()}

                <h1>SISTEMA DESBLOQUEADO</h1>

                <p>✅ ${questaoAtual.resolucao}</p>

                <p>
                    Você consegue acessar as mensagens da portaria.
                </p>

                <p>
                    Entre os registros aparece uma mensagem estranha
                    mencionando arquivos armazenados nos computadores
                    da Biblioteca.
                </p>

                <p>
                    Talvez ali esteja a resposta para o que está
                    acontecendo...
                </p>

                <button onclick="irParaFase3()">
                    IR PARA A BIBLIOTECA
                </button>
            `;

        } else {

            document.body.innerHTML = `
                ${statusJogo()}

                <h1>RESPOSTA CORRETA</h1>

                <p>✅ ${questaoAtual.resolucao}</p>

                <p>
                    Uma parte do sistema foi desbloqueada.
                    Falta mais um desafio.
                </p>

                <button onclick="mostrarQuestaoFase2()">
                    PRÓXIMO DESAFIO
                </button>
            `;
        }

    } else {

        erros++;

        if (erros >= maxErros) {
            derrota();
            return;
        }
        tocarSom(somErro);

        document.body.innerHTML = `
            ${statusJogo()}

            <h1>RESPOSTA INCORRETA</h1>

            <p>❌ O sistema recusou sua tentativa.</p>

            <p>
                Você ouve gritos se aproximando da entrada.
                Será necessário tentar outro desafio.
            </p>

            <button onclick="mostrarQuestaoFase2()">
                NOVA QUESTÃO
            </button>
        `;
    }
}
function derrota() {
    musicaFundo.pause();
    tocarSom(somDerrota);
    document.body.innerHTML = `
        <h1>VOCÊ NÃO CONSEGUIU ESCAPAR</h1>

        <h2>O campus foi tomado.</h2>

        <p>
            Você cometeu ${maxErros} erros e os infectados
            chegaram até você.
        </p>

        <button onclick="location.reload()">
            TENTAR NOVAMENTE
        </button>
    `;
}
function irParaFase3() {

    faseAtual = 3;
    trocarFundo("fundo-biblioteca");
    acertosNaFase = 0;
    metaDaFase = 2;
    localAtual = "Biblioteca — Bloco I";

    questoesDisponiveisFase3 =
        questoesFase3.map((_, indice) => indice);

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 3</h1>

        <h2>Biblioteca — Bloco I</h2>

        <p>
            Você deixa a portaria e atravessa o campus
            em direção à biblioteca.
        </p>

        <p>
            O campus está agora assustadoramente silencioso...
        </p>

        <p>
            Os arquivos encontrados no sistema da portaria indicam
            que existe algo escondido nos computadores da biblioteca.
        </p>

        <p>
            Talvez o surto não tenha começado por acaso...
        </p>

        <p>
            Para acessar os arquivos confidenciais,
            você precisará quebrar duas camadas de segurança.
        </p>

        <button onclick="mostrarQuestaoFase3()">
            INVESTIGAR OS ARQUIVOS
        </button>
    `;
}
function mostrarQuestaoFase3() {

    if (questoesDisponiveisFase3.length === 0) {
        questoesDisponiveisFase3 =
            questoesFase3.map((_, indice) => indice);
    }

    const posicaoAleatoria =
        Math.floor(Math.random() * questoesDisponiveisFase3.length);

    const indiceQuestao =
        questoesDisponiveisFase3.splice(posicaoAleatoria, 1)[0];

    questaoAtual = questoesFase3[indiceQuestao];

    let botoes = "";

    questaoAtual.opcoes.forEach((opcao, indice) => {
        botoes += `
            <button onclick="responderFase3(${indice})">
                ${opcao}
            </button>
        `;
    });

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 3 — DESAFIO</h1>

        <h2>Biblioteca</h2>

        <p>${questaoAtual.pergunta}</p>

        <div>
            ${botoes}
        </div>
    `;
}
function responderFase3(indiceEscolhido) {

    if (indiceEscolhido === questaoAtual.correta) {
        tocarSom(somAcerto);

        acertos++;
        acertosNaFase++;

        if (acertosNaFase >= 2) {

            document.body.innerHTML = `
                ${statusJogo()}

                <h1>ARQUIVOS DESBLOQUEADOS</h1>

                <p>✅ ${questaoAtual.resolucao}</p>

                <p>
                    Você finalmente consegue abrir os documentos confidenciais.
                </p>

                <p>
                    Os registros mencionam um composto experimental
                    e movimentações suspeitas entre laboratórios do campus.
                </p>

                <p>
                    Há também registros de acesso vindos do Bloco K.
                </p>

                <p>
                    O surto não parece ter sido natural.
                </p>

                <p>
                    Seus colegas ainda podem estar no K.
                    Você precisa avisá-los.
                </p>

                <button onclick="irParaFase4()">
                    IR PARA O BLOCO K
                </button>
            `;

        } else {

            document.body.innerHTML = `
                ${statusJogo()}

                <h1>ACESSO PARCIAL</h1>

                <p>✅ ${questaoAtual.resolucao}</p>

                <p>
                    Uma camada de segurança foi quebrada.
                    Ainda falta desbloquear o arquivo principal.
                </p>

                <button onclick="mostrarQuestaoFase3()">
                    PRÓXIMO DESAFIO
                </button>
            `;
        }

    } else {

        erros++;

        if (erros >= maxErros) {
            derrota();
            return;
        }
        tocarSom(somErro);

        document.body.innerHTML = `
            ${statusJogo()}

            <h1>ACESSO NEGADO</h1>

            <p>❌ A senha calculada estava incorreta.</p>

            <p>
                Você ouve alguma coisa se movendo entre as estantes.
                Não há muito tempo.
            </p>

            <button onclick="mostrarQuestaoFase3()">
                NOVA QUESTÃO
            </button>
        `;
    }
}
function irParaFase4() {

    faseAtual = 4;
    trocarFundo("fundo-bloco-k");
    acertosNaFase = 0;
    metaDaFase = 3;
    localAtual = "Bloco K";

    questoesDisponiveisFase4 =
        questoesFase4.map((_, indice) => indice);

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 4</h1>

        <h2>Bloco K — Última Aula</h2>

        <p>
            Você deixa a biblioteca e corre até o prédio
            onde normalmente teria aula naquela noite.
        </p>

        <p>
            Algumas salas estão abertas.
            Mochilas e cadernos foram abandonados às pressas.
        </p>

        <p>
            Seu primeiro objetivo é encontrar seus colegas
            e avisá-los para fugir.
        </p>

        <p>
            Mas os documentos da biblioteca indicam que
            computadores deste bloco possuem informações
            fundamentais sobre a origem do surto.
        </p>

        <p>
            Para localizar seus colegas e acessar os registros,
            você precisará superar três desafios.
        </p>

        <button onclick="mostrarQuestaoFase4()">
            ENTRAR NO BLOCO K
        </button>
    `;
}
const questoesFase4 = [
    {
        pergunta: "Há 8 estudantes no Bloco K. Você precisa escolher 3 deles para formar um grupo de busca. Quantos grupos diferentes podem ser formados?",
        opcoes: ["24", "48", "56", "336"],
        correta: 2,
        resolucao: "Como a ordem não importa: C(8,3) = 56."
    },
    {
        pergunta: "Entre 7 salas diferentes, você deve escolher 2 para procurar sobreviventes. Quantas escolhas são possíveis?",
        opcoes: ["14", "21", "35", "42"],
        correta: 1,
        resolucao: "C(7,2) = 21."
    },
    {
        pergunta: "Há 6 estudantes e apenas 2 lanternas. De quantas maneiras podemos escolher quais 2 estudantes receberão as lanternas?",
        opcoes: ["12", "15", "30", "36"],
        correta: 1,
        resolucao: "A ordem não importa: C(6,2) = 15."
    },
    {
        pergunta: "De 10 computadores, 3 devem ser escolhidos para verificar os registros do surto. Quantos grupos de computadores podem ser escolhidos?",
        opcoes: ["60", "90", "120", "720"],
        correta: 2,
        resolucao: "C(10,3) = 120."
    },
    {
        pergunta: "Há 5 estudantes. Dois deles, João e Pedro, não podem ficar juntos em uma fila. Quantas filas diferentes são possíveis?",
        opcoes: ["48", "72", "96", "120"],
        correta: 1,
        resolucao: "Total: 5! = 120. Juntos: 4! × 2 = 48. Logo, 120 − 48 = 72."
    },
    {
        pergunta: "O laboratório possui 8 cartões de acesso, mas apenas 2 devem ser escolhidos. Quantos pares diferentes podem ser formados?",
        opcoes: ["16", "28", "56", "64"],
        correta: 1,
        resolucao: "C(8,2) = 28."
    },
    {
        pergunta: "Há 9 estudantes e você precisa escolher 4 para investigar uma sala. Quantos grupos diferentes existem?",
        opcoes: ["84", "126", "252", "3024"],
        correta: 1,
        resolucao: "C(9,4) = 126."
    },
    {
        pergunta: "Cinco pessoas precisam entrar em uma sala em fila, mas Ana deve obrigatoriamente ser a primeira. Quantas filas são possíveis?",
        opcoes: ["12", "24", "60", "120"],
        correta: 1,
        resolucao: "Ana fica fixa. Restam 4 pessoas: 4! = 24."
    },
    {
        pergunta: "Você encontrou 7 chaves, mas precisa escolher exatamente 3 para levar consigo. Quantos conjuntos diferentes são possíveis?",
        opcoes: ["21", "35", "42", "210"],
        correta: 1,
        resolucao: "C(7,3) = 35."
    },
    {
        pergunta: "Seis estudantes precisam formar uma fila, mas dois deles devem permanecer juntos. Quantas filas são possíveis?",
        opcoes: ["120", "240", "360", "720"],
        correta: 1,
        resolucao: "Os dois formam um bloco: 5! × 2 = 240."
    }
];

let questoesDisponiveisFase4 = [];
const questoesFase5 = [
    {
        pergunta: "O laboratório possui 10 amostras diferentes. Você precisa escolher exatamente 4 para testar. Quantos grupos diferentes podem ser formados?",
        opcoes: ["120", "210", "240", "5040"],
        correta: 1,
        resolucao: "Como a ordem não importa: C(10,4) = 210."
    },
    {
        pergunta: "Seis pesquisadores precisam formar uma fila para entrar na área de descontaminação. Dois deles devem permanecer juntos. Quantas filas são possíveis?",
        opcoes: ["120", "240", "360", "720"],
        correta: 1,
        resolucao: "Os dois formam um bloco: 5! × 2 = 240."
    },
    {
        pergunta: "Há 8 cartões de acesso diferentes. Três devem ser usados em uma ordem específica. Quantas sequências podem ser formadas?",
        opcoes: ["56", "168", "336", "512"],
        correta: 2,
        resolucao: "8 × 7 × 6 = 336 sequências."
    },
    {
        pergunta: "Sete pessoas precisam formar uma fila. Ana e Bruno não podem ficar juntos. Quantas filas são possíveis?",
        opcoes: ["2880", "3600", "4320", "5040"],
        correta: 1,
        resolucao: "Total: 7! = 5040. Juntos: 6! × 2 = 1440. Logo, 5040 − 1440 = 3600."
    },
    {
        pergunta: "Quantos anagramas diferentes podem ser formados com as letras AABC?",
        opcoes: ["6", "12", "18", "24"],
        correta: 1,
        resolucao: "4! / 2! = 12 anagramas."
    },
    {
        pergunta: "Entre 9 recipientes diferentes, três precisam ser escolhidos e colocados em uma ordem específica no equipamento. Quantas possibilidades existem?",
        opcoes: ["84", "504", "729", "3024"],
        correta: 1,
        resolucao: "9 × 8 × 7 = 504 possibilidades."
    },
    {
        pergunta: "Uma senha possui 5 algarismos distintos. O primeiro não pode ser zero. Quantas senhas podem ser formadas usando os algarismos de 0 a 9?",
        opcoes: ["15120", "27216", "30240", "50400"],
        correta: 1,
        resolucao: "9 × 9 × 8 × 7 × 6 = 27216 senhas."
    },
    {
        pergunta: "Há 8 pesquisadores e uma equipe de 4 deve ser formada. Ana obrigatoriamente deve participar. Quantas equipes são possíveis?",
        opcoes: ["28", "35", "56", "70"],
        correta: 1,
        resolucao: "Ana já está escolhida. Escolhemos mais 3 entre os outros 7: C(7,3) = 35."
    },
    {
        pergunta: "Cinco homens e cinco mulheres precisam formar uma fila alternando os sexos. Quantas filas diferentes são possíveis?",
        opcoes: ["14400", "28800", "57600", "120000"],
        correta: 1,
        resolucao: "Há 2 padrões possíveis. Em cada um: 5! × 5!. Logo, 2 × 5! × 5! = 28800."
    },
    {
        pergunta: "O antídoto exige escolher 3 substâncias dentre 8 disponíveis. A ordem de escolha não importa. Quantas combinações são possíveis?",
        opcoes: ["24", "56", "112", "336"],
        correta: 1,
        resolucao: "C(8,3) = 56 combinações."
    }
];

let questoesDisponiveisFase5 = [];
function mostrarQuestaoFase4() {

    if (questoesDisponiveisFase4.length === 0) {
        questoesDisponiveisFase4 =
            questoesFase4.map((_, indice) => indice);
    }

    const posicaoAleatoria =
        Math.floor(Math.random() * questoesDisponiveisFase4.length);

    const indiceQuestao =
        questoesDisponiveisFase4.splice(posicaoAleatoria, 1)[0];

    questaoAtual = questoesFase4[indiceQuestao];

    let botoes = "";

    questaoAtual.opcoes.forEach((opcao, indice) => {
        botoes += `
            <button onclick="responderFase4(${indice})">
                ${opcao}
            </button>
        `;
    });

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 4 — DESAFIO</h1>

        <h2>Bloco K</h2>

        <p>${questaoAtual.pergunta}</p>

        <div>
            ${botoes}
        </div>
    `;
}
function responderFase4(indiceEscolhido) {

    if (indiceEscolhido === questaoAtual.correta) {
        tocarSom(somAcerto);

        acertos++;
        acertosNaFase++;

        if (acertosNaFase >= 3) {

            document.body.innerHTML = `
                ${statusJogo()}

                <h1>ORIGEM LOCALIZADA</h1>

                <p>✅ ${questaoAtual.resolucao}</p>

                <p>
                    Você consegue avisar seus colegas e encontra
                    registros importantes nos computadores do Bloco K.
                </p>

                <p>
                    Os dados confirmam que o surto não foi natural.
                </p>

                <p>
                    Um composto experimental aparece repetidamente
                    nos registros.
                </p>

                <p>
                    O último local associado ao composto é o
                    <strong>Bloco T</strong>.
                </p>

                <p>
                    Os documentos também mencionam um possível antídoto.
                </p>

                <button onclick="irParaFase5()">
                    CORRER PARA O BLOCO T
                </button>
            `;

        } else {

            document.body.innerHTML = `
                ${statusJogo()}

                <h1>DESAFIO SUPERADO</h1>

                <p>✅ ${questaoAtual.resolucao}</p>

                <p>
                    Você avança pelo Bloco K.
                    Ainda há informações importantes para encontrar.
                </p>

                <button onclick="mostrarQuestaoFase4()">
                    PRÓXIMO DESAFIO
                </button>
            `;
        }

    } else {

        erros++;

        if (erros >= maxErros) {
            derrota();
            return;
        }
        tocarSom(somErro);

        document.body.innerHTML = `
            ${statusJogo()}

            <h1>RESPOSTA INCORRETA</h1>

            <p>❌ Você perdeu tempo.</p>

            <p>
                Barulhos começam a surgir nos corredores do Bloco K.
                Os infectados estão se aproximando.
            </p>

            <button onclick="mostrarQuestaoFase4()">
                NOVA QUESTÃO
            </button>
        `;
    }
}
function irParaFase5() {

    faseAtual = 5;
    trocarFundo("fundo-laboratorio");
    acertosNaFase = 0;
    metaDaFase = 4;
    localAtual = "Bloco T — Laboratório";

    questoesDisponiveisFase5 =
        questoesFase5.map((_, indice) => indice);

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 5</h1>

        <h2>Bloco T — O Antídoto</h2>

        <p>
            O Bloco T fica a poucos metros do K.
            Você corre até o laboratório indicado nos arquivos.
        </p>

        <p>
            A porta está fechada e o sistema de contenção
            ainda está ativo.
        </p>

        <p>
            Através do vidro, você consegue ver recipientes
            identificados como protótipos de um antídoto.
        </p>

        <p>
            Para liberar o laboratório, será necessário
            resolver quatro desafios finais.
        </p>

        <button onclick="mostrarQuestaoFase5()">
            ACESSAR O LABORATÓRIO
        </button>
    `;
}
function mostrarQuestaoFase5() {

    if (questoesDisponiveisFase5.length === 0) {
        questoesDisponiveisFase5 =
            questoesFase5.map((_, indice) => indice);
    }

    const posicaoAleatoria =
        Math.floor(Math.random() * questoesDisponiveisFase5.length);

    const indiceQuestao =
        questoesDisponiveisFase5.splice(posicaoAleatoria, 1)[0];

    questaoAtual = questoesFase5[indiceQuestao];

    let botoes = "";

    questaoAtual.opcoes.forEach((opcao, indice) => {
        botoes += `
            <button onclick="responderFase5(${indice})">
                ${opcao}
            </button>
        `;
    });

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>FASE 5 — DESAFIO FINAL</h1>

        <h2>Laboratório de Engenharia Química</h2>

        <p>${questaoAtual.pergunta}</p>

        <div>
            ${botoes}
        </div>
    `;
}
function responderFase5(indiceEscolhido) {

    if (indiceEscolhido === questaoAtual.correta) {
        tocarSom(somAcerto);

        acertos++;
        acertosNaFase++;

        if (acertosNaFase >= 4) {

            document.body.innerHTML = `
                ${statusJogo()}

                <h1>CONTENÇÃO DESATIVADA</h1>

                <p>✅ ${questaoAtual.resolucao}</p>

                <p>
                    O último código é aceito.
                </p>

                <p>
                    As travas do laboratório são liberadas
                    e a porta finalmente se abre.
                </p>

                <p>
                    Dentro de uma câmara refrigerada,
                    você encontra o protótipo do antídoto.
                </p>

                <button onclick="vitoria()">
                    PEGAR O ANTÍDOTO
                </button>
            `;

        } else {

            document.body.innerHTML = `
                ${statusJogo()}

                <h1>CÓDIGO ACEITO</h1>

                <p>✅ ${questaoAtual.resolucao}</p>

                <p>
                    Uma das travas de contenção foi desativada.
                </p>

                <p>
                    Ainda faltam ${4 - acertosNaFase}
                    desafios para liberar o laboratório.
                </p>

                <button onclick="mostrarQuestaoFase5()">
                    PRÓXIMO DESAFIO
                </button>
            `;
        }

    } else {

        erros++;

        if (erros >= maxErros) {
            derrota();
            return;
        }
        tocarSom(somErro);

        document.body.innerHTML = `
            ${statusJogo()}

            <h1>CÓDIGO REJEITADO</h1>

            <p>❌ O sistema recusou sua resposta.</p>

            <p>
                O alarme do laboratório começa a soar.
                Os infectados podem ouvir isso.
            </p>

            <button onclick="mostrarQuestaoFase5()">
                NOVA QUESTÃO
            </button>
        `;
    }
}
function vitoria() {
    musicaFundo.pause();
    tocarSom(somVitoria);

    localAtual = "Bloco T — Antídoto recuperado";

    document.body.innerHTML = `
        ${statusJogo()}

        <h1>VOCÊ SOBREVIVEU</h1>

        <h2>Antídoto recuperado</h2>

        <p>
            Depois de atravessar um campus tomado por infectados,
            você finalmente conseguiu chegar ao laboratório.
        </p>

        <p>
            Os documentos confirmavam a verdade:
            o surto não havia ocorrido naturalmente.
        </p>

        <p>
            Agora você segura em suas mãos o único protótipo
            conhecido do antídoto.
        </p>

        <p>
            Você poderia tentar escapar sozinho...
        </p>

        <p>
            Mas seus colegas e outros sobreviventes
            ainda estão espalhados pela UTFPR.
        </p>

        <h2>Você decide voltar para salvá-los.</h2>

        <p>
            ✅ 12 desafios superados.
        </p>

        <p>
            🧟 Campus sobrevivido.
        </p>

        <p>
            💉 Antídoto recuperado.
        </p>

        <button onclick="location.reload()">
            JOGAR NOVAMENTE
        </button>
    `;
}