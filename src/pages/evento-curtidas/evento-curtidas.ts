import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SocialCurtida} from "../../model/social";
import {AbstractPage} from "../../model/abstract-page";
import {UsuarioProvider} from "../../providers/usuario/usuario.provider";

/**
 * Generated class for the EventoCurtidasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-evento-curtidas',
    templateUrl: 'evento-curtidas.html',
})
export class EventoCurtidasPage extends AbstractPage {

    socialCurtidas: SocialCurtida[] = [];

    constructor(protected loadingController: LoadingController,
                protected toastController: ToastController,
                protected alertController: AlertController,
                protected usuarioProvider: UsuarioProvider,
                public navCtrl: NavController, public navParams: NavParams) {
        super(loadingController, toastController, alertController, usuarioProvider);
        this.socialCurtidas = this.navParams.get('curtidas');
    }

    ionViewDidLoad() {
    }

}
