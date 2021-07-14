import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showAdminBoard: boolean = false;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.tokenStorageService.data.subscribe(res => this.showAdminBoard = res);
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
    window.location.replace("/#/login");
  }

  login() {
  }
}
