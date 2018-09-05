import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/usuario.provider";
import {AbstractPage} from "../../model/abstract-page";
import {SocialComentario} from "../../model/social";

/**
 * Generated class for the EventoComentariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-evento-comentarios',
    templateUrl: 'evento-comentarios.html',
})
export class EventoComentariosPage extends AbstractPage {

    socialComentarios: SocialComentario[] = [];

    constructor(protected loadingController: LoadingController,
                protected toastController: ToastController,
                protected alertController: AlertController,
                protected usuarioProvider: UsuarioProvider,
                public navCtrl: NavController, public navParams: NavParams) {
        super(loadingController, toastController, alertController, usuarioProvider);
        this.socialComentarios = this.navParams.get('comentarios');
    }

    ionViewDidLoad() {
    }

}
