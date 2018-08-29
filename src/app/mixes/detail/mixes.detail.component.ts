import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MixesService } from "../../services/mixes.service";
import { PlayerService } from "../../services/player.service";
import { IMix } from "../../services/interfaces";
import * as moment_ from "moment";
import { Title } from "@angular/platform-browser";
import { BaseComponent } from "../../base/base.component";
import { MusicPlayerService } from "ngx-soundmanager2";

@Component({
  selector: "app-mixes-detail",
  templateUrl: "./mixes.detail.component.html",
  styleUrls: ["./mixes.detail.component.css"]
})
export class MixesDetailComponent extends BaseComponent implements OnInit {
  public mix: IMix;
  songs: Array<any>;
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService,
    private _titleService: Title,
    private _playerService: PlayerService,
    private _musicPlayerService: MusicPlayerService
  ) {
    super();
  }

  ngOnInit() {
    this.getDetail();

    this.songs = [
      {
        id: "one",
        title: "The Sunday Shore",
        artist: "Mario & Eric J",
        url:
          "http://localhost:4200/assets/mp3/mario_and_eric_j_-_the_sunday_shore.mp3",
        image: "http://localhost:4200/assets/images/mixes/sundayshore.png"
      }
    ];
  }

  playMix() {
    this._playerService.playMix(this.mix);
  }

  getDetail() {
    this._route.params.subscribe(params => {
      let name = params["name"];
      this._mixesService.getMix(name).subscribe(data => {
        this.mix = data;
        this.mix.CreateDate = moment_(this.mix.CreateDate).format("MMM YYYY");
        console.log(this.mix);
        this._titleService.setTitle(
          this.mix.Name +
            " mixed by " +
            this.mix.artist +
            " | " +
            this._siteTitle
        );
      });
    });
  }
}
