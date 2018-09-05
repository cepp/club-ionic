import {EventoArea} from "./evento-area";
import {Social} from "./social";

export class Evento {
    codigoEvento: number;
    titulo: string;
    descricaoEvento: string;
    descricaoResumo: string;
    dataEvento: Date;
    dataInicioVenda: Date;
    dataFinalVenda: Date;
    dataInicoEvento: Date;
    dataFinalEvento: Date;
    foto: any;
    areaEventoDTO: EventoArea[];
    social: Social;
}