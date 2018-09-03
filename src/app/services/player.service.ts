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
      this.cover.attr("src", track.cover);
    }
  }
  mixToPlayerTrack(mix: IMix) {
    if (mix) {
      return new PlayerTrack(
        "mixed by " + mix.artist,
        mix.Name,
        mix.attachment,
        "assets/mp3/" + mix.Mp3File,
        mix.Length,
        "assets/mp3/" + mix.Mp3File
      );
    }
  }
  trackToPlayerTrack(track: ITunesTrack) {
    if (track) {
      console.log(track);
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
