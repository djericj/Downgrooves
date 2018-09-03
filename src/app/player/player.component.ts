import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlayerService } from "../services/player.service";
import * as $ from "jquery";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  private isPlaying: boolean;
  private playButton;
  private pauseButton;
  constructor(private _playerService: PlayerService) {
    this.playButton = $("#play-button");
    this.pauseButton = $("#pause-button");
    this.togglePlayPause();
  }

  ngOnInit() {}

  resume() {
    this.isPlaying = true;
    this.togglePlayPause();
    //this._playerService.resume();
  }

  pause() {
    this.isPlaying = false;
    this.togglePlayPause();
   // this._playerService.pause();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.playButton.hide();
      this.pauseButton.show();
    }
    if (!this.isPlaying) {
      this.playButton.show();
      this.pauseButton.hide();
    }
  }
}
