import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        CardComponent,
        TypeaheadComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        HttpClientModule
    ],
    exports: [
      CardComponent,
      TypeaheadComponent,
      FontAwesomeModule,
      HttpClientModule
    ]
})
export class SharedModule {}
