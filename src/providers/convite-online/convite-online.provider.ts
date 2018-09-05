import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AbstractProvider} from "../abstract-provider";
import {Convite} from "../../model/convite";

@Injectable()
export class ConviteOnlineProvider extends AbstractProvider {

    URL_CONVITE = this.URL + 'convite/';

    constructor(public http: HttpClient) {
        super();
    }

    getConvites(matriculaSocio: number) {
        return this.http.get<Convite[]>(this.URL_CONVITE + '?socio.matricula=' + matriculaSocio);
    }

    emitirConvite(convite: Convite) {
        return this.http.post<Convite>(this.URL_CONVITE, convite);
    }

    cancelarConvite(convite: Convite) {
        return this.http.delete(this.URL_CONVITE + convite.numeroConvite);
    }
}
