import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Convite} from "../../model/convite";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConviteOnlineProvider} from "../../providers/convite-online/convite-online.provider";
import {ConviteOnlinePage} from "../convite-online/convite-online";
import {AbstractPage} from "../../model/abstract-page";
import {UsuarioProvider} from "../../providers/usuario/usuario.provider";
import {UsuarioPage} from "../usuario/usuario-page";
import {TipoToast} from "../../model/tipo-toast";

@Component({
    selector: 'page-emitir-convite',
    templateUrl: 'emitir-convite.html',
})
export class EmitirConvitePage extends AbstractPage {

    convite: Convite;
    formGroup: FormGroup;
    isSubmit: boolean = true;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private conviteProvider: ConviteOnlineProvider,
                public formBuilder: FormBuilder,
                protected loadingController: LoadingController,
                protected toastController: ToastController,
                protected alertController: AlertController,
                protected usuarioProvider: UsuarioProvider) {
        super(loadingController, toastController, alertController, usuarioProvider);
        this.convite = new Convite();
        this.usuarioProvider.getUsuarioStorage(this.CHAVE_USUARIO).then(usuario => {
            if (usuario && usuario !== null) {
                this.convite.socio = usuario.socio;
            } else {
                this.criarToast('Não foi possível recuperar usuário autenticado', false, TipoToast.ERRO).present();
                this.navCtrl.setRoot(UsuarioPage);
            }
        });
        this.convite.convidado = this.navParams.get('convidado');
        this.formGroup = formBuilder.group({
            dataConvite: this.formBuilder.control([null, [Validators.required]])
        });
    }

    ionViewDidLoad() {
    }

    emitir() {
        if(this.isSubmit) {
            this.validarForm();
            if (this.formGroup.valid) {
                this.criarLoading();

                this.loading.present();

                let dataConvite = this.formGroup.get('dataConvite').value;
                this.convite.dataConvite = new Date(dataConvite + 'T12:00:00.000Z');
                this.convite.numeroConvite = new Date().getDate();
                this.conviteProvider.emitirConvite(this.convite).subscribe(convite => {
                    if (convite) {
                        this.loading.dismiss();
                        this.criarToast('Convite ' + convite.numeroConvite + ' emitido com sucesso', true, TipoToast.SUCCESS).present();
                        this.navCtrl.setRoot(ConviteOnlinePage, {'pagina': 1});
                    }
                }, erro => {
                    console.log(erro);
                    this.loading.dismiss();
                    let mensagem = erro.error;
                    if (!mensagem) {
                        mensagem = 'Falha na conexão. Favor verificar se os dados estão ativos e tentar novamente.';
                    }
                    this.criarToast(mensagem, false, TipoToast.ERRO).present();
                });
            } else {
                this.criarToast('Data convite obrigatório', false, TipoToast.ERRO).present();
            }
        }
    }

    cancelar() {
        this.isSubmit = false;
        this.navCtrl.setRoot(ConviteOnlinePage, {'pagina': 1});
    }

    validarForm() {
        let dataConvite = this.dataConviteControl();
        dataConvite.valid;
        dataConvite.setErrors(null);
        if(!dataConvite.value[0] || dataConvite.value[0] === null) {
            dataConvite.setErrors({erro: 'Data convite obrigatório'});
            dataConvite.invalid;
        }
    }

    dataConviteControl() {
        return this.formGroup.get('dataConvite');
    }
}
