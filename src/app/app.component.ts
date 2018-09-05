import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, MenuController, Nav, Platform, ToastController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ConviteOnlinePage} from "../pages/convite-online/convite-online";
import {UsuarioPage} from "../pages/usuario/usuario-page";
import {UsuarioProvider} from "../providers/usuario/usuario.provider";
import {AbstractComponent} from "../model/abstract-component";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {NotificacaoPage} from "../pages/notificacao/notificacao";
import {TipoToast} from "../model/tipo-toast";

@Component({
    templateUrl: 'app.html'
})
export class MyApp extends AbstractComponent {
    @ViewChild(Nav)
    nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any, icon: string, mostrarBadge?: boolean, qtdeBadge?: number }>;
    menuSocio: Array<{ title: string, component: any, icon: string, mostrarBadge?: boolean, qtdeBadge?: number }>;

    showSplash = true;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                protected menuCtrl: MenuController,
                protected usuarioProvider: UsuarioProvider,
                private push: Push,
                private alertCtrl: AlertController,
                private toast: ToastController,
                private events: Events) {
        super();
        this.initializeApp();

        let evento = {title: 'Eventos', component: HomePage, icon: 'fa-shopping-bag'};
        let notificacao = {title: 'Notificações', component: NotificacaoPage, icon: 'fa-bell', mostrarBadge: true, qtdeBadge: 4};

        // used for an example of ngFor and navigation
        this.pages = [
            evento,
            {title: 'Entrar', component: UsuarioPage, icon: 'fa-sign-in'},
            notificacao
        ];

        // used for an example of ngFor and navigation
        this.menuSocio = [
            evento,
            {title: 'Convites', component: ConviteOnlinePage, icon: 'fa-ticket'},
            notificacao
        ];

        this.gerenciarMenu(this.usuarioProvider, this.menuCtrl);

        this.controleAutenticacao = this.controleAutenticacao.bind(this);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            // this.pushsetup();
            this.controleAutenticacao();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    sair() {
        this.events.publish(this.LOGOUT);
    }

    // pushsetup() {
    //     const options: PushOptions = {
    //         android: {
    //             senderID: '*****'
    //         },
    //         ios: {
    //             alert: 'true',
    //             badge: true,
    //             sound: 'false'
    //         },
    //         windows: {}
    //     };
    //
    //     const pushObject: PushObject = this.push.init(options);
    //
    //     pushObject.on('notification').subscribe((notification: any) => {
    //         if(notification.additionalData.foreground) {
    //             let youralert = this.alertCtrl.create({
    //                 title: notification.title ? notification.title : 'Notificação',
    //                 message: notification.message
    //             });
    //             youralert.present();
    //         }
    //     }, erro => {
    //         this.toast.create({
    //             message: erro.error,
    //             duration: 5000,
    //             cssClass: TipoToast.ERRO.cssClass
    //         }).present();
    //     });
    //
    //     pushObject.on('error').subscribe(error => this.toast.create({message: 'erro: '+error, showCloseButton: true}).present());
    // }

    controleAutenticacao() {
        this.events.subscribe(this.LOGIN, (usuario) => {
            this.usuario = usuario;
            this.ativaMenuSocio(this.menuCtrl);
            this.gotToHome(this.nav);
            this.toast.create({
                message: 'Bem vindo ao APP do Clube',
                duration: 5000,
                cssClass: TipoToast.SUCCESS.cssClass
            }).present();
        });

        this.events.subscribe(this.LOGOUT, (usuario) => {
            this.ativaMenuPadrao(this.menuCtrl);
            this.usuario = null;
            this.usuarioProvider.registrarUsuarioStorage(this.CHAVE_USUARIO, this.usuario);
            this.gotToHome(this.nav);
        });
    }
}
