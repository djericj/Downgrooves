import { NgModule } from "@angular/core";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { MixesComponent } from "./mixes/mixes.component";
import { MusicComponent } from "./music/music.component";
import { MusicDetailComponent } from "./music/detail/music.detail.component";
import { RemixesComponent } from "./remixes/remixes.component";
import { ShopComponent } from "./shop/shop.component";
import { RouterModule, Routes } from "@angular/router";
import { MixesDetailComponent } from "./mixes/detail/mixes.detail.component";
import { ModularComponent } from "./modular/modular.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "modular", component: ModularComponent },
  { path: "mixes", component: MixesComponent },
  { path: "mix/:name", component: MixesDetailComponent },
  { path: "music", component: MusicComponent },
  { path: "music/:id/:name", component: MusicDetailComponent },
  { path: "remixes", component: RemixesComponent },
  { path: "classics", component: MixesComponent },
  { path: "shop", component: ShopComponent },
  { path: "contact", component: ContactComponent },
  {
    path: "not-found",
    loadChildren: "./not-found/not-found.module#NotFoundModule",
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      useHash: false,
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
