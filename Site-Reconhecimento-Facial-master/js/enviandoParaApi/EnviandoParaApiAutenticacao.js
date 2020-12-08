//var $ = document.querySelector.bind(document);
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

function autenticadoComSucesso() {
    btnOK.classList.remove("invisivel");
    btnTentarNovamente.classList.add("invisivel");
    loadingLinha.classList.add("invisivel");
    iconeSucesso.classList.remove("invisivel");
    iconeInsucesso.classList.add("invisivel");
    respostaModal.classList.remove("invisivel");
    respostaModal.textContent = "Olá (Fulano), você foi autenticado com sucesso, seja bem vindo !!!";
    removendoFotos();
    bloquearCapturarQuandoAparecerModal = false;
}

function naoAutenticado() {
    btnOK.classList.add("invisivel");
    btnTentarNovamente.classList.remove("invisivel");
    loadingLinha.classList.add("invisivel");
    iconeSucesso.classList.add("invisivel");
    iconeInsucesso.classList.remove("invisivel");
    respostaModal.textContent = "Olá, não foi possivel efetuar a autenticação.";
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
    var pictures = [];

    for (var pp = 0; pp < qtdCaptura; pp++) {
        pictures[pp] = $("#imagem" + pp).toDataURL("image/jpeg", 0.5).replace("data:image/jpeg;base64,", "");
    }

    var json = {
        //Fotos
        pictures,
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
    // gerandoToken();
    loadingLinha.classList.remove("invisivel");
    contagemCapturaFotos.textContent = "";
    mascaraCinza.classList.remove("invisivel");
    mascaraVerde.classList.add("invisivel");
    // removendoFotos();

    //console.log(body);

    jQuery(document).ready(function($) {
        $.ajax({
            type: "POST",
            url: urlApiAut,
            data: body,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response, ret) {
                autenticadoComSucesso();
                $('#ModalGenerica').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            },
            failure: function(response, ret) {
                naoAutenticado();
                $('#ModalGenerica').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            },
            error: function(response, ret) {
                naoAutenticado();

                $('#ModalGenerica').modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }
        });
    });
}