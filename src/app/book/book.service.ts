import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BookComponentModel} from "./book.component.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(public http : HttpClient) { }

  getFirstBook(): Observable<any> {
    return this.http.get(
      `http://localhost:8080/api/book/first`);
  }
  deleteBook(book : BookComponentModel):Observable<any> {
    return this.http.delete(
      `http://localhost:8080/api/book/${book.bookId}`);
  }

  getAllbook():Observable<any> {
    return this.http.get(`http://localhost:8080/api/book`);
  }

  addBook(book: BookComponentModel) :Observable<any>{
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    return this.http.post(
      `http://localhost:8080/api/book`,book, {headers : header});
  }

  updateBook(book: BookComponentModel):Observable<any> {
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    return this.http.put(
      `http://localhost:8080/api/book`,book, {headers : header});
  }
  getNewCode() :Observable<any>{
    return this.http.get(
      `http://localhost:8080/api/book/code`);
  }

  findBookByCode(codeBook: string) :Observable<any>{
    return this.http.get(
      `http://localhost:8080/api/book/${codeBook}`);
  }
}
