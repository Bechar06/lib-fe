import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BillComponentModel} from "../bill/bill.model";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(public http : HttpClient) { }

  URL= `http://localhost:8080/api/bill`;

  getFirstBill(): Observable<any> {
    return this.http.get(
      `http://localhost:8080/api/bill/first`);
  }
  getAllBill():Observable<any> {
    return this.http.get(`http://localhost:8080/api/bill`);
  }
  addBill(bill: BillComponentModel) :Observable<any>{
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    return this.http.post(
      this.URL ,bill, {headers : header});
  }
  deleteBill(bill : BillComponentModel):Observable<any> {
    return this.http.delete(
      `http://localhost:8080/api/bill/${bill.billId}`);
  }
  updateBill(bill: BillComponentModel):Observable<any> {
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    return this.http.put(
      this.URL ,bill, {headers : header});
  }
  getNewCode() :Observable<any>{
    return this.http.get(
      this.URL + `/code`);
  }

  findBillByCode(codeBill: string) :Observable<any>{
    return this.http.get(
      this.URL + `/${codeBill}`);
  }
  exportDataFile(billId: number) {
    return this.http.get(`http://localhost:8080/api/bill/print/${billId}`, {
      observe: 'response',
      responseType: 'blob'
    });
  }

}
