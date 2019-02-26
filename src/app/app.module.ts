import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AngularComponent } from './angular/angular.component';
import { SymfonyComponent } from './symfony/symfony.component';
import { DesignUXUIComponent } from './design-uxui/design-uxui.component';
import { GestionProjetComponent } from './gestion-projet/gestion-projet.component';
import { IntegrationComponent } from './integration/integration.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ApiYoutubeComponent } from './api-youtube/api-youtube.component';
import { ApiYoutubeVideoComponent } from './api-youtube-video/api-youtube-video.component';
import { SingleVideoYoutubeComponent } from './single-video-youtube/single-video-youtube.component';
import { SearchbarVideoComponent } from './searchbar-video/searchbar-video.component';
import { FooterComponent } from './footer/footer.component';
import {
  GoogleApiModule, 
  GoogleApiService, 
  GoogleAuthService, 
  NgGapiClientConfig, 
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "238523767005-90jndv6p8oot3la91kv9u7kg9b3kaj2i.apps.googleusercontent.com",
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
  { path: 'playlists', component: PlaylistsComponent},
  { path: 'video/:id', component: SingleVideoYoutubeComponent},
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
    PlaylistsComponent,
    AccueilComponent,
    ApiYoutubeComponent,
    ApiYoutubeVideoComponent,
    SingleVideoYoutubeComponent,
    SearchbarVideoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
