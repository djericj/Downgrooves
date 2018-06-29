import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.css"]
})
export class NotFoundComponent extends BaseComponent implements OnInit {
  constructor(private _titleService: Title) {
    super();
  }

  ngOnInit() {
    this._titleService.setTitle("404 Page not found | " + this._siteTitle);
  }
}
