import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeftNavTemplateComponent} from './template/left-nav-template.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BookComponent} from './book/book.component';
import {TransactionComponent} from './transaction/transaction.component';
import {MemberRecordComponent} from "./membre/member-record.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {BillComponent} from "./bill/bill.component";

export const routes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},
  {
    path: '',
    component: LeftNavTemplateComponent,
    data: {
      title: 'Angular Admin Template'
    },
    children: [
      {
        path: 'books',
        component: BookComponent,
        data: {
          title: 'Books Page'
        },
      },
      {
        path: 'member-record',
        component: MemberRecordComponent,
        data: {
          title: 'Members records Page'
        },
      },
      {
        path: 'transactions',
        component: TransactionComponent,
        data: {
          title: 'Transactions Page'
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'register Page'
        },
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'login Page'
        },
      },
      {
        path: 'bill',
        component: BillComponent,
        data: {
          title: 'bill Page'
        },
      },
    ]
  }, {
    path: 'tables',
    component: LeftNavTemplateComponent,
    data: {
      title: 'Tables'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
      }
    ]
  }, /* {
    path: '**',                            //why this Path
    component: PageNotFoundComponent
  }*/];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
