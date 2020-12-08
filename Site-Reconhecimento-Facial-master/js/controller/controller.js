class Controller {
    constructor() {
        this._camera = new Camera($('#divCamera'));
        this._modal = new Modal($('#divModalGenerica'));

        this._camera.update();
        this._modal.update();
    }
}