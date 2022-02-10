import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LayoutIndexComponent} from './components/layout-index/layout-index.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
    {
        path: '', component: LayoutIndexComponent,
        children: [
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent},
        ],
    },
    {path: '**', redirectTo: '/'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {

}
