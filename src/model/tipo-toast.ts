export class TipoToast {
    static ERRO: TipoToast = new TipoToast('toast-error');
    static WARN: TipoToast = new TipoToast('toast-warn');
    static INFO: TipoToast = new TipoToast('toast-info');
    static SUCCESS: TipoToast = new TipoToast('toast-success');

    constructor(cssClass: string) {
        this.cssClass = cssClass;
    }

    cssClass: string;
}