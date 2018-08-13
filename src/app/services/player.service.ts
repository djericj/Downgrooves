import { Injectable } from "@angular/core";
import { soundManager } from "soundmanager2";

@Injectable()
export class PlayerService {
  mySound;
  constructor() {
    soundManager.setup({
      url: "../../node_modules/soundmanager2/swf/soundmanager2.swf",
      onready: function() {
        // var mySound = soundManager.createSound({
        //   id: "aSound",
        //   url: "assets/mp3/eric_j_-_vocal_01.mp3"
        // });
        // mySound.play();
      },
      ontimeout: function() {
        // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
      }
    });
  }

  addToPlaylist(track: string) {
    this.mySound = soundManager.createSound({
      id: track, // use track path as unique id
      url: track
    });
  }

  play() {
    this.stopAll();
    this.mySound.play();
  }

  stop() {
    this.mySound.stop();
  }

  stopAll() {
    soundManager.stopAll();
  }

  pause() {
    this.mySound.pause();
  }

  playTrack(track: string) {
    this.addToPlaylist(track);
    this.play();
  }
}
