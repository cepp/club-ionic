import {Pessoa} from "./pessoa";
import {DateTime} from "ionic-angular";
import {Socio} from "./socio";

export class Convite {
    id: number;
    numeroConvite: number;
    dataConvite: Date;
    convidado: Pessoa;
    situacaoConvite: string;
    dataHoraCancelamento: DateTime;
    socio: Socio;
    imagem: string;
}
