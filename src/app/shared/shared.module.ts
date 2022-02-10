import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicesModule} from './services/services.module';
import {ComponentsModule} from './components/components.module';
import {DirectivesModule} from './directives/directives.module';



@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        ServicesModule,
        ComponentsModule
    ],
    declarations: [],
    exports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        ServicesModule,
        ComponentsModule
    ],

})

export class SharedModule {

}
