import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsComponent} from '../forms.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FormsComponent,
    data: {
      title: 'Forms Works'
    }
  }
];
@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class FormsRoutingModule { }
