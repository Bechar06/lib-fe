import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {BlankTemplateComponent} from './template/blank-template.component';
import {LeftNavTemplateComponent} from './template/left-nav-template.component';
import {AppRoutingModule, routes} from './app.routing';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HeaderComponent} from './shared/header/header.component';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {BookComponent} from './book/book.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../helpers/format-datepicker";
import {MatCardModule} from "@angular/material/card";
import {SnackBarComponent} from './snack-bar-component/snack-bar-component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmationDialogComponent} from "./confirmation-dilog/confirmation-dialog.component";
import {MatSelectModule} from "@angular/material/select";
import {MemberRecordComponent} from './membre/member-record.component';
import {TransactionComponent} from './transaction/transaction.component';
import { RxStompService  } from '@stomp/ng2-stompjs';
import { ProgressWebsocketService } from './services/progress.websocket.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { BillComponent } from './bill/bill.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    BlankTemplateComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LeftNavTemplateComponent,
    NavigationComponent,
    BookComponent,
    SnackBarComponent,
    ConfirmationDialogComponent,
    TransactionComponent,
    MemberRecordComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    BillComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    NgxDatatableModule
  ],
  entryComponents: [
    SnackBarComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    RxStompService,
    ProgressWebsocketService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
