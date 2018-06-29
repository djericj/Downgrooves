import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable()
export class BrowserService {
  constructor(private _titleService: Title) {}

  setTitle(title) {
    this._titleService.setTitle(title + " | Downgrooves Electronic Music");
  }
}
