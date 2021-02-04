import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: 'ZONIONS';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showHomeBoard = false;
  showCreateBoard = false;
  showListBoard = false;
  user = false;
  admin = false;
  username?: string;
  supportLanguages = ['en', 'fr', 'de', 'hi'];
  constructor(private tokenStorageService: TokenStorageService, private translateService: TranslateService,
              private router: Router) {

    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('en');

    const browserlang = this.translateService.getBrowserLang();

    console.log('Browser Language => ', browserlang);

    if (this.supportLanguages.includes(browserlang)) {
      this.translateService.use(browserlang);
    }
   }

   useLang(lang: string): void {
    console.log('selected language ==> ', lang);
    this.translateService.use(lang);
  }




  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      if (user.roles === 'ROLE_USER'){
        this.user = true;
      }
      else{
        this.admin = true;
      }
      this.roles = user.roles;

      this.showHomeBoard = this.roles.includes('ROLE_USER');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showCreateBoard = this.roles.includes('ROLE_ADMIN');
      this.showListBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
  }

  logout(): void {
    this.revert();
    this.tokenStorageService.signOut();

  }

  revert(): void {
    this.router.navigate(['/login']);
  }

}
