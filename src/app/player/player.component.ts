import { Component, OnInit, OnDestroy } from "@angular/core";
import { MusicPlayerService } from "ngx-soundmanager2";
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
  constructor(
    private playerService: PlayerService,
    private _musicPlayerService: MusicPlayerService
  ) {
    this.playerService.status$.subscribe(data => {
      this.status = data;
    });
    this.playerService.currentTrack$.subscribe(data => {
      this.load(data);
    });
  }

  ngOnInit() {
    // Subscribe for mute changes to update bindings
    this.mute = this._musicPlayerService.getMuteStatus();
    this._musicPlayerMuteSubscription = this._musicPlayerService.musicPlayerMuteEventEmitter.subscribe(
      (event: any) => {
        this.mute = event.data;
      }
    );

    // Subscribe for track changes
    this.currentPlaying = this._musicPlayerService.currentTrackData();
    this._musicPlayerTrackIdSubscription = this._musicPlayerService.musicPlayerTrackEventEmitter.subscribe(
      (event: any) => {
        this.currentPlaying = this._musicPlayerService.currentTrackData();
        this.currentTrackPostion = event.data.trackPosition;
        this.currentTrackDuration = event.data.trackDuration;
        this.currentTrackProgress = event.data.trackProgress;
      }
    );

    // subscribe for volume changes
    this.volume = this._musicPlayerService.getVolume();
    this._musicPlayerVolumeSubscription = this._musicPlayerService.musicPlayerVolumeEventEmitter.subscribe(
      (event: any) => {
        this.volume = event.data;
      }
    );
  }

  ngOnDestroy() {
    this._musicPlayerMuteSubscription.unsubscribe();
    this._musicPlayerTrackIdSubscription.unsubscribe();
    this._musicPlayerVolumeSubscription.unsubscribe();
  }

  get progress(): string {
    return this.currentTrackProgress
      ? this.currentTrackProgress.toString() + "%"
      : "0%";
  }

  get playlist(): any {
    return this._musicPlayerService.getPlaylist();
  }

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
