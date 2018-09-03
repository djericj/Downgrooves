import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";
import {
  ITunesTrack,
  FacebookPost,
  FacebookData
} from "../services/interfaces";
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
  public tracks: Observable<ITunesTrack[]>;
  public posts: FacebookPost[];
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _iTunesService: ITunesService,
    private _facebookService: FacebookService,
    private _titleService: Title
  ) {
    super();
  }

  ngOnInit() {
    this.getPosts();
    this.tracks = this.getITunesData();
    this._titleService.setTitle(this._siteTitle);
  }

  getPosts(): void {
    this._facebookService.getPosts().subscribe(d => {
      //console.log(d.posts.data);
      this.posts = d.posts.data;
    });
  }

  getITunesData(): Observable<ITunesTrack[]> {
    return this._iTunesService.getITunesData("Downgrooves").map(
      data => {
        return _
          .uniqBy(data, "collectionId")
          .sort(
            (l, r): number => {
              if (l.releaseDate > r.releaseDate) return -1;
              if (l.releaseDate < r.releaseDate) return 1;
              return 0;
            }
          )
          .slice(0, 7);
      },
      (err: HttpErrorResponse) => {
        this.error = true;
        if (err.error instanceof Error) {
          this.errorMessage = err.error.message;
          //console.log("An error occurred:", err.error.message);
        } else {
          //this.errorMessage = err;
          //console.log(err);
        }
      }
    );
  }
}
