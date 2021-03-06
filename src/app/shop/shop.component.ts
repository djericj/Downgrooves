import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"]
})
export class ShopComponent extends BaseComponent implements OnInit {
  constructor(private _titleService: Title) {
    super();
  }

  ngOnInit() {
    this._titleService.setTitle("Shop | " + this._siteTitle);
  }
}
