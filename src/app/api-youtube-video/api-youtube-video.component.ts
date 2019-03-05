import { Component, OnInit } from '@angular/core';
import { AuthYoutubeService } from './../auth-youtube.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


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

  postRate(idVideo: string, type: string){
    console.log(idVideo);
    let args = {
      clientId: '238523767005-90jndv6p8oot3la91kv9u7kg9b3kaj2i.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      scope: 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly',
      apiKey: "AIzaSyBvWTAjNGrTkCqKBwryv4LX4HkED7ia6ho"
    }
    this.authYoutube.getGoogleApiService().subscribe(() => {

      //  on load auth2 client
      gapi.load('client:auth2', {
        callback: function () {

          // On initialise gapi.client
          gapi.client.init(args).then(
            (value ) => {
              console.log(value)
            },
            (reason ) => {
               console.log(reason) 
            }
          );
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
            gapi.client.request(data).then((response) => {
              console.log(response);
              
            },
            (reason) => {
              return reason;
            });
          }

        },
        onerror: function () {
          // Handle loading error.
          alert('gapi.client failed to load!');
        },
        timeout: 5000, // 5 seconds.
        ontimeout: function () {

          // Handle timeout.
          alert('gapi.client could not load in a timely manner!');
        }
      });
    });
  }

}
