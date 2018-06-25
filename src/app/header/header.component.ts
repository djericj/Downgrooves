import { Component, OnInit } from '@angular/core';
import {Routes, RouterModule, Router} from "@angular/router";
import { HomeComponent} from '../home/home.component';
import { AudioService } from '../services/audio.service';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  status:string;
  track:any;

  constructor(private router: Router, private audioService: AudioService) {
  }



  ngOnInit() {
    this.audioService.getPlayerStatus().subscribe((x) => {
      this.status = x;
      this.handleStatusChanged();
    });
  }

  // ngOnDestroy() {
  //   //this.audioService.getPlayerStatus().unsubscribe()
  // }

  handleStatusChanged() {
    //console.log('status');
    //console.log(this.status);
    if(this.status == "playing") {
      this.track = this.audioService.currentTrack;
      console.log(this.track);
    }
  }

  goHome()
  {
    this.router.navigate(['']);
  }

  goMusic()
  {
    this.router.navigate(['music']);
  }

  goMixes() {
    this.router.navigate(['mixes']);
  }

}
