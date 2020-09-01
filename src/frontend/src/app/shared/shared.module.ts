import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        CardComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
      CardComponent,
      FontAwesomeModule
    ]
})
export class SharedModule {}
