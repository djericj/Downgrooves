import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AudioService } from "../services/audio.service";
import { ITunesTrack } from "../services/interfaces";
import { soundManager } from "soundmanager2";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  title;
  position;
  elapsed;
  percentElapsed;
  duration;
  status: string;
  track: Observable<ITunesTrack>;
  paused;
  volume;
  length;
  trackViewUrl;

  constructor(private audioService: AudioService) {}

  setPausePlayButton() {
    this.paused = this.status === "paused" || this.status === "ended";
  }

  ngOnInit() {
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

    // this.audioService.getPlayerStatus().subscribe(x => {
    //   this.status = x;
    //   this.setPausePlayButton();
    //   this.handleStatusChanged();
    // });
    // // On song end
    // this.audioService.audio.onended = this.handleEnded.bind(this);
    // // On play time update
    // this.audioService.audio.ontimeupdate = this.handleTimeUpdate.bind(this);
  }

  play() {}
  pause() {}
  forward() {}
  backward() {}
  fastFoward() {}
  fastBackward() {}

  // ngOnDestroy() {
  //   this.audioService.getPlayerStatus().unsubscribe()
  // }

  handleStatusChanged() {
    //console.log('status');
    //console.log(this.status);
    if (this.status === "playing") {
      this.track = this.audioService.currentTrack;
      console.log(this.track);
      //this.title = this.track.name;
    }
  }

  handleLoaded() {
    //console.log("handleLoaded")
  }

  handleEnded(e) {
    // this.handleRandom();
  }

  handleTimeUpdate(e) {
    this.elapsed = this.audioService.timeElapsed.value;
    this.percentElapsed = this.audioService.percentElapsed.value;
    this.position = this.audioService.timeRemaining.value;
  }

  handlePausePlay() {
    if (this.status == "playing") {
      this.audioService.pauseAudio();
    }
    if (this.status == "paused") {
      this.audioService.playAudio();
    }
  }

  handleStop() {
    this.audioService.audio.pause();
    this.audioService.audio.currentTime = 0;
    this.paused = false;
  }

  handleBackward() {
    let elapsed = this.audioService.timeElapsed;
  }

  handleForward() {
    let elapsed = this.audioService.timeElapsed;
  }

  handleVolumeUp() {}

  handleVolumeDown() {}
}
