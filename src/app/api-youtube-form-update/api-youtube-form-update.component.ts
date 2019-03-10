import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthYoutubeService } from '../auth-youtube.service';

@Component({
  selector: 'app-api-youtube-form-update',
  templateUrl: './api-youtube-form-update.component.html',
  styleUrls: ['./api-youtube-form-update.component.css']
})
export class ApiYoutubeFormUpdateComponent implements OnInit {
  @Input() playlist;


  playlistToUpdate;
  title: string;
  description: string;
  status: number;
  tags: string;
  select;
  choice: string;

  constructor(private route: ActivatedRoute, private authYoutube: AuthYoutubeService) { }

  ngOnInit() {
    this.playlistToUpdate = this.playlist[0];
    // console.log(this.playlist)
    // console.log(this.playlistToUpdate);
  }

  // getFormValue(){
  //   this.title = (<HTMLInputElement>document.getElementById("title")).value;
  //   this.description = (<HTMLInputElement>document.getElementById("description")).value;
  //   this.tags = (<HTMLInputElement>document.getElementById("tags")).value;
  //   this.select = document.getElementById("status");
  //   this.choice = this.select.selectedIndex;
  //   this.status = this.select.options[this.choice].value;
  //   return this.title, this.description, this.tags, this.status;
    
  // }

  // updatePlaylist(){
    
  //   this.getFormValue();
  //   console.log(this.playlistToUpdate);
    
  //   if(this.title == undefined && (this.status == undefined || this.status == 0)){
  //     alert("Veuillez remplir le titre et le statut");
  //   }
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
  //                 "id": that.playlistToUpdate.id,
  //                 "snippet":
  //                 {
  //                   "title": that.title,
  //                   "description": that.description,
  //                   "tags": that.tags,
  //                 },
  //                 "status": 
  //                 {
  //                   "privacyStatus": that.status
  //                 }
  //               }
  //             }
  //             console.log(data);
  //             gapi.client.request(data).execute((response) => {
  //               if(response.error != undefined){
  //                 alert("Erreur lors de la mise à jour de la playlist, veuillez réessayer ultérieurement");
  //               }else{
  //                 alert('Playlist modifiée avec succès')
  //                 document.getElementById("playlists").click();
  //               }
  //             })
  //           }
  
  //         },
  //         onerror: function () {
  //           // Handle loading error.
  //           alert('gapi.client failed to load!');
  //         },
  //         timeout: 6000, 
  //         ontimeout: function () {
  //           // Handle timeout.
  //           alert('gapi.client could not load in a timely manner!');
  //         }
  //       });
  //     });
  //   }

}
