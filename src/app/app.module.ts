import { BrowserModule } from "@angular/platform-browser";
import { BrowserService } from "./services/browser.service";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { AudioService } from "./services/audio.service";
import { MixesService } from "./services/mixes.service";
import { ITunesService } from "./services/itunes.service";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { MixesComponent } from "./mixes/mixes.component";
import { MusicComponent } from "./music/music.component";
import { MusicDetailComponent } from "./music/detail/music.detail.component";
import { PlayerComponent } from "./player/player.component";
import { ShopComponent } from "./shop/shop.component";
import { EnlargeImagePipe } from "./pipes/enlarge-image.pipe";
import { UrlFormatPipe } from "./pipes/url-format.pipe";
import { FormatTrackTimePipe } from "./pipes/format-time.pipe";
import { MixesDetailComponent } from "./mixes/detail/mixes.detail.component";
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    HomeComponent,
    MixesComponent,
    MusicComponent,
    MusicDetailComponent,
    PlayerComponent,
    ShopComponent,
    EnlargeImagePipe,
    UrlFormatPipe,
    FormatTrackTimePipe,
    AboutComponent,
    ContactComponent,
    ShopComponent,
    MixesDetailComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
    // RouterModule.forRoot(routes, {
    //   useHash: false,
    //   onSameUrlNavigation: "reload"
    // })
  ],
  providers: [ITunesService, AudioService, MixesService, BrowserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
