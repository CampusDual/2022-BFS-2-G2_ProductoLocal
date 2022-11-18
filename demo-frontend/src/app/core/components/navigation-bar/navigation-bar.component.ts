import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  private returnUrl = '/';
  selectedLanguage = this.translateService.currentLang;
  userName: string;
  user: User;
  userProfile: string;


  constructor(
    private authService: AuthService,
    private router: Router,
    private logger: LoggerService,
    private translateService: TranslateService,
    private userService: UserService
  ) {
    this.userName = authService.getUserName();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.returnUrl = event.url;
        this.logger.info('NavigationBarComponent returnUrl: ' + this.returnUrl);
      }
    });

  }
  ngOnInit(): void {
    this.userService.getUser(this.userName).subscribe(
      response => {
        this.user = response;
        this.userProfile = this.user.profiles[0].name;
      });
  }

  logout() {
    this.authService.logout();
    // Redirect the user
    this.router.navigateByUrl('/login');
    localStorage.setItem('close_session', '1');
    localStorage.setItem('close_session_language', this.translateService.currentLang);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  toogleLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translateService.use(lang);
  }

  my_profile() {
    this.router.navigate(['/users/getUser']);
  }

  get navVisible() {
    let navVisible: boolean = true;
    if (this.router.url === '/') {
      navVisible = false;
    }
    return navVisible;
  }

  public isAdmin(): boolean {
    return (this.authService.getRoles().includes('ADMIN'));
  }
}
