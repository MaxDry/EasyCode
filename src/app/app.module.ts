import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AngularComponent } from './angular/angular.component';
import { SymfonyComponent } from './symfony/symfony.component';
import { DesignUXUIComponent } from './design-uxui/design-uxui.component';
import { GestionProjetComponent } from './gestion-projet/gestion-projet.component';
import { IntegrationComponent } from './integration/integration.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ApiYoutubeComponent } from './api-youtube/api-youtube.component';
import { ApiYoutubeVideoComponent } from './api-youtube-video/api-youtube-video.component';
import { SingleVideoYoutubeComponent } from './single-video-youtube/single-video-youtube.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { ApiYoutubePlaylistComponent } from './api-youtube-playlist/api-youtube-playlist.component';

import { HttpErrorInterceptor } from './http-erreur.intercepteur.service';
import { UpdatePlaylistComponent } from './update-playlist/update-playlist.component';
import { NavbarComponent } from './navbar/navbar.component';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "871157582032-n07vpulrmradumcoo4anvbnom7a6u6vo.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
  ux_mode: "popup",
  scope: [
      "https://www.googleapis.com/auth/youtube"
  ].join(" ")
};

const appRoutes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'angular', component: AngularComponent},
  { path: 'symfony', component: SymfonyComponent},
  { path: 'designUXUI', component: DesignUXUIComponent},
  { path: 'gestionDeProjet', component: GestionProjetComponent},
  { path: 'integration', component: IntegrationComponent},
  { path: 'playlists', component: ApiYoutubePlaylistComponent},
  { path: 'video/:id', component: SingleVideoYoutubeComponent},
  { path: 'update-playlist/:id', component: UpdatePlaylistComponent},
  
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AngularComponent,
    SymfonyComponent,
    DesignUXUIComponent,
    GestionProjetComponent,
    IntegrationComponent,
    AccueilComponent,
    ApiYoutubeComponent,
    ApiYoutubeVideoComponent,
    SingleVideoYoutubeComponent,
    FooterComponent,
    ApiYoutubePlaylistComponent,
    UpdatePlaylistComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig,
    }),
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
