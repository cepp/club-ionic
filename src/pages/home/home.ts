import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AbstractPage} from "../../model/abstract-page";
import {UsuarioProvider} from "../../providers/usuario/usuario.provider";
import {EventoProvider} from "../../providers/evento/evento";
import {Evento} from "../../model/evento";
import {TipoToast} from "../../model/tipo-toast";
import {EventoComentariosPage} from "../evento-comentarios/evento-comentarios";
import {EventoCurtidasPage} from "../evento-curtidas/evento-curtidas";
import {Social, SocialCurtida} from "../../model/social";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends AbstractPage {

    eventos: Evento[] = [];

    constructor(protected loadingController: LoadingController,
                protected toastController: ToastController,
                protected alertController: AlertController,
                protected usuarioProvider: UsuarioProvider,
                private eventoProvider: EventoProvider,
                private navigationController: NavController) {
        super(loadingController, toastController, alertController, usuarioProvider);
        this.usuarioProvider.getUsuarioStorage(this.CHAVE_USUARIO).then(usuario => {
            if(usuario) {
                this.usuario = usuario;
            }
        });
    }

    ionViewDidEnter() {
        this.criarLoading();
        this.loading.present();
        this.carregarEventos();
        // this.eventos[0].descricaoEvento = 'Teste';
        // this.eventos[0].titulo = 'Teste';
        // this.eventos[0].dataEvento = new Date();
        // this.eventos[0].areaEventoDTO = [new EventoArea()];
        // this.eventos[0].areaEventoDTO[0].valorAtualConvite = 20.0;
        // this.eventos[0].areaEventoDTO[0].descricao = 'Teste';
        // this.eventos[0].social = new Social();
        // this.eventos[0].social.iconeCurtida = 'fa-thumbs-up';
        // this.eventos[0].social.comentarios = [new SocialComentario(), new SocialComentario()];
        //
        // this.eventos[0].social.comentarios[0].comentario = 'Aguardando ansiosamente pelo dia do show';
        // this.eventos[0].social.comentarios[0].data = new Date();
        // this.eventos[0].social.comentarios[0].socio = new Socio();
        // this.eventos[0].social.comentarios[0].socio.pessoa = new Pessoa();
        // this.eventos[0].social.comentarios[0].socio.pessoa.nome = 'Joana';
        // this.eventos[0].social.comentarios[0].socio.matricula = 1234;
        // this.eventos[0].social.comentarios[0].socio.pessoa.foto = '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';
        //
        // this.eventos[0].social.comentarios[1].comentario = 'Eu também';
        // this.eventos[0].social.comentarios[1].data = new Date();
        // this.eventos[0].social.comentarios[1].socio = new Socio();
        // this.eventos[0].social.comentarios[1].socio.pessoa = new Pessoa();
        // this.eventos[0].social.comentarios[1].socio.pessoa.nome = 'Carolina';
        // this.eventos[0].social.comentarios[1].socio.matricula = 12345;
        // this.eventos[0].social.comentarios[1].socio.pessoa.foto = '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';
        //
        // this.eventos[0].social.curtidas = [new SocialCurtida(), new SocialCurtida()];
        // this.eventos[0].social.curtidas[0].data = new Date();
        // this.eventos[0].social.curtidas[0].socio = this.eventos[0].social.comentarios[0].socio;
        // this.eventos[0].social.curtidas[1].data = new Date();
        // this.eventos[0].social.curtidas[1].socio = this.eventos[0].social.comentarios[1].socio;
    }

    carregarEventos() {
        this.eventoProvider.getEventos().subscribe(eventos => {
            if(eventos) {
                eventos.forEach(evento => evento.social = new Social());
                this.eventos = eventos;

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
    }

    mostrarComentarios(comentarios, idEvento) {
        this.navigationController.push(EventoComentariosPage, {comentarios: comentarios, idEvento: idEvento});
    }

    mostrarCurtidas(curtidas, idEvento) {
        this.navigationController.push(EventoCurtidasPage, {curtidas: curtidas, idEvento: idEvento });
    }

    curtirEvento(evento) {
        if(this.usuario && this.usuario !== null) {
            let socialCurtidaSocio: SocialCurtida = this.getSocialCurtidaSocio(evento);
            if(!socialCurtidaSocio || socialCurtidaSocio === null) {
                let socialCurtida: SocialCurtida = new SocialCurtida();
                socialCurtida.socio = this.usuario.socio;
                // socialCurtida.socio = this.getSocioTemp();
                socialCurtida.data = new Date();
                evento.social.curtidas.push(socialCurtida);
                evento.social.iconeCurtida = 'fa-thumbs-up';
            } else {
                evento.social.curtidas.pop(socialCurtidaSocio);
                evento.social.iconeCurtida = 'fa-thumbs-o-up';
            }
        } else {
            this.criarToast('Somente usuário autenticados podem curtir', false, TipoToast.WARN).present();
        }
    }

    abrirCompartilhamento(evento) {
        let mensagem = 'Funcionalidade de compartilhamento não disponível';
        this.criarToast(mensagem, false, TipoToast.WARN).present();
    }

    getSocialCurtidaSocio(evento): SocialCurtida {
        if(this.usuario && this.usuario.socio) {
            // let socio: Socio = this.getSocioTemp();
            evento.social.curtidas.forEach(curtida => {
                if (curtida.socio.matricula === this.usuario.socio.matricula) {
                    // if(curtida.socio.matricula == socio.matricula) {
                    return curtida;
                }
            });
            for (let curtida of evento.social.curtidas) {
                if (curtida.socio.matricula === this.usuario.socio.matricula) {
                    // if(curtida.socio.matricula == socio.matricula) {
                    return curtida;
                }
            }
        }
        return null;
    }

    // getSocioTemp(): Socio {
    //     let socio: Socio = new Socio();
    //     socio.pessoa = new Pessoa();
    //     socio.pessoa.nome = 'Carolina';
    //     socio.matricula = 12345;
    //     socio.pessoa.foto = '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';
    //     return socio;
    // }

    getIconeCurtidaEvento(evento): string {
        if(this.usuario && this.usuario.socio) {
            // let socio: Socio = this.getSocioTemp();
            evento.social.curtidas.forEach(curtida => {
                if (curtida.socio.matricula === this.usuario.socio.matricula) {
                    // if(curtida.socio.matricula == socio.matricula) {
                    return curtida;
                }
            });
            for (let curtida of evento.social.curtidas) {
                if (curtida.socio.matricula === this.usuario.socio.matricula) {
                    // if(curtida.socio.matricula == socio.matricula) {
                    return 'fa-thumbs-up';
                }
            }
        }
        return 'fa-thumbs-o-up';
    }
}