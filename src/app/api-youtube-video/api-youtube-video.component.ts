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

  
  myApiKey = "AIzaSyCyaZRe4xMnxqPdh9_fwuizP7bKTreyKNc";
  videoId = this.route.snapshot.paramMap.get('id');
  dangerousUrl = 'http://www.youtube.com/embed/' + this.videoId;
  videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
  public videos = [];
  private user: GoogleUser;

  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer,private authYoutube: AuthYoutubeService) {
   }

  ngOnInit() {
    this.getVideo();
  }

  //getVideo by id

  public getVideo(){
    this.http.get("https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" + this.videoId + "&key=" + this.myApiKey)
      .subscribe((response: Array<Object>) => {
        this.videos = response["items"];
      });
  }

  post(idVideo: string, type: string){
    console.log(idVideo);

    this.authYoutube.getGoogleApiService().subscribe(() => {

      //  on load auth2 client
      gapi.load('client:auth2', {
        callback: function () {

          // On initialise gapi.client
          gapi.client.init(this.authYoutube.args).then(
            (value ) => {
            },
            (reason ) => {
               console.log(reason) 
            }
          )
          if (gapi.client != undefined) {
            console.log("Gapi has loaded !");
            var data = {
                path: "https://www.googleapis.com/youtube/v3/videos/rate",
                method: "POST",
                params: {
                id: idVideo,
                rating: type
              }
            }
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            gapi.client.request(data).then(
              (response) => {
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
                alert('Erreur lors du dislike ');
              }
              return reason;
            });
          }


        },
        onerror: function () {
          // Handle loading error.
          alert('gapi.client failed to load!');
        },
        timeout: 5000, 
        ontimeout: function () {

          // Handle timeout.
          alert('gapi.client could not load in a timely manner!');
        }
      });
    });
  }
  isLogged(){
    this.user = this.authYoutube.getUser();
    return this.authYoutube.isSignedIn();
  }


}
