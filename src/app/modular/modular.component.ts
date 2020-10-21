import { Component, OnInit } from "@angular/core";
import { ModularService } from "../services/modular.service";
import { Observable } from "rxjs";
import { IsotopeOptions } from "ngx-isotope";

@Component({
  selector: "app-modular",
  templateUrl: "./modular.component.html",
  styleUrls: ["./modular.component.css"],
})
export class ModularComponent implements OnInit {
  public videos;
  constructor(private _modularService: ModularService) {}
  public isoOptions: IsotopeOptions = {
    percentPosition: true,
    itemSelector: ".grid-item",
  };
  ngOnInit() {
    this.getData();
  }

  getData() {
    this._modularService.getJson().subscribe((x) => {
      this.videos = x;
      console.log(x);
    });
  }
}
