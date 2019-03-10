import { Component, OnInit } from '@angular/core';
import { AuthYoutubeService } from '../auth-youtube.service';
import { ActivatedRoute } from '@angular/router';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';

@Component({
  selector: 'app-update-playlist',
  templateUrl: './update-playlist.component.html',
  styleUrls: ['./update-playlist.component.css']
})
export class UpdatePlaylistComponent implements OnInit {
  playlist;
  playlistToUpdate;
  displayForm = false;
  title: string;
  description: string;
  status: number;
  tag: string;
  
  constructor(private route: ActivatedRoute, private authYoutube: AuthYoutubeService) { }

  ngOnInit() {
    this.initForm();
  }


initForm(){
    
    this.route.params.subscribe(params => {
      this.playlist = params;
    });
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
                part: "snippet,contentDetails",
                id: that.playlist.id
              }
            }
            // set client token(key) to access at gapi 
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            // launch request
            gapi.client.request(data).then((response) => {
              console.log(response)
              that.playlistToUpdate = response["items"];
              // console.log(response["items"])
              if (that.playlistToUpdate != undefined) {
                that.displayForm = true;
              }
              return that.playlistToUpdate;

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


  // updatePlaylist(){
  //   if(this.title == undefined && (this.status == undefined || this.status == 0)){
  //     alert("Veuillez remplir le titre et le statut");
  //   }else{
  //     let status;
  //     switch(this.selectStatus){
  //       case 0:
  //         status = "private";
  //       break;
  //       case 1:
  //         status = "public";
  //       break;
  //     }
  //     this.authYoutube.getGoogleApiService().subscribe(() => {

  //       let that = this;
  //       //  loading library client OAuth
  //       gapi.load('client:auth2', {
  //         callback: function () {
  //           // initializing client Google api with attribute "args" in authYoutubeService
  //           gapi.client.init(that.authYoutube.args).then(
  //             (value) => {
  //               console.log(value)
  //             },
  //             (reason) => {
  //               console.log(reason)
  //             }
  //           );
  //           if (gapi.client != undefined) {
  //             var data = {
  //               path: "https://www.googleapis.com/youtube/v3/playlists",
  //               method: "PUT",
  //               params: {
  //                 'part': 'snippet,status'
  //               },
  //               body: {
  //                 "id": that.playlistModif.id,
  //                 "snippet":
  //                 {
  //                   "title": that.inputTitle,
  //                   "description": that.inputDescription,
  //                   "tags": that.inputTags,
  //                 },
  //                 "status": 
  //                 {
  //                   "privacyStatus": status
  //                 }
  //               }
  //             }
  //             console.log(data);
  //             gapi.client.request(data).execute((response) => {
  //               if(response.error != undefined){
  //                 alert("Erreur lors de la mise à jour de la playlist");
  //               }else{
  //                 document.getElementById("lien-playlists").click();
  //               }
  //             })
  //           }
  
  //         },
  //         onerror: function () {
  //           // Handle loading error.
  //           alert('gapi.client failed to load!');
  //         },
  //         timeout: 5000, // 5 seconds.
  //         ontimeout: function () {
  //           // Handle timeout.
  //           alert('gapi.client could not load in a timely manner!');
  //         }
  //       });
  //     });
  //   }

    
  // }
}
