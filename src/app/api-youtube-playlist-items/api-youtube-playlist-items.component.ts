import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthYoutubeService } from '../auth-youtube.service';

@Component({
  selector: 'app-api-youtube-playlist-items',
  templateUrl: './api-youtube-playlist-items.component.html',
  styleUrls: ['./api-youtube-playlist-items.component.css']
})
export class ApiYoutubePlaylistItemsComponent implements OnInit {
  playlistItems ;
  playlistId = this.route.snapshot.paramMap.get('id');
  constructor(private router: Router,private route: ActivatedRoute, private authYoutube: AuthYoutubeService) { }

  ngOnInit() {
    this.getPlaylistItems();
    setTimeout(() => {
      console.log('')
    }, 1000);
    setTimeout(() => {
      console.log('')
    }, 1500);
  }

  getPlaylistItems() {
    this.authYoutube.getGoogleApiService().subscribe(() => {

    let that = this;  

      //  loading library client OAuth
      gapi.load('client:auth2', {
        callback: function () {

          // initializing client Google api with attribute "args" in authYoutubeService
          gapi.client.init(that.authYoutube.args).then(
            (value) => {
              console.log(value)
            },
            (reason) => {
              console.log(reason)
            }
          );
          // set arguments for the request, only path is required
          if (gapi.client != undefined) {
            var data = {
              path: "https://www.googleapis.com/youtube/v3/playlistItems",
              method: "GET",
              params: {
                part: "snippet,contentDetails",
                playlistId : that.playlistId,
                maxResults: 50
              }
            }
            // set  client token(key) to access at gapi 
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            //launch request
            gapi.client.request(data).then((response) => {
              that.playlistItems = response["result"]["items"];
            },
              (reason) => {
                return reason;
              });
          }

        },
        onerror: function () {
          // Handle loading error.
          alert('Erreur lors du chargement de Google Api');
        },
        timeout: 5000, 
        ontimeout: function () {
          // Handle timeout.
          alert('Google Api a mit trop de temps pour ce charger, temps dépassé');
        }
      });
    });

  }
 
}
