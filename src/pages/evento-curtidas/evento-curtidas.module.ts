import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventoCurtidasPage } from './evento-curtidas';

@NgModule({
  declarations: [
    EventoCurtidasPage,
  ],
  imports: [
    IonicPageModule.forChild(EventoCurtidasPage),
  ],
})
export class EventoCurtidasPageModule {}
