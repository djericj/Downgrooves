import { Injectable } from "@angular/core";
import { PlayerTrack, IMix, ITunesTrack } from "./interfaces";
@Injectable()
export class PlayerService {
  private cover;
  private title;
  private artist;
  private file;
  private player: HTMLAudioElement;
  private mp3src;
  constructor() {}

  play(track: PlayerTrack) {
    this.player = <HTMLAudioElement>document.getElementById("player2");
    console.log(this.player);
    if (this.player) {
      console.log(track);
      this.pause();
      this.load(track);
      this.player.play();
      console.log(track);
    }
  }
  resume() {
    if (this.player) {
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
    this.title = $("#track-title");
    this.artist = $("#track-artist");
    this.title.text(track.title);
    this.artist.text(track.artist);
  }
  setCover(track: PlayerTrack) {
    this.cover = $("#cover");
    if (this.cover) {
      this.cover.attr("src", track.cover);
    }
  }
  mixToPlayerTrack(mix: IMix) {
    if (mix) {
      return new PlayerTrack(
        mix.Name,
        "mixed by " + mix.artist,
        "assets/images/mixes/" + mix.attachment,
        "assets/mp3/" + mix.Mp3File,
        mix.Length,
        "assets/mp3/" + mix.Mp3File
      );
    }
  }
  trackToPlayerTrack(track: ITunesTrack) {
    if (track) {
      return new PlayerTrack(
        track.artistName,
        track.trackCensoredName,
        track.artworkUrl100,
        track.previewUrl,
        track.trackTimeMillis,
        track.previewUrl
      );
    }
  }
}
