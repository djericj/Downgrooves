import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";
import { ITunesTrack } from "../services/interfaces";
import { ITunesService } from "../services/itunes.service";
import * as _ from "lodash";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent extends BaseComponent implements OnInit {
  public tracks: ITunesTrack[] = [];
  constructor(
    private _iTunesService: ITunesService,
    private _titleService: Title
  ) {
    super();
  }

  ngOnInit() {
    this.getITunesData();
    this._titleService.setTitle(this._siteTitle);
  }

  getITunesData(): void {
    this._iTunesService.getITunesData("Downgrooves").subscribe(data => {
      console.log(data);
      this.tracks = _.uniqBy(data.results, "trackCensoredName");
      this.tracks = _
        .uniqBy(this.tracks, "collectionId")
        .sort(
          (l, r): number => {
            if (l.releaseDate > r.releaseDate) return -1;
            if (l.releaseDate < r.releaseDate) return 1;
            return 0;
          }
        )
        .slice(0, 5);
    });
  }
}
