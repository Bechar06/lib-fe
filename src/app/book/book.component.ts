import {Component, OnInit, ViewChild} from '@angular/core';
import {BookComponentModel} from './book.component.model';
import {BookService} from "./book.service";
import {SnackBarComponent} from "../snack-bar-component/snack-bar-component";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "../confirmation-dilog/confirmation-dialog.component";
import {ColumnMode, DatatableComponent, SelectionType} from "@swimlane/ngx-datatable";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  private bookOldeModel: BookComponentModel = new BookComponentModel();
  durationInSeconds = 5;

  constructor(private bookservice: BookService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  openSnackBar(message) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: message
    });
  }

  rows = [];
  bookTempList = [];
  bookComponentModel: BookComponentModel = new BookComponentModel();
  private currentItem: BookComponentModel;
  action: string = null;
  myForm: FormGroup;
  titleAction: string = 'Consultation';
  columns: any[] = [
    {prop: 'codeBook', name:'Code de livre'},
    {prop: 'author', name:'Auteur'},
    {prop: 'title', name:'Titre'},
    {prop: 'price', name:'Prix'},
    {prop: 'rackNo', name:'Étagère'},
    {prop: 'status', name:'Statut du livre'},
    {prop: 'edition', name: 'Édition'},
    {prop: 'qnt', name: 'Qantité'}
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  SelectionType = SelectionType;
  ColumnMode = ColumnMode;

  selected = [];
  @ViewChild('closebutton') closebutton;

  ngOnInit() {

    this.myForm = new FormGroup({
      codeBook: new FormControl(this.bookComponentModel.codeBook, [Validators.required]),
      author: new FormControl(this.bookComponentModel.author, [Validators.required]),
      title: new FormControl(this.bookComponentModel.title, [Validators.required]),
      price: new FormControl(this.bookComponentModel.price, [Validators.required]),
      rackNo: new FormControl(this.bookComponentModel.rackNo, [Validators.required]),
      status: new FormControl(this.bookComponentModel.status, [Validators.required]),
      edition: new FormControl(this.bookComponentModel.edition, [Validators.required]),
      dateOfPurchase: new FormControl(this.bookComponentModel.dateOfPurchase, [Validators.required]),
      qnt: new FormControl(this.bookComponentModel.qnt,[Validators.required]),
    });
    this.getFirstBook();
    this.getAllbook();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  getFirstBook() {
    this.bookservice.getFirstBook().subscribe(result => {
        if (result)
          this.bookComponentModel = result;
      }
    )
  }

  getAllbook() {
    this.bookservice.getAllbook().subscribe(resp => {
      this.bookTempList = [...resp];
      this.rows = resp;
    });
  }

  startAction(action: string) {
    switch (action) {
      case 'add': {
        this.bookOldeModel = {...this.bookComponentModel};
        this.bookComponentModel = new BookComponentModel();
        this.action = 'add';
        this.titleAction = 'Ajouter Livre';
        break;
      }
      case 'update': {
        this.bookOldeModel = {...this.bookComponentModel};
        this.action = 'update';
        this.titleAction = 'Modifier Livre';
        break;
      }
      case 'delete': {
        const message = "Est-ce que vous confirmez la suppression de " + this.bookComponentModel.codeBook +"?";
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '850px',
          data: message
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.bookservice.deleteBook(this.bookComponentModel).subscribe(result => {
                this.openSnackBar(this.initData('Le livre est supprimé avec succès', 'success'));
                this.getFirstBook();
                this.getAllbook();
              }, error => {
                this.openSnackBar(this.initData(error.error.message, 'error'));
              }
            )
          }
        });
        break;
      }
      case null: {
        this.bookComponentModel = this.bookOldeModel;
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
          this.bookservice.addBook(this.bookComponentModel).subscribe(resp => {
            this.bookComponentModel = resp;
            this.currentItem = resp;
            this.action = null;
            this.titleAction = 'Consultation';
            this.openSnackBar(this.initData('Le livre est ajouté avec succès', 'success'));
            //this.closebutton.nativeElement.click();
            this.getAllbook();
          }, error => {
            this.openSnackBar(this.initData(error.error.message, 'error'));
          });
          break;
        }
      }
      case 'update': {
        if (this.myForm.valid) {
          this.bookservice.updateBook(this.bookComponentModel).subscribe(resp => {
            this.bookComponentModel = resp;
            this.currentItem = resp;
            this.action = null;
            this.titleAction = 'Consultation';
            this.openSnackBar(this.initData('Le livre est modifié avec succès', 'success'));
            this.closebutton.nativeElement.click();
            this.getAllbook();
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.bookTempList.filter(book => {
      return book && book.codeBook && book.title && book.author &&
          (book.codeBook.toLowerCase().includes(val) || book.title.toLowerCase().includes(val) ||
            book.author.toLowerCase().includes(val));
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect() {
    this.bookComponentModel = this.selected[0];
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
