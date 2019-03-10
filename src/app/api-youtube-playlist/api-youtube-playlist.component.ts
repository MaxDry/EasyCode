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
  displayForm = false;
  constructor(private router: Router, private authYoutube: AuthYoutubeService) { }

  ngOnInit() {
    this.getPlaylists();
  }

  getPlaylists() {
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
              path: "https://www.googleapis.com/youtube/v3/playlists",
              method: "GET",
              params: {
                part: "snippet, contentDetails",
                mine: true,
                maxResults: 50
              }
            }
            // set  client token(key) to access at gapi 
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            //launch request
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
    console.log(idPlaylist);
    if (confirm("Êtes vous sûr de vouloir supprimer cette playlist ?")) {
      this.delete(idPlaylist);

    }
  }
  delete(idPlaylist: string) {
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
            console.log("Gapi has loaded !");
            var data = {
              path: "https://www.googleapis.com/youtube/v3/playlists",
              method: "DELETE",
              params: {
                id: idPlaylist
              }
            }
            // set  client token(key) to access at gapi 
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);

            //launch request
            gapi.client.request(data).then((response) => {
              console.log(response);
              alert('Playlist supprimé');
              document.getElementById("playlists").click();
            },
              (reason) => {
                return reason;
              });
          }

        },
        onerror: function () {
          // Handle loading error.
          alert('GoogleApi a renvoyée une erreur, veuillez reessayer plus tard');
        },
        timeout: 7000, 
        ontimeout: function () {
          // Handle timeout.
          alert('GoogleApi a mit trop de temps pour se charger, veuillez reessayer plus tard ou vérifier votre connexion internet');
        }
      });
    });
  }
  editPlaylist(playlist: any) {
    this.displayForm = true;
    this.router.navigateByUrl("update-playlist/" + playlist);
  }

}