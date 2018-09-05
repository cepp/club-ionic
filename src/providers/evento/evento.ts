import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AbstractProvider} from "../abstract-provider";
import {Evento} from "../../model/evento";

/*
  Generated class for the EventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoProvider extends AbstractProvider {

  private URI_EVENTO = this.URL+'evento/';

  constructor(public http: HttpClient) {
    super();
  }

  getEventos() {
    return this.http.get<Evento[]>(this.URI_EVENTO);
  }
}
