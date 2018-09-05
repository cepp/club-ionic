import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventoComentariosPage } from './evento-comentarios';

@NgModule({
  declarations: [
    EventoComentariosPage,
  ],
  imports: [
    IonicPageModule.forChild(EventoComentariosPage),
  ],
})
export class EventoComentariosPageModule {}
