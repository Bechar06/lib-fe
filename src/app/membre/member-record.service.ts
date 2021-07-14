import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MemberRecordComponentModel} from "./member-record.model";

@Injectable({
  providedIn: 'root'
})
export class MemberRecordService {


  constructor(public http : HttpClient) { }

  getFirstMemberRecord():any {
    return this.http.get<MemberRecordComponentModel>(
      `http://localhost:8080/api/memberRecord/first`);
  }
  deleteMemberRecord(memberRecord : MemberRecordComponentModel):any {
    return this.http.delete<MemberRecordComponentModel>(
      `http://localhost:8080/api/memberRecord/${memberRecord.memberRecordId}`);
  }

  getAllmemberRecord():any {
    return this.http.get<MemberRecordComponentModel>(
      `http://localhost:8080/api/memberRecord`);
  }

  addMemberRecord(memberRecord: MemberRecordComponentModel) {
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    return this.http.post<MemberRecordComponentModel>(
      `http://localhost:8080/api/memberRecord `,memberRecord, {headers : header});
  }

  updateMemberRecord(memberRecord: MemberRecordComponentModel) {
    let header = new HttpHeaders();
    header= header.append('content-type', 'application/json');
    return this.http.put<MemberRecordComponentModel>(
      `http://localhost:8080/api/memberRecord`,memberRecord, {headers : header});
  }
  getNewCode() {
    return this.http.get<MemberRecordComponentModel>(
      `http://localhost:8080/api/memberRecord/code`);
  }

  findMemberRecordByCode(codeMemberRecord: string) {
    return this.http.get<MemberRecordComponentModel>(
      `http://localhost:8080/api/memberRecord/${codeMemberRecord}`);
  }}
