import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleAuthService, GoogleApiService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthYoutubeService {

  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private user: GoogleUser;
  apiKey = "AIzaSyCyaZRe4xMnxqPdh9_fwuizP7bKTreyKNc";
  playlists;
  videosPlaylists;

  args = {
    clientId: '238523767005-90jndv6p8oot3la91kv9u7kg9b3kaj2i.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
    apiKey: "AIzaSyBQfBCA8tKpCL9uQsZNEjYFAGIcrMIh-ak"
  }

  constructor(private googleAuth: GoogleAuthService, private router: Router, private GoogleApi: GoogleApiService, private http: HttpClient) { }

  public signIn(): Observable<object> {
    return this.googleAuth.getAuth();
  }
  


  public signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    sessionStorage.setItem(
      AuthYoutubeService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }

  public getUser() {
    return this.user;
  }

  public isSignedIn() {
    if (this.user != undefined) {
      return this.user.isSignedIn();
    } else {
      return false;
    }

  }

}
