import {Component} from '@angular/core';
import {AlertController, App, LoadingController, ToastController, ViewController} from 'ionic-angular';
import {ConvidadoProvider} from "../../providers/convidado/convidado.provider";
import {Pessoa} from "../../model/pessoa";
import {EmitirConvitePage} from '../emitir-convite/emitir-convite';
import {AbstractPage} from "../../model/abstract-page";
import {UsuarioProvider} from "../../providers/usuario/usuario.provider";
import {UsuarioPage} from "../usuario/usuario-page";
import {TipoToast} from "../../model/tipo-toast";

@Component({
    templateUrl: 'convidado-page.html',
})
export class ConvidadoPage extends AbstractPage{

    convidados: Pessoa[];
    convidadosPesquisa: Pessoa[];

    constructor(public viewCtrl: ViewController,
                public appCtrl: App,
                private convidadoProvider: ConvidadoProvider,
                protected loadingController: LoadingController,
                protected toastController: ToastController,
                protected alertController: AlertController,
                protected usuarioProvider: UsuarioProvider) {
        super(loadingController, toastController, alertController, usuarioProvider);
    }

    ionViewDidEnter() {
        this.criarLoading();
        this.loading.present();
        this.carregarConvidados();
    }

    carregarConvidados() {
        this.usuarioProvider.getUsuarioStorage(this.CHAVE_USUARIO).then(usuario => {
            if(usuario && usuario !== null) {
                this.convidadoProvider.getConvidadosPorSocio(usuario.socio.matricula).subscribe(convidados => {
                    if(convidados) {
                        this.convidados = convidados;
                        this.convidadosPesquisa = convidados;
                    }
                    this.loading.dismiss();
                }, erro => {
                    this.loading.dismiss();
                    let mensagem = erro.error;
                    if (!mensagem) {
                        mensagem = 'Falha na conexão. Favor verificar se os dados estão ativos e tentar novamente.';
                    }
                    this.criarToast(mensagem, false, TipoToast.ERRO).present();
                });
            } else {
                this.loading.dismiss();
                this.criarToast('Não foi possível recuperar usuário autenticado', false, TipoToast.ERRO).present();
                this.appCtrl.getRootNav().setRoot(UsuarioPage);
            }
        });
    }

    pesquisarConvidado(ev: any) {
        // Reset items back to all of the items
        this.convidadosPesquisa = this.convidados;

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.convidadosPesquisa = this.convidadosPesquisa.filter((item) => {
                return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    emitirConvite(convidado: Pessoa) {
        this.appCtrl.getRootNav().setRoot(EmitirConvitePage, {convidado: convidado});
    }

    removerConvidado(convidado: Pessoa) {
        this.criarToast('Funcionalidade não implementada', false, TipoToast.WARN).present();
    }
}