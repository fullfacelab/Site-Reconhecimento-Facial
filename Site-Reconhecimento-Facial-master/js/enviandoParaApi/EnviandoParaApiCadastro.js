var $ = document.querySelector.bind(document);
var btnOK = $("#btnOK");
var btnTentarNovamente = $("#btnTentarNovamente");
var mascaraCinza = $("#mascaraCinza");
var mascaraVerde = $("#mascaraVerde");
var loadingLinha = $("#loadingLinha");
var respostaModal = $("#respostaModal");
var iconeSucesso = $(".iconeSucesso");
var iconeInsucesso = $(".iconeInsucesso");

iconeSucesso.classList.add("invisivel");
iconeInsucesso.classList.add("invisivel");

loadingLinha.classList.add("invisivel");

function cadastradoComSucesso() {
    btnOK.classList.remove("invisivel");
    btnTentarNovamente.classList.add("invisivel");
    loadingLinha.classList.add("invisivel");
    iconeSucesso.classList.remove("invisivel");
    iconeInsucesso.classList.add("invisivel");
    respostaModal.classList.remove("invisivel");
    respostaModal.textContent = "Olá (Fulano), você foi cadastrado com sucesso, seja bem vindo !!!";
    removendoFotos();
    bloquearCapturarQuandoAparecerModal = false;
}

function naoCadastrado() {
    btnOK.classList.add("invisivel");
    btnTentarNovamente.classList.remove("invisivel");
    loadingLinha.classList.add("invisivel");
    iconeSucesso.classList.add("invisivel");
    iconeInsucesso.classList.remove("invisivel");
    respostaModal.textContent = "Olá, não foi possivel efetuar seu cadastro.";
    //removendoFotos();
    bloquearCapturarQuandoAparecerModal = false;
}

btnTentarNovamente.addEventListener("click", function() {
    bloquearCapturarQuandoAparecerModal = true;
});


btnOK.addEventListener("click", function() {
    location.reload();
});

function enviandoDados() {
    var arrayFotos = [];

    for (var pp = 0; pp < qtdCaptura; pp++) {
        arrayFotos[pp] = $("#imagem" + pp).toDataURL("image/jpeg", 0.5).replace("data:image/jpeg;base64,", "");
    }

    var json = {
        //Fotos
        arrayFotos,
        //Token
        accessToken: apenasToken,
        //Cpf usuario
        keys: [{
            key: 'cpf',
            value: valorCpf.value.replace(".", "").replace(".", "").replace("-", "")
        }],
        //Nome Projeto
        projectName: Codigo_projeto
    }

    var body = JSON.stringify(json);

    loadingLinha.classList.remove("invisivel");
    contagemCapturaFotos.textContent = "";
    mascaraCinza.classList.remove("invisivel");
    mascaraVerde.classList.add("invisivel");
    // removendoFotos();

    jQuery(document).ready(function($) {
        $.ajax({
            type: "POST",
            url: urlApiCad,
            data: body,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response, ret) {
                cadastradoComSucesso();
                $('#ModalGenerica').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            },
            failure: function(response, ret) {
                naoCadastrado();
                $('#ModalGenerica').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            },
            error: function(response, ret) {
                naoCadastrado();
                $('#ModalGenerica').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }
        });
    });
}