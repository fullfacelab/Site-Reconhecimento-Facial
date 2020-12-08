var $ = document.querySelector.bind(document);
tirouFoto = false;
var bloquearCapturarQuandoAparecerModal = true;

apagandoFotos = false;
window.onload = function() {
    var video = $('#cameraCadastro');
    var canvas = $('#canvas');
    var context = canvas.getContext('2d');

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracking.track('#cameraCadastro', tracker, { camera: true });

    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
            var cpf = $("#valorCpf");
            var cpfExistente = validaCPF(cpf.value.replace(".", ""));
            //if (rect.x >= 30 && rect.x <= 130 && rect.y >= 15 && rect.y <= 130 && cpfExistente == true) {
            if (rect.x >= 160 && rect.x <= 350 && rect.y >= 30 && rect.y <= 110 && cpfExistente == true && bloquearCapturarQuandoAparecerModal == true) {
                cpf.classList.remove("bordaErro");
                criarCanvas();
                !tirouFoto ? tirandoFotos() : null;
                tirouFoto = true;
                context.strokeStyle = 'rgba(0, 0, 0, 0)';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px ', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                mascaraCinza.classList.add("invisivel");
                mascaraVerde.classList.remove("invisivel");
            } else {
                tirouFoto = false;
                //console.log("fora da mascara ou cpf invalido !!!");
                //removendoFotos();
                cpf.classList.add("bordaErro");
                jaPassou = false;
                clearInterval(mostraImagem);
                mascaraCinza.classList.remove("invisivel");
                mascaraVerde.classList.add("invisivel");
                i = 0;
            }
        });
    });
};