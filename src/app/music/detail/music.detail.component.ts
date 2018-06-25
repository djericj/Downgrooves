import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ITunesService } from "../../services/itunes.service";
import { ITunesTrack } from "../../services/interfaces";
import * as _ from "lodash";
import * as moment_ from "moment";

@Component({
  selector: "app-music-detail",
  templateUrl: "./music.detail.component.html",
  styleUrls: ["./music.detail.component.css"]
})
export class MusicDetailComponent implements OnInit {
  public tracks: ITunesTrack[];
  public album: ITunesTrack;
  public formattedReleaseDate: string;
  constructor(
    private _route: ActivatedRoute,
    private _iTunesService: ITunesService
  ) {}

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this._route.params.subscribe(params => {
      let collectionId = params["id"];
      this._iTunesService.getAlbum(collectionId).subscribe(data => {
        this.tracks = data.results.filter(x => x.kind == "song");
        this.album = data.results[0];
        this.formattedReleaseDate = moment_(this.album.trackTimeMillis).format(
          "MMM YYYY"
        );
        console.log(this.tracks);
      });
    });
  }
}
