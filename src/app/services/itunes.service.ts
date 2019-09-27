import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { ITunesLookupResult } from "./interfaces";
import { ITunesTrack } from "../services/interfaces";
import * as _ from "lodash";

@Injectable()
export class ITunesService {
  public tracks: ITunesTrack[] = [];
  public originals: ITunesTrack[] = [];
  public remixes: ITunesTrack[] = [];
  public error: boolean;
  public errorMessage: string;

  apiRoot: string = "https://itunes.apple.com/search";
  lookupRoot: string = "https://itunes.apple.com/lookup";
  constructor(private http: HttpClient) {}

  callback() {}

  getJson(): Observable<any> {
    return this.http
      .get<ITunesTrack[]>("../../assets/itunes.json")
      .map(data => {
        return data["results"];
      });
  }

  // https://itunes.apple.com/search?term=Downgrooves&limit=100&callback=JSONP_CALLBACK
  getITunesData(uniqBy: string): Observable<ITunesTrack[]> {
    return this.getJson().map(
      data => {
        return _.uniqBy(data as ITunesTrack[], uniqBy).sort((l, r): number => {
          if (l.releaseDate > r.releaseDate) return -1;
          if (l.releaseDate < r.releaseDate) return 1;
          return 0;
        });
      },
      (err: HttpErrorResponse) => {
        this.error = true;
        if (err.error instanceof Error) {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      }
    );
  }

  getOriginals(): Observable<ITunesTrack[]> {
    return this.getITunesData("trackCensoredName").map(data => {
      return data.filter(element => {
        return element.artistName.indexOf("Downgrooves") > -1;
      });
    });
  }

  getRemixes(): Observable<ITunesTrack[]> {
    return this.getITunesData("trackCensoredName").map(data => {
      return data.filter(element => {
        return element.artistName.indexOf("Downgrooves") == -1;
      });
    });
  }

  getAlbum(id: string) {
    let lookupUrl = `${this.lookupRoot}?id=${id}&entity=song`;
    return this.http.get<ITunesLookupResult>(lookupUrl);
  }
}
