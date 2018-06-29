import { OnInit, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable()
export abstract class BaseComponent implements OnInit {
  public _siteTitle: string = "Downgrooves Electronic Music";
  constructor() {}

  ngOnInit() {}

  public setTitle(title) {
    let titleService: Title;
    titleService.setTitle(title);
  }
}
