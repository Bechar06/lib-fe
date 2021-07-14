import {Component, OnInit, ViewChild} from '@angular/core';
import {TransactionModel} from './transaction.model';
import {TransactionService} from "./transaction.service";
import {SnackBarComponent} from "../snack-bar-component/snack-bar-component";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../confirmation-dilog/confirmation-dialog.component";
import {BookService} from "../book/book.service";
import {BookComponentModel} from 'app/book/book.component.model';
import {MemberRecordService} from '../membre/member-record.service';
import {MemberRecordComponentModel} from '../membre/member-record.model';
import {ColumnMode, DatatableComponent, SelectionType} from "@swimlane/ngx-datatable";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  private transOldModel: TransactionModel = new TransactionModel();
  durationInSeconds = 5;

  constructor(private transService: TransactionService,
              private bookservice: BookService,
              private memberService: MemberRecordService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  openSnackBar(message) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: message
    });
  }

  transList = [];
  transTempList = [];
  enableAtteindre = false;
  myForm: FormGroup;
  columns: any[] = [
    {name: 'codeTrans'},
    {name: 'memberCode'},
    {name: 'bookCode'},
    {name: 'dateOfIssue'},
    {name: 'dateOfIssue'},
  ];
  transactionModule: TransactionModel = new TransactionModel();
  private currentItem: TransactionModel;
  action: string = null;
  titleAction: string = 'Consultation';

  ngOnInit() {
    this.getFirstTrans();
    // dispaly DropDown in form transaction
    this.getDropDownInBook();
    this.getDropDownInMember();
    this.getAllTrans();
    this.myForm = new FormGroup({
      codeTrans: new FormControl(this.transactionModule.codeTrans, [Validators.required]),
      memberId: new FormControl(this.transactionModule.memberId, [Validators.required]),
      idBook: new FormControl(this.transactionModule.idBook, [Validators.required]),
      dateOfIssue: new FormControl(this.transactionModule.dateOfIssue, [Validators.required]),
      dueDate: new FormControl(this.transactionModule.dueDate, [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  getFirstTrans() {
    this.transService.getFirstTrans().subscribe(result => {
        this.transactionModule = result;
      }
    )
  }

  bookList: BookComponentModel[] = [];

  getDropDownInBook() {
    this.bookservice.getAllbook().subscribe(result => {
      result.forEach(element => {
        this.bookList.push(element);
      })
    })
  }

  memberList: MemberRecordComponentModel[] = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  SelectionType = SelectionType;
  ColumnMode = ColumnMode;

  selected = [];
  @ViewChild('closebutton') closebutton;

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.transTempList.filter(function (d) {
      if (d && d.codeTrans)
        return d.codeTrans.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.transList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect() {
    this.enableAtteindre = true;
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  atteindre() {
    this.transactionModule = this.selected[0];
    this.closebutton.nativeElement.click()
  }

  getDropDownInMember() {
    this.memberService.getAllmemberRecord().subscribe(result => {
      result.forEach(element => {
        this.memberList.push(element)
      })
    })
  }

  getAllTrans() {
    this.transService.getAllTrans().subscribe(resp => {
      this.transTempList = [...resp];
      this.transList = resp;
    });
  }

  startAction(action: string) {
    switch (action) {
      case 'add': {
        this.transOldModel = {...this.transactionModule};
        this.transactionModule = new TransactionModel();
        this.action = 'add';
        this.titleAction = 'Creation';
        break;
      }
      case 'update': {
        this.transOldModel = {...this.transactionModule};
        this.action = 'update';
        this.titleAction = 'Modification';
        break;
      }
      case 'delete': {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '850px',
          data: "Est-ce que vous confirmez la suppression de ce livre?"
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.transService.deleteTrans(this.transactionModule).subscribe(result => {
                this.openSnackBar(this.initData('La transaction est supprimé avec succès', 'success'));
                this.getFirstTrans();
                this.getAllTrans();
              }
            )
          }
        });
        break;
      }
      case null: {
        this.transactionModule = this.transOldModel;
        this.action = null;
        this.titleAction = 'Consultation';
        break;
      }
    }
  }

  initData(error, messageType) {
    return {
      message: error,
      messageType: messageType
    };
  }


  callAction() {
    switch (this.action) {
      case 'add': {
        if (this.myForm.valid) {
          this.transService.addTrans(this.transactionModule).subscribe(resp => {
            this.transactionModule = resp;
            this.currentItem = resp;
            this.action = null;
            this.titleAction = 'Consultation';
            this.openSnackBar(this.initData('La transaction est ajouté avec succès', 'success'));
            this.getAllTrans();
          }, error => {
            this.openSnackBar(this.initData(error.error.message, 'error'));
          });
          break;
        }
      }
      case 'update': {
        if (this.myForm.valid) {
          this.transService.updateTrans(this.transactionModule).subscribe(resp => {
            this.transactionModule = resp;
            this.currentItem = resp;
            this.action = null;
            this.titleAction = 'Consultation';
            this.openSnackBar(this.initData('La transaction est modifié avec succès', 'success'));
            this.getAllTrans();
          }, error => {
            this.openSnackBar(this.initData(error.error.message, 'error'));
          });
          break;
        }
      }

      case '': {
        break;
      }
    }
  }

}
