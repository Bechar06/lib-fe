import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {TokenStorageService} from "../../_services/token-storage.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  title = 'app works!';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  fullName: string;


  constructor(private titleService: Title, router: Router,
              activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService) {
  }

  private user: any = {};

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.fullName = user.firstName +" " + user.lastName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.tokenStorageService.updatedDataSelection(this.showAdminBoard);
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }


}
