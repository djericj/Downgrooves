import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../services/player.service";
import { PlayerTrack } from "../services/interfaces";
declare var $: any;

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  public track: PlayerTrack;
  public status: string;

  paused: boolean;
  constructor(private playerService: PlayerService) {
    this.playerService.status$.subscribe(data => {
      this.status = data;
    });
    this.playerService.currentTrack$.subscribe(data => {
      this.load(data);
    });
  }

  ngOnInit() {}

  load(track: PlayerTrack) {
    this.track = track;
  }

  play() {
    this.paused = !this.paused;
    this.playerService.play();
  }
  pause() {
    this.paused = !this.paused;
    this.playerService.pause();
  }
  forward() {}
  backward() {}
  fastFoward() {}
  fastBackward() {}
}
