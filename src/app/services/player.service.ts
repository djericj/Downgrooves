import { Injectable } from "@angular/core";
import { PlayerTrack, IMix, ITunesTrack } from "./interfaces";
import * as moment from "moment";
import "moment-duration-format";

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
    //console.log(this.player);
    if (this.player) {
      //console.log(track);
      this.pause();
      this.load(track);
      this.player.play();
      this.player.onprogress = function() {};
      //console.log(track);
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
      this.initProgressBar();
      $("#player-region").show();
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

  initProgressBar() {
    var player = <HTMLAudioElement>document.getElementById("player2");
    var length = player.duration;
    var current_time = player.currentTime;
    var progressbar = <HTMLProgressElement>document.getElementById("seek-obj");

    player.addEventListener("loadedmetadata", function() {
      var totalLength = formatTime(player.duration);
      document.getElementById("end-time").innerHTML = totalLength;
    });

    player.addEventListener("timeupdate", function() {
      var currentTime = formatTime(player.currentTime);
      document.getElementById("start-time").innerHTML = currentTime;
      var pct = player.currentTime / player.duration;
      document.getElementById("progress-bar").style.width =
        (pct * 100).toFixed() + "%";
      //console.log(player.currentTime / player.duration);
    });

    // calculate total length of value
    //var totalLength = calculateTotalValue(length);
    //document.getElementById("end-time").innerHTML = player.duration.toFixed();
    //document.getElementById("end-time").innerHTML = progressbar.max.toFixed();

    // calculate current value time
    //var currentTime = calculateCurrentValue(current_time);
    //document.getElementById("start-time").innerHTML = currentTime;

    //progressbar.value = player.currentTime / player.duration;
    progressbar.addEventListener("click", seek);
    progressbar.addEventListener("progress", prog);

    if (player.currentTime == player.duration) {
      document.getElementById("play-btn").className = "";
    }

    function formatTime(seconds: number) {
      let minutes: any = Math.floor(seconds / 60);
      let secs: any = Math.floor(seconds % 60);

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (secs < 10) {
        secs = "0" + secs;
      }

      return minutes + ":" + secs;
    }

    function prog() {
      var progressbar = <HTMLProgressElement>(
        document.getElementById("seek-obj")
      );
      //console.log(progressbar.value.toFixed());
      document.getElementById(
        "end-time"
      ).innerHTML = progressbar.value.toFixed();
    }

    function seek(event) {
      var percent = event.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      progressbar.value = percent / 100;
    }
  }
}
