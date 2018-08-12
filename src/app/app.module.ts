/* modules */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app.routes";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { HttpModule, JsonpModule, Jsonp, Response } from "@angular/http";
import { IsotopeModule } from "ngx-isotope/index";
import { NgxSoundmanager2Module } from "ngx-soundmanager2";

/* services */
import { BrowserService } from "./services/browser.service";
import { AudioService } from "./services/audio.service";
import { MixesService } from "./services/mixes.service";
import { FacebookService } from "./services/facebook.service";
import { ITunesService } from "./services/itunes.service";
import { LayoutService } from "./services/layout.service";

/* components */
import { AppComponent } from "./app.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { MixesComponent } from "./mixes/mixes.component";
import { MusicComponent } from "./music/music.component";
import { MusicDetailComponent } from "./music/detail/music.detail.component";
import { PlayerComponent } from "./player/player.component";
import { ShopComponent } from "./shop/shop.component";
import { MixesDetailComponent } from "./mixes/detail/mixes.detail.component";
import { LoadingComponent } from "./loading/loading.component";
import { RemixesComponent } from "./remixes/remixes.component";
import { FriendsComponent } from "./friends/friends.component";

/* pipes */
import { EnlargeImagePipe } from "./pipes/enlarge-image.pipe";
import { UrlFormatPipe } from "./pipes/url-format.pipe";
import { RemoveUrlsPipe } from "./pipes/remove-urls.pipe";
import { FormatTrackTimePipe } from "./pipes/format-time.pipe";

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
    RemoveUrlsPipe,
    AboutComponent,
    ContactComponent,
    ShopComponent,
    MixesDetailComponent,
    LoadingComponent,
    RemixesComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HttpModule,
    IsotopeModule,
    JsonpModule,
    NgxSoundmanager2Module.forRoot()
  ],
  providers: [
    ITunesService,
    AudioService,
    MixesService,
    BrowserService,
    FacebookService,
    LayoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
