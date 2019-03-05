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

  constructor(private authYoutube: AuthYoutubeService, private router: Router) { }

  ngOnInit() {
  }

  signIn(){
    const response = this.authYoutube.signIn();
    // console.log(response);
    response.subscribe((auth: GoogleUser) => {
      auth.signIn().then(response => {
          this.authYoutube.signInSuccess(response);
          this.user = response;
          console.log(this.user)
          if(response != undefined){
            document.getElementById("symfony").click();
            
          }
        }
        );
    });
  }

  disconnect(){
    this.authYoutube.disconnect();
  }

  isLogged(){
    this.user = this.authYoutube.getUser();
    return this.authYoutube.isSignedIn();
  }

  

}
