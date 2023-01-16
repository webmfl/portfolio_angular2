import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLogged = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }

  }

  public logOut(): void {
    
    window.sessionStorage.clear();
  
  }

}
