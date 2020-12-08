class Camera {

    constructor(elemento) {

        this._elemento = elemento;
    }
    _template() {

        return `
        <div class="row">
        <div class="col-md-12 text-center" id="tituloCapturarImagem">
            <h3>Digite seu CPF e logo em seguida posicione seu rosto dentro da mascara.</h3>
            <div id="negociacoesView"></div>

            <center>
                <div class="row" id="loadingLinha">
                    <div class="col-sm-12">
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                    </div>
                </div>
            </center>
            <h4 id="contagemCapturaFotos"></h4>
        </div>
        <div class="col-md-12 text-center" style="min-height:20px!important;">
            <b><p id="textoCapturaFotos" class="textoPreto"></p></b></br>
        </div>
        </br>
        <!-- camera -->
        <div class="col-md-12" id="divCapturandoFotos">
            <center>
                <video class="foto img-responsive refletir-esquerda" id="cameraCadastro" autoplay muted playsinline></video>
                <img src="img/verde.png" id="mascaraVerde">
                <img src="img/cinza.png" id="mascaraCinza">
            </center>
            
        </div>
        <!--Aqui cria o canvas e o input-->
        <canvas id="canvas" width="320" height="240"></canvas>

        <center>
        <div class="md-form form-group" id="campoMatriculaAutenticacao">
            <br><br>
            <input class="form-control" placeholder="Digite seu CPF:" id="valorCpf" maxlength="14" onkeydown="javascript: fMasc( this, mCPF );">
        </div>
        <h4>1º Passo: Digite primeiro o seu CPF</h4>
    </center>

    </div>
    <button type="button" class="btn btn-primary" data-toggle="modal" id="btnAbrirModalPermissao" data-target="#ModalGenerica">
    Abrir modal
  </button>
`;
    }

    update() {
        this._elemento.innerHTML = this._template();
    }
}