import {Component} from '@angular/core';
import {
    AlertController, Events,
    LoadingController,
    MenuController,
    NavController,
    ToastController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsuarioProvider} from "../../providers/usuario/usuario.provider";
import {AbstractPage} from "../../model/abstract-page";
import {Usuario} from "../../model/usuario";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {TipoToast} from "../../model/tipo-toast";

@Component({
    selector: 'page-usuario',
    templateUrl: 'usuario-page.html',
})
export class UsuarioPage extends AbstractPage {

    form: FormGroup;

    constructor(public formBuilder: FormBuilder,
                protected navController: NavController,
                protected menuController: MenuController,
                protected loadingController: LoadingController,
                protected toastController: ToastController,
                protected alertController: AlertController,
                protected usuarioProvider: UsuarioProvider,
                private push: Push,
                private events: Events) {
        super(loadingController, toastController, alertController, usuarioProvider);
        this.form = this.formBuilder.group({
            login: [null, [Validators.required]],
            senha: [null, [Validators.required]]
        });
    }

    ionViewDidLoad() {

    }

    cancelar() {
        this.gotToHome(this.navController);
    }

    autenticar() {
        if(this.form.valid) {
            this.criarLoading();
            this.loading.present();
            let usuario = this.form.get('login').value;
            let senha = this.form.get('senha').value;
            this.usuarioProvider.autenticar(usuario, senha).subscribe(res => {
                if(res) {
                    let user = res[0];

                    this.usuarioProvider.registrarUsuarioStorage(this.CHAVE_USUARIO, user);
                    // this.registrarDispositivoUsuario(res);
                    this.events.publish(this.LOGIN, user);
                }
                this.loading.dismiss();
            }, erro => {
                this.loading.dismiss();
                this.criarToast(erro.error, false, TipoToast.ERRO).present();
            });
        }
    }

    registrarDispositivoUsuario(usuario: Usuario) {
        // const options: PushOptions = {
        //     android: {
        //         senderID: '*******'
        //     },
        //     ios: {
        //         alert: 'true',
        //         badge: true,
        //         sound: 'false'
        //     },
        //     windows: {}
        // };
        //
        // const pushObject: PushObject = this.push.init(options);
        //
        // pushObject.on('registration').subscribe((registration: any) => {
        //     usuario.dispositivo = registration.registrationId;
        //     this.usuarioProvider.registrarUsuarioStorage(this.CHAVE_USUARIO, usuario);
        //     this.usuarioProvider.adicionarDispositivoUsuario(usuario).subscribe(res=>{
        //         console.log('dispositivo cadastrado');
        //     }, erro=>{
        //         this.criarToast('Falha ao registrar dispositivo: '+erro.error, true, TipoToast.ERRO).present();
        //     });
        // });
    }
}
