import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLogged = false;

  constructor(private tokenService: TokenService,
              private _router: Router) { }

  ngOnInit() {
    
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }

  }

  public logOut(): void {
    this.isLogged = false;
    window.sessionStorage.clear();
    
  
  }

}
