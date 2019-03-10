import { Component, OnInit } from '@angular/core';
import { AuthYoutubeService } from './../auth-youtube.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-api-youtube-playlist',
  templateUrl: './api-youtube-playlist.component.html',
  styleUrls: ['./api-youtube-playlist.component.css']
})
export class ApiYoutubePlaylistComponent implements OnInit {
  playlists;
  constructor(private router: Router, private authYoutube: AuthYoutubeService) { }

  ngOnInit() {
    this.getPlaylists();
  }

  getPlaylists() {
    this.authYoutube.getGoogleApiService().subscribe(() => {

    let that = this;  

      //  chargement librairie gapi.client
      gapi.load('client:auth2', {
        callback: function () {

          // On initialise gapi.client
          gapi.client.init(that.authYoutube.args).then(
            (value) => {
              console.log(value)
            },
            (reason) => {
              console.log(reason)
            }
          );
          if (gapi.client != undefined) {
            console.log("Gapi has loaded !");
            var data = {
              path: "https://www.googleapis.com/youtube/v3/playlists",
              method: "GET",
              params: {
                part: "snippet, contentDetails",
                mine: true,
                maxResults: 25
              }
            }
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            gapi.client.request(data).then((response) => {

              that.playlists = response["result"]["items"];
              console.log(that.playlists);
              document.getElementById("playlists").click();
              
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
  deletePlaylist(idPlaylist: string){
    if (confirm("Êtes vous sûr de vouloir supprimer cette playlist ?")) {
      this.delete(idPlaylist);

    }
  }
  delete(idPlaylist: string) {
    this.authYoutube.getGoogleApiService().subscribe(() => {

      let that = this;
      //  on charge auth2 client
      gapi.load('client:auth2', {
        callback: function () {

          // On initialise gapi.client
          gapi.client.init(that.authYoutube.args).then(
            (value) => {
              console.log(value)
            },
            (reason) => {
              console.log(reason)
            }
          );
          if (gapi.client != undefined) {
            console.log("Gapi has loaded !");
            var data = {
              path: "https://www.googleapis.com/youtube/v3/playlist",
              method: "DELETE",
              params: {
                id: idPlaylist
              }
            }
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            gapi.client.request(data).then((response) => {
              console.log(response);
              alert('Playlist supprimé');

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
        timeout: 5000, 
        ontimeout: function () {
          // Handle timeout.
          alert('gapi.client could not load in a timely manner!');
        }
      });
    });
  }

}