import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AbstractProvider} from "../abstract-provider";
import {Convidado} from "../../model/convidado";

@Injectable()
export class ConvidadoProvider extends AbstractProvider {

    URL_CONVIDADO = this.URL + 'convidado/';

    constructor(public http: HttpClient) {
        super();
    }

    getConvidadosPorSocio(matriculaSocio: number) {
        return this.http.get<Convidado[]>(this.URL_CONVIDADO +'/?matriculaSocio='+ matriculaSocio);
    }
}
