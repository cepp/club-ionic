import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the NotificacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-notificacao',
    templateUrl: 'notificacao.html',
})
export class NotificacaoPage {

    notificacoes = [{ data: '17/04/2018', titulo: 'Convite Emitido', mensagem: 'Convite emitido pelo site para DEODORO ORODED para o dia 17/04/2018', lido: false },
        { data: '09/04/2018', titulo: 'Parabéns', mensagem: 'Parabéns pelo seu dia, o Clube tem o ernorme prazer em tê-lo como sócio.', lido: false },
        { data: '09/04/2018', titulo: 'Convite Emitido', mensagem: 'Convite emitido pelo site para DEODORO ORODED para o dia 13/04/2018', lido: false },
        { data: '15/03/2018', titulo: 'Convite Emitido', mensagem: 'Convite emitido pelo site para DEODORO ORODED para o dia 15/03/2018', lido: false },
        { data: '15/03/2018', titulo: 'Bem Vindo', mensagem: 'O Clube tem o enorme prazer em recebê-lo ao novo serviço ao sócio', lido: true }];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertController: AlertController) {
    }

    ionViewDidLoad() {
    }


    mostrarNotificacao(notificacao) {
        notificacao.lido = true;

        this.alertController.create({
            enableBackdropDismiss: true,
            message: notificacao.mensagem,
            title: notificacao.titulo,
            subTitle: notificacao.data,
            buttons: ['Ok']
        }).present();

    }
}
