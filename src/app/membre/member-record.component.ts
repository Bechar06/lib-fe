import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {SnackBarComponent} from "../snack-bar-component/snack-bar-component";
import {ConfirmationDialogComponent} from "../confirmation-dilog/confirmation-dialog.component";
import {MemberRecordComponentModel} from "./member-record.model";
import {MemberRecordService} from "./member-record.service";
import {ColumnMode, DatatableComponent, SelectionType} from "@swimlane/ngx-datatable";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-membre-record',
  templateUrl: './member-record.component.html',
  styleUrls: ['./member-record.component.scss']
})
export class MemberRecordComponent implements OnInit {

  private memberRecordOldeModel: MemberRecordComponentModel = new MemberRecordComponentModel();
  durationInSeconds = 5;
  //enableAtteindre: boolean = false;

  constructor(private memberRecordservice: MemberRecordService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  openSnackBar(message) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: message
    });
  }

  memberRecordList = [];
  memberRecordTempList = [];
  memberRecordComponentModel: MemberRecordComponentModel = new MemberRecordComponentModel();
  private currentItem: MemberRecordComponentModel;
  myForm: FormGroup;
  action: string = null;
  titleAction: string = 'Consultation ';
  @ViewChild(DatatableComponent) table: DatatableComponent;
  SelectionType = SelectionType;
  ColumnMode = ColumnMode;
  columns: any[] = [
    {prop: 'codeMemberRecord', name:'Code de Membre'},
    {prop: 'fullName', name:'Nom complet'},
    {prop: 'dateOfMemberRecordship', name:"date d'adhésion"},
    {prop: 'maxBookLimit', name:'max Book Limit'},
    {prop: 'noBookIssued', name: 'nombre de livre acheté'},
    {prop: 'phoneNo', name:'Numéro de telephone'},
    {prop: 'type', name:'Type de Membre'},
    {prop: 'adress', name:'Address de Membre'}
  ];
  selected = [];
  @ViewChild('closebutton') closebutton;
  ngOnInit() {
    this.getFirstMemberRecord();
    this.getAllmemberRecord();
    this.myForm = new FormGroup({
      codeMemberRecord: new FormControl(this.memberRecordComponentModel.codeMemberRecord, [Validators.required]),
      fullName: new FormControl(this.memberRecordComponentModel.fullName, [Validators.required]),
      dateOfMemberRecordship: new FormControl(this.memberRecordComponentModel.dateOfMemberRecordship, [Validators.required]),
      maxBookLimit: new FormControl(this.memberRecordComponentModel.maxBookLimit, [Validators.required]),
      noBookIssued: new FormControl(this.memberRecordComponentModel.noBookIssued, [Validators.required]),
      phoneNo: new FormControl(this.memberRecordComponentModel.phoneNo, [Validators.required]),
      type: new FormControl(this.memberRecordComponentModel.type, [Validators.required]),
      adress: new FormControl(this.memberRecordComponentModel.adress, [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.myForm.controls[controlName].hasError(errorName);
  }

  getFirstMemberRecord() {
    this.memberRecordservice.getFirstMemberRecord().subscribe(result => {
        this.memberRecordComponentModel = result;
      }
    )
  }


  getAllmemberRecord() {
    this.memberRecordservice.getAllmemberRecord().subscribe(resp => {
      this.memberRecordTempList = [...resp];
      this.memberRecordList = resp;
    });
  }

  startAction(action: string) {
    switch (action) {
      case 'add': {
        this.memberRecordOldeModel = {...this.memberRecordComponentModel};
        this.memberRecordComponentModel = new MemberRecordComponentModel();
        this.memberRecordComponentModel.noBookIssued = 0;
        this.action = 'add';
        this.titleAction = 'Ajouter Membre';
        break;
      }
      case 'update': {
        this.memberRecordOldeModel = {...this.memberRecordComponentModel};
        this.action = 'update';
        this.titleAction = 'Modifer Membre';
        break;
      }
      case 'delete': {
        const message = "Est-ce que vous confirmez la suppression de " + this.memberRecordComponentModel.codeMemberRecord +"?";
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '850px',
          data: message
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.memberRecordservice.deleteMemberRecord(this.memberRecordComponentModel).subscribe(result => {
                this.openSnackBar(this.initData('Le membre est supprimé avec succès', 'success'));
                this.getFirstMemberRecord();
                this.getAllmemberRecord();
              }, error => {
                this.openSnackBar(this.initData(error.error.message, 'error'));
              }
            )
          }
        });
        break;
      }
      case null: {
        this.memberRecordComponentModel = this.memberRecordOldeModel;
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
          this.memberRecordservice.addMemberRecord(this.memberRecordComponentModel).subscribe(resp => {
            this.memberRecordComponentModel = resp;
            this.currentItem = resp;
            this.action = null;
            this.titleAction = 'Consultation';
            this.openSnackBar(this.initData('Le membre est ajouté avec succès', 'success'));
            this.getAllmemberRecord();
          }, error => {
            this.openSnackBar(this.initData(error.error.message, 'error'));
          });
          break;
        }
      }
      case 'update': {
        if (this.myForm.valid) {
          this.memberRecordservice.updateMemberRecord(this.memberRecordComponentModel).subscribe(resp => {
            this.memberRecordComponentModel = resp;
            this.currentItem = resp;
            this.action = null;
            this.titleAction = 'Consultation';
            this.openSnackBar(this.initData('Le membre est modifié avec succès', 'success'));
            this.getAllmemberRecord();
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
    const temp = this.memberRecordList.filter(memberRecord => {
      return memberRecord && memberRecord.codeMemberRecord && memberRecord.fullName && memberRecord.adress &&
          (memberRecord.codeMemberRecord.toLowerCase().includes(val) || memberRecord.fullName.toLowerCase().includes(val) ||
          memberRecord.adress.toLowerCase().includes(val));
    });
    // update the rows
    this.memberRecordList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect() {
    this.memberRecordComponentModel = this.selected[0]

  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
