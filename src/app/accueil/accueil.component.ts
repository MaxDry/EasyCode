import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  imageLogo = "../../assets/pictures/logo WC Menu.png";

  constructor() { }

  ngOnInit() {
  }

}
