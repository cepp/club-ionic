import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AbstractProvider} from "../abstract-provider";
import {Usuario} from "../../model/usuario";
import {Storage} from "@ionic/storage";

@Injectable()
export class UsuarioProvider extends AbstractProvider {

    URL_USUARIO = this.URL + 'usuario/';

    constructor(public http: HttpClient, private storage: Storage) {
        super();
    }

    autenticar(login: string, senha: string) {
        let usuario: Usuario = new Usuario();
        usuario.login = login;
        usuario.senha = senha;
        return this.http.get<Usuario>(this.URL_USUARIO+'?login=' + login + '&senha=' + senha);
    }

    registrarUsuarioStorage(chave, valor) {
        this.storage.set(chave, valor);
    }

    getUsuarioStorage(chave) {
        return this.storage.get(chave);
    }

    adicionarDispositivoUsuario(usuario) {
        return this.http.post(this.URL_USUARIO+'add/device',usuario);
    }
}
