let $ = document.querySelector.bind(document);
let video = $('video');
let divCadastro = $("#divCadastro");
let validaCampoEmail = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/;
let divCapturarFotos = $("#divCapturarFotos");
let btnCadastrar = $("#btnCadastrar");
let cameraCadastro = $("#cameraCadastro");
let divCad = $("#divCad");
let divImagensCadastro = $("#divImagensCadastro");
let modalClose = $("#modalClose");
let btnCapturar = $("#btnCapturar");
let contagemCapturaFotos = $("#contagemCapturaFotos");
let i = 0;

// Removendo Fotos
function removendoFotos() {
    //console.log("Removendo Fotos");
    let divImagensCadastro = document.getElementById("divImagensCadastro");
    while (divImagensCadastro.firstChild) {
        divImagensCadastro.removeChild(divImagensCadastro.firstChild);
    }
}

// Criar Canvas
function criarCanvas() {
    //console.log("CriarCanvas");
    let divImagensCadastro = document.getElementById("divImagensCadastro");
    for (let i = 0; i < qtdCaptura; i++) {
        let canvas = document.createElement("canvas");
        canvas.setAttribute('id', 'imagem' + i);
        divImagensCadastro.appendChild(canvas);
        canvas.setAttribute('class', 'estiloCanvas invisivel');
    }
}

//Tirando fotos e deixando em escala de cinza
function tirandoFotos() {
    let ctx;
    let intervaloDeTempo = setInterval(function() {
        if (i < qtdCaptura) {
            let imagem = $("#imagem" + i);
            mostraImagem(imagem);
            contagemCapturaFotos.textContent = i + 1 + " fotos capturadas.";

            //Deixando as imagens em escala de cinza
            let pl = null;
            pl = new SimpleImage(imagem);
            for (let pixel of pl.values()) {
                let avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
                pixel.setRed(avg);
                pixel.setGreen(avg);
                pixel.setBlue(avg);
            }
            pl.drawTo(imagem);
            i++;
        } else {
            i = 0;
            stopIntervaloDeTempo();
            enviandoDados();
        }
    }, 100);

    //Intervalo de Tempo
    function stopIntervaloDeTempo() {
        clearInterval(intervaloDeTempo);
    }
}

//Mostrar imagem
function mostraImagem(imagem) {
    //console.log("MostraImagem");
    //console.log(imagem);
    imagem.width = video.videoWidth;
    imagem.height = video.videoHeight;
    ctx = imagem.getContext('2d').
    drawImage(video, 0, 0, imagem.width, imagem.height);
}