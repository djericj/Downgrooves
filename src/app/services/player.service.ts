import { ITunesTrack, IMix, PlayerTrack } from "../services/interfaces";
import { Subject } from "../../../node_modules/rxjs/Subject";
//var soundManager: any;
export class PlayerService {
  mySound;
  playerTrack: PlayerTrack;

  currentTrack$: Subject<any> = new Subject<any>();
  status$: Subject<any> = new Subject<any>();

  constructor() {
    // soundManager.setup({
    //   url: "../../node_modules/soundmanager2/swf/soundmanager2.swf",
    //   onready: function() {
    //     // document.ready goes here
    //   },
    //   ontimeout: function() {
    //     // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
    //   }
    // });
  }

  load(track: PlayerTrack) {
    // this.mySound = soundManager.createSound({
    //   id: track.audioFile, // use track path as unique id
    //   url: track.audioFile
    // });
    this.status$.next("load");
    this.currentTrack$.next(track);
  }

  clear() {
    this.status$.next("clear");
    this.mySound = null;
  }

  play() {
    this.status$.next("play");
    this.mySound.play();
  }

  stop() {
    this.status$.next("stop");
    this.mySound.stop();
  }

  stopAll() {
    //soundManager.stopAll();
  }

  pause() {
    this.status$.next("pause");
    this.mySound.pause();
  }

  playTrack(track: ITunesTrack) {
    this.stopAll();
    var t = new PlayerTrack(
      track.artistName,
      track.trackName,
      track.artworkUrl100,
      track.previewUrl,
      track.trackTimeMillis,
      track.previewUrl
    );
    this.load(t);
    this.play();
  }

  playMix(mix: IMix) {
    this.stopAll();
    var track = new PlayerTrack(
      "mixed by " + mix.artist,
      mix.Name,
      "assets/images/mixes/" + mix.attachment,
      mix.Mp3File,
      "0",
      "assets/images/mixes/" + mix.attachment
    );
    this.load(track);
    this.play();
  }
}
