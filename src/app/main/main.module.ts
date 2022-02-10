import {NgModule} from '@angular/core';
import {LayoutIndexComponent} from './components/layout-index/layout-index.component';
import {IonicModule} from '@ionic/angular';
import {MainRoutingModule} from './main-routing.module';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './components/home/home.component';


@NgModule({
    imports: [
        IonicModule,
        SharedModule,
        MainRoutingModule,
    ],
    declarations: [
        LayoutIndexComponent,
        HomeComponent
    ]
})

export class MainModule {

}
