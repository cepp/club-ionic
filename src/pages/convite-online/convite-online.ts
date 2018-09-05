import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConviteEmitidoPage} from "./convite-emitido";
import {ConvidadoPage} from "./convidado-page";

@Component({
    selector: 'page-convite-online',
    templateUrl: 'convite-online.html',
})
export class ConviteOnlinePage {

    conviteEmitidoPage = ConviteEmitidoPage;
    convidadoPage = ConvidadoPage;
    tabSelecionada = 0;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        let pagina = navParams.get('pagina');
        if(pagina) {
            this.tabSelecionada = pagina;
        }
    }

    ionViewDidLoad() {
    }

}
