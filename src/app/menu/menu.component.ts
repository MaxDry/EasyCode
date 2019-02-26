import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import GoogleUser = gapi.auth2.GoogleUser;
import { AuthYoutubeService } from '../auth-youtube.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  private user: GoogleUser;
  private userLogged = false;
  imagesrc = "../../assets/pictures/logo WC Menu.png";

  constructor(private youtubeAuth: AuthYoutubeService, private router: Router) { }

  ngOnInit() {
  }

  signin(){
    const response = this.youtubeAuth.signIn();
    response.subscribe((auth: GoogleUser) => {
      auth.signIn()
        .then(res => {
          console.log(res);
          this.youtubeAuth.signInSuccessHandler(res);
          this.user = res;
          if(res != undefined){
            document.getElementById("lien-accueil").click();
          }
        }
        );
    });
    
  }

  isLogged(){
    this.user = this.youtubeAuth.getUser();
    return this.youtubeAuth.isSignedIn();
  }

  

}
