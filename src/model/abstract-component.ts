import {HomePage} from "../pages/home/home";
import {MenuController, NavController} from "ionic-angular";
import {UsuarioProvider} from "../providers/usuario/usuario.provider";
import {Usuario} from "./usuario";
import {Pessoa} from "./pessoa";
import {NotificacaoPage} from "../pages/notificacao/notificacao";

export abstract class AbstractComponent {
    protected MENU_PADRAO: string = 'menuPadrao';
    protected MENU_SOCIO: string = 'menuSocio';
    protected CHAVE_USUARIO: string = 'socioAutenticado';
    protected LOGIN: string = 'login';
    protected LOGOUT: string = 'logout';
    protected usuario: Usuario;

    ativaMenuSocio(menuCtrl: MenuController) {
        menuCtrl.enable(false, this.MENU_PADRAO);
        menuCtrl.enable(true, this.MENU_SOCIO);
    }

    ativaMenuPadrao(menuCtrl: MenuController) {
        menuCtrl.enable(true, this.MENU_PADRAO);
        menuCtrl.enable(false, this.MENU_SOCIO);
    }

    gotToHome(nav: NavController) {
        nav.setRoot(HomePage);
    }

    gerenciarMenu(usuarioProvider: UsuarioProvider, menuCtrl: MenuController) {
        usuarioProvider.getUsuarioStorage(this.CHAVE_USUARIO).then(usuario => {
            if(usuario && usuario !== null) {
                this.ativaMenuSocio(menuCtrl);
                this.usuario = usuario;
            } else {
                this.ativaMenuPadrao(menuCtrl);
            }
        }).catch(erro => {
            this.ativaMenuPadrao(menuCtrl);
        });
    }

    getImagem(pessoa: Pessoa) {
        if (pessoa && pessoa.foto && pessoa.foto !== null) {
            this.mostrarImagemDatabase(pessoa.foto);
        } else {
            return './assets/imgs/avatar.png';
        }
    }

    goToNotificacao(nav) {
        nav.setRoot(NotificacaoPage);
    }

    mostrarImagemDatabase(imagem: string) {
        return 'data:image/png;base64,' + imagem;
    }
}