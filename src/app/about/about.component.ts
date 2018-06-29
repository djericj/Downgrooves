import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent extends BaseComponent implements OnInit {
  constructor(private _titleService: Title) {
    super();
    this._titleService.setTitle("Who we are | " + this._siteTitle);
  }

  ngOnInit() {}
}
