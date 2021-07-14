import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TransactionModel} from './transaction.model';
import {BookComponentModel} from "../book/book.component.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public http : HttpClient) { }

  getFirstTrans():any{
    return this.http.get<TransactionModel>(
      `http://localhost:8080/api/transaction/first`);
  }
  deleteTrans(trans : TransactionModel):any{
    return this.http.delete<TransactionModel>(
      `http://localhost:8080/api/transaction/${trans.transId}`);
  }

  getAllTrans():any{
    return this.http.get<TransactionModel>(
      `http://localhost:8080/api/transaction`);
  }
  addTrans(trans : TransactionModel) {
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    return this.http.post<TransactionModel>(
      `http://localhost:8080/api/transaction`,trans, {headers : header});
  }

  updateTrans(trans : TransactionModel){
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    return this.http.put<TransactionModel>(
      `http://localhost:8080/api/transaction`,trans, {headers : header});
  }

  getNewCode(){
    return this.http.get<TransactionModel>(
      `http://localhost:8080/api/transaction`);
  }

  findTransactionByCode(codeTrans :String){
   return this.http.get<TransactionModel>(
  `http://localhost:8080/api/transaction/${codeTrans}`);
  }
}
