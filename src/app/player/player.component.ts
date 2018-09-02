import { Component, OnInit, OnDestroy } from "@angular/core";
import { PlayerTrack } from "../services/interfaces";
import * as $ from "jquery";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {
  public track: PlayerTrack;
  public status: string;
  paused: boolean;

  mute: boolean;

  currentPlaying: any;

  currentTrackPostion: number;
  currentTrackDuration: number;
  currentTrackProgress: number;
  volume: number;

  // subscriptions
  private _musicPlayerMuteSubscription: any;
  private _musicPlayerTrackIdSubscription: any;
  private _musicPlayerVolumeSubscription: any;
  constructor() {}

  ngOnInit() {
    
  }
}
