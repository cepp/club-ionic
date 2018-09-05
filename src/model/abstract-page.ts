import {AlertController, LoadingController, ToastController} from "ionic-angular";
import {UsuarioProvider} from "../providers/usuario/usuario.provider";
import {AbstractComponent} from "./abstract-component";
import {TipoToast} from "./tipo-toast";

export abstract class AbstractPage extends AbstractComponent {

    protected loading;

    constructor(protected loadingController: LoadingController,
                protected toastController: ToastController,
                protected alertController: AlertController,
                protected usuarioProvider: UsuarioProvider) {
        super();
    }

    criarLoading() {
        this.loading = this.loadingController.create({
            content: 'Processando...',
            spinner: 'ios'
        });
    }

    criarToast(menssagem: string, mostrarBotao: boolean, tipo: TipoToast) {
        return mostrarBotao ?
                    this.toastController.create({
                        message: menssagem,
                        showCloseButton: true,
                        cssClass: tipo.cssClass,
                        closeButtonText: 'OK'
                    })
                :

                    this.toastController.create({
                        message: menssagem,
                        duration: 6000,
                        cssClass: tipo.cssClass
                    });
    }

    criarMensagemConfirmacao(menssagem: string, acaoConfirmar: any = {}, acaoCancelar: any = {}) {
        return this.alertController.create({
            title: 'Confirmação',
            message: menssagem,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => acaoCancelar
                },
                {
                    text: 'Confirmar',
                    handler: () => acaoConfirmar
                }
            ]
        });
    }
}