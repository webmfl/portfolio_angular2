import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  faCoffee = faCoffee;
  title = 'Portfolio Martín Lazo';
 
  constructor() {  }

  ngOnInit(): void {
  }

  
  

}


