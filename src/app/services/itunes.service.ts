import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { ITunesLookupResult } from "./interfaces";

@Injectable()
export class ITunesService {
  apiRoot: string = "https://itunes.apple.com/search";
  lookupRoot: string = "https://itunes.apple.com/lookup";
  constructor(private http: HttpClient) {}

  getITunesData(term: string): Observable<ITunesLookupResult> {
    let apiURL = `${
      this.apiRoot
    }?term=${term}&media=music&limit=100&entity=song`;

    return this.http.get<ITunesLookupResult>(apiURL);
  }

  getAlbum(id: string) {
    let lookupUrl = `${this.lookupRoot}?id=${id}&entity=song`;
    return this.http.get<ITunesLookupResult>(lookupUrl);
  }
}
