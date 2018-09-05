import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ConviteOnlinePage} from "../pages/convite-online/convite-online";
import {HttpClientModule} from "@angular/common/http";
import {ConviteEmitidoPage} from "../pages/convite-online/convite-emitido";
import {ConvidadoPage} from "../pages/convite-online/convidado-page";
import {ConviteOnlineProvider} from "../providers/convite-online/convite-online.provider";
import {ConvidadoProvider} from "../providers/convidado/convidado.provider";
import {EmitirConvitePage} from '../pages/emitir-convite/emitir-convite';
import {UsuarioProvider} from "../providers/usuario/usuario.provider";
import {IonicStorageModule} from "@ionic/storage";
import {UsuarioPage} from "../pages/usuario/usuario-page";
import {Push} from '@ionic-native/push';
import {NotificacaoPage} from "../pages/notificacao/notificacao";
import { EventoProvider } from '../providers/evento/evento';
import {registerLocaleData} from "@angular/common";

import localePt from "@angular/common/locales/pt";
import {EventoComentariosPage} from "../pages/evento-comentarios/evento-comentarios";
import {EventoCurtidasPage} from "../pages/evento-curtidas/evento-curtidas";

registerLocaleData(localePt, 'pt-BR');

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ConviteOnlinePage,
        ConvidadoPage,
        ConviteEmitidoPage,
        EmitirConvitePage,
        UsuarioPage,
        NotificacaoPage,
        EventoComentariosPage,
        EventoCurtidasPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ConviteOnlinePage,
        ConvidadoPage,
        ConviteEmitidoPage,
        EmitirConvitePage,
        UsuarioPage,
        NotificacaoPage,
        EventoComentariosPage,
        EventoCurtidasPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        ConviteOnlineProvider,
        ConvidadoProvider,
        UsuarioProvider,
        Push,
        EventoProvider
    ]
})
export class AppModule {
}
