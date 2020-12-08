class Modal {

    constructor(elemento) {

        this._elemento = elemento;
    }
    _template() {

        return `
        <div class="modal fade" id="ModalGenerica" role="dialog">
            <br><br><br>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div id="divRespostaModal">
                        <br>
                            <center>
                                <span class="glyphicon glyphicon-ok iconeSucesso"></span>
                                <span class="glyphicon glyphicon-remove iconeInsucesso"></span>
                                <span class="glyphicon glyphicon-camera" id="iconeCamera"></span>
                                <br>
                                <h3 id="respostaModal"></h3>
                            </center>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <center>
                        <button type="button" class="btn btn-default" id="btnTentarNovamente" data-dismiss="modal">Tentar Novamente</button>
                        <button type="button" class="btn btn-default" id="btnOK" data-dismiss="modal">OK</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
`;
    }

    update() {
        this._elemento.innerHTML = this._template();
    }
}