import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpClientJsonpModule
} from "@angular/common/http";

import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { ITunesLookupResult } from "./interfaces";
import { ITunesTrack } from "../services/interfaces";
import * as _ from "lodash";
import { Jsonp } from "../../../node_modules/@angular/http";

@Injectable()
export class ITunesService {
  public tracks: ITunesTrack[] = [];
  public originals: ITunesTrack[] = [];
  public remixes: ITunesTrack[] = [];
  public error: boolean;
  public errorMessage: string;

  apiRoot: string = "https://itunes.apple.com/search";
  lookupRoot: string = "https://itunes.apple.com/lookup";
  constructor(private http: HttpClient, private jsonp: Jsonp) {}

  getData(term: string) {
    //console.log("getData");
    let apiURL = `${
      this.apiRoot
    }?term=${term}&limit=100&callback=JSONP_CALLBACK`;
    return this.jsonp.request(apiURL).subscribe(res => {
      //console.log("getData map");
      //console.log(res);
    });
  }

  callback() {}

  getITunesData(term: string): Observable<ITunesTrack[]> {
    let apiURL = `${
      this.apiRoot
    }?term=${term}&limit=100&callback=JSONP_CALLBACK`;
    return this.jsonp.request(apiURL).map(
      data => {
        return _
          .uniqBy(data.json().results as ITunesTrack[], "trackCensoredName")
          .sort(
            (l, r): number => {
              if (l.releaseDate > r.releaseDate) return -1;
              if (l.releaseDate < r.releaseDate) return 1;
              return 0;
            }
          );
      },
      (err: HttpErrorResponse) => {
        this.error = true;
        if (err.error instanceof Error) {
          this.errorMessage = err.error.message;
        }
      }
    );
  }

  getOriginals(): Observable<ITunesTrack[]> {
    return this.getITunesData("Downgrooves").map(data => {
      return data.filter(element => {
        return element.artistName.indexOf("Downgrooves") > -1;
      });
    });
  }

  getRemixes(): Observable<ITunesTrack[]> {
    return this.getITunesData("Downgrooves").map(data => {
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
