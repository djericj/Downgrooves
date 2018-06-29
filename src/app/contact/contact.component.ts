import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../base/base.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent extends BaseComponent implements OnInit {
  constructor(private _titleService: Title) {
    super();
  }

  ngOnInit() {
    this._titleService.setTitle("Contact us | " + this._siteTitle);
  }
}
