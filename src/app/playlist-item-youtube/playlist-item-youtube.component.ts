import { Component, OnInit } from '@angular/core';
import { AuthYoutubeService } from '../auth-youtube.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-playlist-item-youtube',
  templateUrl: './playlist-item-youtube.component.html',
  styleUrls: ['./playlist-item-youtube.component.css']
})
export class PlaylistItemYoutubeComponent implements OnInit {
   itemId = this.route.snapshot.paramMap.get('id');
   items;
   dangerousUrl = 'http://www.youtube.com/embed/' + this.itemId;
   videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer,private authYoutube: AuthYoutubeService) { }

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
                part: "snippet",
                id : that.itemId
              }
            }
            // set  client token(key) to access at gapi 
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            //launch request
            gapi.client.request(data).then((response) => {
              that.items = response["result"]["items"];
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
