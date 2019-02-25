import { Component, OnInit , Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-searchbar-video',
  templateUrl: './searchbar-video.component.html',
  styleUrls: ['./searchbar-video.component.css']
})
export class SearchbarVideoComponent implements OnInit {

  @Input() searchVideo: string;
  search = "";
  imagesrc = "../../assets/pictures/logoSymfony.png";

  myApiKey = "AIzaSyCyaZRe4xMnxqPdh9_fwuizP7bKTreyKNc";
  urlListSymfony = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=Symfony+4&key="+ this.myApiKey;
  videoUrl = "";
  next = "";
  publishedAt = "";
  previous = "";
  public videos = [];
  constructor(private http: HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit() {
  
      
    
  }

  

}
