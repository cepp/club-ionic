import {Socio} from "./socio";

export class Social {
    comentarios: SocialComentario[] = [];
    curtidas: SocialCurtida[] = [];
    iconeCurtida: string = 'fa-thumbs-o-up';
    iconeComentario: string = 'fa-commenting-o';
}

export class SocialComentario {
    comentario: string;
    socio: Socio;
    data: Date;
}

export class SocialCurtida {
    socio: Socio;
    data: Date;
}