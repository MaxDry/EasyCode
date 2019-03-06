import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthYoutubeService } from '../auth-youtube.service';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
  selector: 'app-api-youtube',
  templateUrl: './api-youtube.component.html',
  styleUrls: ['./api-youtube.component.css']
})
export class ApiYoutubeComponent implements OnInit {

  
  @Input() searchVideo: string;

  search = "";

  imagesrc = "../../assets/pictures/logoSymfony.png";

  myApiKey = "AIzaSyCyaZRe4xMnxqPdh9_fwuizP7bKTreyKNc";
  urlListSymfony = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=Symfony+4&key="+ this.myApiKey;
  videoUrl = "";
  next = "";
  previous = "";
  public videos = [];
  
  constructor(private authYoutube: AuthYoutubeService,private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) { }

    ngOnInit() {
    // S'il y a un parametre de création de composant
    
    if(this.searchVideo !== null){
      // on cherche les vidéos du sujet et ensuite on assigne la recherche au thème du parametre
      this.getVideos(this.searchVideo);
      this.search = this.searchVideo;
      
    }
  }

  //get video by search by keyword
  public getVideos(varSearch: string){
    varSearch = varSearch.replace(" ", "%7C");
    this.search = varSearch;
    
    this.http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + varSearch + "&type=video&videoCaption=any&key=" + this.myApiKey + "&maxResults=6")
      .subscribe((response: Array<Object>) => {
        this.videos = response["items"];
        this.next = response["nextPageToken"];
        
        this.videos.forEach(element => {
          this.videoUrl = 'http://www.youtube.com/embed/' + element["id"]["videoId"] + '?enablejsapi=1&origin=http://example.com&rel=1';
          element['urlSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
        });
      });
  }
  getVideosNext(){
    this.http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + this.search + "&type=video&videoCaption=any&key="+ this.myApiKey + "&maxResults=6&pageToken=" + this.next)
      .subscribe((response: Array<Object>) => {
        this.videos = response["items"];
        this.next = response["nextPageToken"];
        this.previous = response["prevPageToken"];
        this.videos.forEach(element => {
          this.videoUrl = 'http://www.youtube.com/embed/' + element["id"]["videoId"] + '?enablejsapi=1&origin=http://example.com';
          element['urlSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
        });
      });
  }
  getVideosPrev(){
    this.http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + this.search + "&type=video&videoCaption=any&key=" + this.myApiKey + "&maxResults=6&pageToken=" + this.previous)
      .subscribe((response: Array<Object>) => {
        this.videos = response["items"];
        this.next = response["nextPageToken"];
        this.previous = response["prevPageToken"];
        this.videos.forEach(element => {
          this.videoUrl = 'http://www.youtube.com/embed/' + element["id"]["videoId"] + '?enablejsapi=1&origin=http://example.com';
          element['urlSecure'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
        });
      });
  }

}
