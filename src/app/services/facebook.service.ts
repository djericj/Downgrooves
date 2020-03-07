import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { FacebookSearchResponse } from "./interfaces";

@Injectable()
export class FacebookService {
  access_token =
    "EAAemcBm2PxMBAIpYjOU8ppiwZA5BESNhRAScilh5G3EVgZC6zO2GUUu0kTXtGXkTYnR6C25nCXeNfLYR7ZAmbbmN1pmkoPILsH3qbQy6YHw6rO93wmJq14nwfM3EUXKOh8UdZCI7rROaYzyTO4Yc0n95O3adwOi9OCaRMvpnxgZDZD";
  url =
    "https://graph.facebook.com/v3.0/Downgrooves/?fields=posts{permalink_url,message,story,created_time,id}&access_token=";
  page_id = "43101407477";
  app_id = "2153325234896659";
  app_secret = "d062fa0eff5c9b5e08ffbe42bb022eb9";
  constructor(private http: HttpClient) {}

  getPosts(): Observable<FacebookSearchResponse> {
    const apiURL = `${this.url}${this.access_token}`;
    return this.http.get<FacebookSearchResponse>(apiURL);
  }

  refreshAccessToken() {
    let url = `https://graph.facebook.com/oauth/access_token?client_id=${this.app_id}&client_secret=${this.app_secret}&grant_type=fb_exchange_token&fb_exchange_token=${this.access_token}`;
  }
}
