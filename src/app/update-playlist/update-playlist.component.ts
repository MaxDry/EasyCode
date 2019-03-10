import { Component, OnInit, Input } from '@angular/core';
import { AuthYoutubeService } from '../auth-youtube.service';
import { ActivatedRoute } from '@angular/router';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-update-playlist',
  templateUrl: './update-playlist.component.html',
  styleUrls: ['./update-playlist.component.css']
})
export class UpdatePlaylistComponent implements OnInit {

  playlistId;
  playlistForm;
  playlistToUpdate;
  title: string;
  description: string;
  status: string;
  tags: string;
  select;
  choice: string;
  
  constructor(private route: ActivatedRoute, private authYoutube: AuthYoutubeService) { }

  ngOnInit() {
    this.initForm();
    
  }


initForm(){

  this.route.params.subscribe(params => {
    this.playlistId = params;
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
          console
          // set arguments for the request, only path is required
          if (gapi.client != undefined) {
            var data = {
              path: "https://www.googleapis.com/youtube/v3/playlists",
              method: "GET",
              params: {
                part: "contentDetails,snippet,status",
                id: that.playlistId.id
              }
              
            }
            // set client token(key) to access at gapi 
            gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
            // launch request
            gapi.client.request(data).then((response) => {

              that.playlistForm = response["result"]["items"];
              
            
              // document.getElementById("playlists").click();
              

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


    updatePlaylist(){
      this.playlistToUpdate = this.playlistForm[0];
      if(this.title == undefined ){
        alert("Veuillez remplir le titre ");
      }
      else{
        this.status == 'public';
      

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
              if (gapi.client != undefined) {
                var data = {
                  path: "https://www.googleapis.com/youtube/v3/playlists",
                  method: "PUT",
                  params: {
                    'part': 'snippet,status'
                  },
                  body: {
                    "id": that.playlistToUpdate.id,
                    "snippet":
                    {
                      "title": that.title,
                      "description": that.description,
                      "tags": that.tags,
                    },
                    "status": 
                    {
                      "privacyStatus": that.status
                    }
                  }
                }
              
                // set client token(key) to access at gapi 
                gapi.client.setApiKey(AuthYoutubeService.SESSION_STORAGE_KEY);
               // launch request
                gapi.client.request(data).execute((response) => {
                  console.log(response);
                  if(response.error != undefined){
                    alert("Erreur lors de la mise à jour de la playlist, veuillez réessayer ultérieurement");
                  }else{
                    alert('Playlist modifiée avec succès')
                    document.getElementById("playlists").click();
                    document.getElementById("playlists").click();
                  }
                })
                
              }
            
            },
            onerror: function () {
              // Handle loading error.
              alert('gapi.client failed to load!');
            },
            timeout: 6000, 
            ontimeout: function () {
              // Handle timeout.
              alert('gapi.client could not load in a timely manner!');
            }
          });
        });
        
      }
      }
    
}
