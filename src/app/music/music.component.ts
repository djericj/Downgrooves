import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ITunesTrack } from "../services/interfaces";
import { ITunesService } from "../services/itunes.service";
import * as _ from "lodash";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";
import { Observable } from "../../../node_modules/rxjs";

@Component({
  selector: "app-music",
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.css"]
})
export class MusicComponent extends BaseComponent implements OnInit {
  public tracks: Observable<ITunesTrack[]>;
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _iTunesService: ITunesService,
    private _titleService: Title
  ) {
    super();
  }

  ngOnInit() {
    this.tracks = this.getITunesData();
    this._titleService.setTitle("Original music | " + this._siteTitle);
  }

  getITunesData(): Observable<ITunesTrack[]> {
    return this._iTunesService.getOriginals().map(
      data => {
        return _.uniqBy(data as ITunesTrack[], "collectionId");
      },
      (err: HttpErrorResponse) => {
        this.error = true;
        if (err.error instanceof Error) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }
}
