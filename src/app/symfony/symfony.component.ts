import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthYoutubeService } from '../auth-youtube.service';


@Component({
  selector: 'app-symfony',
  templateUrl: './symfony.component.html',
  styleUrls: ['./symfony.component.css']
})
export class SymfonyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer, private authYoutube: AuthYoutubeService) { }


  imagesrc = "../../assets/pictures/logoSymfony.png";

  ngOnInit() {
    
  }

}
