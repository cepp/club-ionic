import {Component} from '@angular/core';
import {AlertController, App, LoadingController, ToastController, ViewController} from 'ionic-angular';
import {Convite} from "../../model/convite";
import {ConviteOnlineProvider} from "../../providers/convite-online/convite-online.provider";
import {UsuarioProvider} from "../../providers/usuario/usuario.provider";
import {AbstractPage} from "../../model/abstract-page";
import {UsuarioPage} from "../usuario/usuario-page";
import date from "date-and-time";
import {TipoToast} from "../../model/tipo-toast";

@Component({
    templateUrl: 'convite-emitido.html',
})
export class ConviteEmitidoPage extends AbstractPage {

    convites: Convite[] = [];
    datas: Date[] = [];

    constructor(public viewCtrl: ViewController,
                public appCtrl: App,
                private conviteProvider: ConviteOnlineProvider,
                protected loadingController: LoadingController,
                protected toastController: ToastController,
                protected alertController: AlertController,
                protected usuarioProvider: UsuarioProvider) {
        super(loadingController, toastController, alertController, usuarioProvider);
    }

    ionViewDidEnter() {
        this.criarLoading();
        this.loading.present();
        this.carregarConvitesEmitidos();
    }

    carregarConvitesEmitidos() {
        this.usuarioProvider.getUsuarioStorage(this.CHAVE_USUARIO).then(usuario => {
            if(usuario && usuario !== null) {
                this.conviteProvider.getConvites(usuario.socio.matricula).subscribe(res => {
                    if (res) {

                        res.forEach(convite => {
                            if (this.datas.indexOf(convite.dataConvite) === -1) {
                                this.datas.push(convite.dataConvite);
                            }
                        });

                        this.convites = res;
                        this.loading.dismiss();
                    }
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

    getConvitesPorData(dataConvite) {
        let convitesData: Convite[] = [];

        this.convites.forEach(convite => {
            if (convite.dataConvite === dataConvite) {
                convitesData.push(convite);
                convite.imagem = this.getImagem(convite.convidado);
            }
        });

        return convitesData;
    }

    cancelarConvite(convite) {
        let confirm = this.alertController.create({
            title: 'Confirmação',
            message: 'Deseja cancelar o convite de número <b>' + convite.numeroConvite + '</b> para <b>' + convite.convidado.nome + '</b> do dia <b>' + date.format(new Date(convite.dataConvite), 'DD/MM/YYYY') + '</b>?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                    }
                },
                {
                    text: 'Confirmar',
                    handler: () => {
                        this.criarLoading();
                        this.loading.present();

                        if('Ativo' !== convite.situacaoConvite) {
                            this.loading.dismiss();
                            this.criarToast('Não é possível cancelar convite com situação diferente de Ativo', true, TipoToast.ERRO).present();
                            return;
                        }

                        this.conviteProvider.cancelarConvite(convite).subscribe(res => {
                            this.carregarConvitesEmitidos();
                            this.criarToast('Convite ' + convite.numeroConvite + ' de ' + convite.convidado.nome + ' foi cancelado com sucesso', true, TipoToast.SUCCESS).present();
                        }, erro => {
                            let mensagem = erro.error;
                            if (!mensagem) {
                                mensagem = 'Falha na conexão. Favor verificar se os dados estão ativos e tentar novamente.';
                            }
                            this.loading.dismiss();
                            this.criarToast(mensagem, false, TipoToast.ERRO).present();
                        });
                    }
                }
            ]
        });

        confirm.present();

    }

    mostrarBotaoCancelar(convite) {
        return convite.situacaoConvite !== 'Cancelado';
    }
}