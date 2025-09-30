let mapa = [];
let tamanhoQuadrado = 100;

// Referências de imagens
let imagemInicio = document.getElementById('img-inicio');
let imagemMar = document.getElementById('img-mar');
let imagemMato = document.getElementById('img-mato');
let imagemBandeira = document.getElementById('img-bandeira');
let imagemMato2 = document.getElementById('img-mato2');
let imagemPraia = document.getElementById('img-praia');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let largura = 0;
let altura = 0;

// Função para adicionar botões ao mapa
let imagemSelecionada = null;
const containerBtnn = document.getElementById('container-btnn');

function gerarMapa() {
    largura = document.getElementById('width').value;
    altura = document.getElementById('height').value;

    inicializadorArray(largura, altura);

    if (largura <= 0 || altura <= 0) {
        alert("Largura e altura devem ser maiores que zero.");
        return;
    } else {
        largura = parseInt(largura);
        altura = parseInt(altura);
        if (isNaN(largura) || isNaN(altura)) {
            alert("Por favor, insira apenas números.");
            return;
        }
    }

    canvas.width = largura * 100;
    canvas.height = altura * 100;
    ctx.strokeStyle = '#a2d5a2';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    printMapa();
}

function inicializadorArray(largura, altura) {
    for (var x = 0; x < largura; x++) {
        mapa[x] = [];
        for (var y = 0; y < altura; y++)
            mapa[x].push("vazio");
    }
}

function printMapa() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var x = 0; x < largura; x++) {
        for (var y = 0; y < altura; y++) {
            let posX = x * tamanhoQuadrado;
            let posY = y * tamanhoQuadrado;

            if (mapa[x][y] == "vazio") {
                ctx.strokeRect(posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "inicio") {
                ctx.drawImage(imagemInicio, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "mar") {
                ctx.drawImage(imagemMar, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "mato") {
                ctx.drawImage(imagemMato, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "bandeira") {
                ctx.drawImage(imagemBandeira, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "mato2") {
                ctx.drawImage(imagemMato2, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            } else if (mapa[x][y] == "praia") {
                ctx.drawImage(imagemPraia, posX, posY, tamanhoQuadrado, tamanhoQuadrado);
            }
        }
    }
}

// Salvar em PDF
async function salvarMapa() {
    const canvas = document.getElementById('canvas');
    const titulo = document.getElementById('name').value.trim();

    if (!titulo) {
        alert("Por favor, insira um título para salvar o mapa.");
        return;
    }

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const orientation = canvasWidth > canvasHeight ? 'l' : 'p';

    const pdf = new jspdf.jsPDF({
        orientation: orientation,
        unit: 'px',
        format: [canvasWidth, canvasHeight]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, canvasWidth, canvasHeight);
    pdf.save(`${titulo}.pdf`);
}

// Seleção de botões
containerBtnn.addEventListener('click', (event) => {
    const botaoClicado = event.target.closest('.btnn');
    
    if (botaoClicado) {
        const imagemDoBotao = botaoClicado.querySelector('img');
        imagemSelecionada = imagemDoBotao;

        const botoes = document.querySelectorAll('.btnn');
        botoes.forEach(btn => {
            btn.classList.remove('selecionado');
        });
        
        botaoClicado.classList.add('selecionado');
    }
});

// Inserção de imagens no mapa
canvas.addEventListener('click', (event) => {
    if (imagemSelecionada) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const posX = Math.floor(x / tamanhoQuadrado) * tamanhoQuadrado;
        const posY = Math.floor(y / tamanhoQuadrado) * tamanhoQuadrado;

        const value = imagemSelecionada.getAttribute('value');
        mapa[posX / 100][posY / 100] = value;

        printMapa();
    }
});
