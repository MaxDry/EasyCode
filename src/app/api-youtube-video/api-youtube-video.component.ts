import { Component, OnInit } from '@angular/core';
import { AuthYoutubeService } from './../auth-youtube.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
  selector: 'app-api-youtube-video',
  templateUrl: './api-youtube-video.component.html',
  styleUrls: ['./api-youtube-video.component.css']
})


export class ApiYoutubeVideoComponent implements OnInit {

  type;
  
  myApiKey = "AIzaSyCyaZRe4xMnxqPdh9_fwuizP7bKTreyKNc";
  videoId = this.route.snapshot.paramMap.get('id');
  dangerousUrl = 'http://www.youtube.com/embed/' + this.videoId;
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
  public videos = [];
  private user: GoogleUser;
  idVid;
  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer,private authYoutube: AuthYoutubeService) {
   }

  ngOnInit() {
    this.getVideo();
  }

  //get one Video by  id
  public getVideo(){
    this.http.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" + this.videoId + "&key=" + this.myApiKey)
      .subscribe((response: Array<Object>) => {
        this.videos = response["items"];
        // this.idVid= "/video/" + response["items"]["id"]["videoId"]; 
      // console.log(this.videos)
      });
  }
  isPosted(idVideo: string, type: string)
  {
    if (idVideo != undefined) {
      // document.location.reload()
      return true;
    } else {
      // document.location.reload()
      return false;
    }
  }
  post(idVideo: string, type: string){
    // console.log(idVideo);

    let that = this;
    this.authYoutube.getGoogleApiService().subscribe(() => {

      //  loading library client OAuth
      gapi.load('client:auth2', {
        callback: function () {

          // initializing client Google api with attribute "args" in authYoutubeService
          gapi.client.init(that.authYoutube.args).then(
            (value ) => {
            },
            (reason ) => {
               console.log(reason) 
            }
          );
          // set arguments for the request, only path is required
          if (gapi.client != undefined) {
            var data = {
                path: "https://www.googleapis.com/youtube/v3/videos/rate",
                method: "POST",
                params: {
                id: idVideo,
                rating: type
              }
            }
            // set  client token(key) to access at gapi 
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            //launch request
            gapi.client.request(data).then((response) => {
              if(type == 'like'){
                alert('Vous avez like la vidéo');
          
                
              }
              else{
                alert('Vous avez dislike la vidéo');
              
              }

            },
            (reason) => {
              if(type == 'like'){
                alert('Erreur lors du like');
              }
              else{
                alert('Vous avez dislike la vidéo');
              }
              return reason;
            });
          }


        },
        onerror: function () {
          // Handle loading error.
          alert('GoogleApi a renvoyée une erreur, veuillez reessayer plus tard');
        },
        timeout: 5000, 
        ontimeout: function () {

          // Handle timeout.
          alert('GoogleApi a mit trop de temps pour se charger, veuillez reessayer plus tard ou vérifier votre connexion internet');
        }
      });
    });
  }
  isLogged(){
    this.user = this.authYoutube.getUser();
    return this.authYoutube.isSignedIn();
  }
  isLiked(){
    if(this.type == 'like')
    {
      
    }
  }
  

}
