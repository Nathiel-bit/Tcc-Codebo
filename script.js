function gerarMapa(){
    var largura = document.getElementById('width').value;
    var altura = document.getElementById('height').value;

    inicializadorArray(largura, altura);

    if (largura <= 0 || altura <= 0) {
        alert("Largura e altura devem ser maiores que zero.");
        return;
    } else{
        largura = parseInt(largura);
        altura = parseInt(altura);
        if (isNaN(largura) || isNaN(altura)) {
            alert("Por favor, insira apenas números, meu caro amigo(a).");
            return;
        }
    }

    var canvas = document.getElementById('canvas');
    canvas.width = largura * 100;
    canvas.height = altura * 100;

    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#a2d5a2'; // Cor do contorno dos quadrados
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var x = 0; x < largura; x++) {
        for (var y = 0; y < altura; y++) {
            ctx.strokeRect(x * 100, y * 100, 100, 100);
        }
    }
}

mapa = [];

function inicializadorArray(largura, altura){
for ( var x = 0; x < largura; x++){
    mapa [x] = [];
    for(var y = 0; y < altura; y++)
        mapa[x].push = ( "vazio");
    }
}

function printMapa(){
for(var x = 0; x < largura; x++){
    for(var y = 0; y < altura; y++){
        if(mapa [x][y] == "vazio"){
            ctx.strokeRect(x * 100, y * 100, 100, 100);
        }
    }
 }
}

// Função para desenhar o cubo no canvas
window.addEventListener('mousedown', function(event) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.to
    var posX = Math.floor(x / 100) * 100;
    var posY = Math.floor(y / 100) * 100;

    // Desenha o cubo na posição calculada
    ctx.drawImage(cubos, 0, 0, 100, 100, posX, posY, 100, 100);
});


//Salvar em PDF
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