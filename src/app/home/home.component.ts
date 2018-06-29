import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor(private _titleService: Title) {
    super();
  }

  ngOnInit() {
    this._titleService.setTitle(this._siteTitle);
  }
}
