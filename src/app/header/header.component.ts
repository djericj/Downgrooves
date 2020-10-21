import { Component, OnInit, Renderer, ElementRef } from "@angular/core";
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
  show = false;

  constructor(
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationEnd:
          //console.log(new Date());
          //this.app.bindEvents();
          //layoutService.fixHeaderHeight();
          break;
      }
    });
  }

  ngOnInit() {}

  // ngOnDestroy() {
  //   //this.audioService.getPlayerStatus().unsubscribe()
  // }

  toggleCollapse() {
    this.show = !this.show;
    this.renderer.setElementClass(
      this.el.nativeElement.querySelector("#navbar"),
      "show",
      false
    );
  }
}
