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
  MyapiKey = "AIzaSyBvWTAjNGrTkCqKBwryv4LX4HkED7ia6ho";

  args = {
    clientId: '871157582032-n07vpulrmradumcoo4anvbnom7a6u6vo.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
    apiKey: "AIzaSyBQfBCA8tKpCL9uQsZNEjYFAGIcrMIh-ak"
  }

  constructor(private googleAuth: GoogleAuthService, private router: Router, private GoogleApi: GoogleApiService, private http: HttpClient) { }

  public signIn(): Observable<object> {
    return this.googleAuth.getAuth();
  }
  


  public signInSuccess(response: GoogleUser) {
    this.user = response;
    sessionStorage.setItem(
      AuthYoutubeService.SESSION_STORAGE_KEY, response.getAuthResponse().access_token
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
