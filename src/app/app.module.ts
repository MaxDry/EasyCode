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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
