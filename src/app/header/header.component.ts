import { Component, OnInit } from "@angular/core";
import { Event, Router, NavigationEnd } from "@angular/router";
import { AudioService } from "../services/audio.service";
import { LayoutService } from "../services/layout.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  status: string;
  track: any;

  constructor(
    private router: Router,
    private audioService: AudioService,
    private layoutService: LayoutService
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationEnd:
          console.log(new Date());
          //this.app.bindEvents();
          layoutService.fixHeaderHeight();
          break;
      }
    });
  }

  ngOnInit() {
    this.audioService.getPlayerStatus().subscribe(x => {
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
    if (this.status == "playing") {
      this.track = this.audioService.currentTrack;
      console.log(this.track);
    }
  }
}
