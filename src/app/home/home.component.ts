import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";
import { ITunesTrack, FacebookPost } from "../services/interfaces";
import { ITunesService } from "../services/itunes.service";
import { FacebookService } from "../services/facebook.service";
import * as _ from "lodash";
import { HttpErrorResponse } from "../../../node_modules/@angular/common/http";
import { Observable } from "../../../node_modules/rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent extends BaseComponent implements OnInit {
  public tracks: ITunesTrack[];
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _iTunesService: ITunesService,
    private _titleService: Title
  ) {
    super();
  }

  ngOnInit() {
    this._iTunesService
      .getITunesData("collectionId")
      .subscribe((data: ITunesTrack[]) => {
        this.tracks = data;
        console.log(data);
        console.log(this.tracks);
      });
    this._titleService.setTitle(this._siteTitle);
  }

  getITunesData(): Observable<ITunesTrack[]> {
    return this._iTunesService.getITunesData("collectionId").map(
      (data: ITunesTrack[]) => {
        return data;
        // return _.uniqBy(data, "collectionId")
        //   .sort((l, r): number => {
        //     if (l.releaseDate > r.releaseDate) return -1;
        //     if (l.releaseDate < r.releaseDate) return 1;
        //     return 0;
        //   })
        //   .slice(0, 7);
      },
      (err: HttpErrorResponse) => {
        this.error = true;
        if (err.error instanceof Error) {
          this.errorMessage = err.error.message;
          console.log("An error occurred:", err.error.message);
        } else {
          //this.errorMessage = err;
          //console.log(err);
        }
      }
    );
  }
}
