import { Component, OnInit } from '@angular/core';
import { AuthYoutubeService } from './../auth-youtube.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-api-youtube-playlist',
  templateUrl: './api-youtube-playlist.component.html',
  styleUrls: ['./api-youtube-playlist.component.css']
})
export class ApiYoutubePlaylistComponent implements OnInit {
  playlistsUser;
  constructor(private authYoutube: AuthYoutubeService, private router: Router) { }

  ngOnInit() {
    this.getPlaylists();
  }

  getPlaylists() {
    this.authYoutube.getGoogleApiService().subscribe(() => {
    let that = this;  
      console.log("subscribe passed");
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
                part: "snippet",
                mine: true
              }
            }
            gapi.client.request(data).then((response) => {

              this.playlistsUser = response["result"]["items"];
              if (that.playlistsUser != undefined) {
                console.log(that.playlistsUser);
              }

            },
              (reason) => {
                return reason;
              });
          }

        },
        onerror: function () {
          // Handle loading error.
          alert('Erreur lors du chargement de gapi');
        },
        timeout: 5000, // 5 seconds.
        ontimeout: function () {
          // Handle timeout.
          alert('gapi a mit trop de temps pour ce charger, temps dépassé');
        }
      });
    });

  }
}