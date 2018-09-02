import { Injectable } from "@angular/core";
import { PlayerTrack } from "./interfaces";

@Injectable()
export class PlayerService {
  private cover;
  private title;
  private artist;
  private file;
  private player: HTMLAudioElement;
  private mp3src;
  constructor() {
    this.cover = $("#cover");
    this.title = $("#track-title");
    this.artist = $("#track-artist");
    this.player = <HTMLAudioElement>document.getElementById("player");
  }

  play(track: PlayerTrack) {
    if (this.player) {
      this.pause();
      this.load(track);
      this.player.play();
    }
  }
  pause() {
    if (this.player) {
      this.player.pause();
    }
  }
  load(track: PlayerTrack) {
    if (this.player) {
      this.setInfo(track);
      this.setCover(track);
      $("#mp3_src").attr("src", track.url);
      this.player.load();
    }
  }
  setInfo(track: PlayerTrack) {
    this.title.text(track.title);
    this.artist.text(track.artist);
  }
  setCover(track: PlayerTrack) {
    if (this.cover) {
      this.cover.attr(
        "src",
        "http://localhost:4200/assets/images/mixes/" + track.cover
      );
    }
  }
}
