import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ITunesTrack } from "../services/interfaces";
import { ITunesService } from "../services/itunes.service";
import * as _ from "lodash";

@Component({
  selector: "app-music",
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.css"]
})
export class MusicComponent implements OnInit {
  public tracks: ITunesTrack[] = [];
  public originals: ITunesTrack[] = [];
  public remixes: ITunesTrack[] = [];
  constructor(
    private http: HttpClient,
    private _iTunesService: ITunesService
  ) {}

  ngOnInit() {
    this.getITunesData();
  }

  getITunesData(): void {
    this._iTunesService.getITunesData("Downgrooves").subscribe(data => {
      console.log(data);
      this.tracks = _.uniqBy(data.results, "trackCensoredName");
      this.tracks = _.uniqBy(this.tracks, "collectionId").sort(
        (l, r): number => {
          if (l.releaseDate > r.releaseDate) return -1;
          if (l.releaseDate < r.releaseDate) return 1;
          return 0;
        }
      );
      this.originals = this.tracks.filter(element => {
        return element.artistName.indexOf("Downgrooves") > -1;
      });
      this.remixes = this.tracks.filter(element => {
        return element.artistName.indexOf("Downgrooves") == -1;
      });
    });
  }
}
