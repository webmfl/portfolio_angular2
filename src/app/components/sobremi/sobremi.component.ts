import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.css']
})
export class SobremiComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;

    }
  }

}
