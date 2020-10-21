import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITunesTrack } from "./interfaces";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ModularService {
  constructor(private http: HttpClient) {}

  callback() {}

  getJson(): Observable<any> {
    return this.http
      .get<any>("../../assets/youtube.playlist.json")
      .map((data) => {
        console.log(data);
        return data;
      });
  }
}
