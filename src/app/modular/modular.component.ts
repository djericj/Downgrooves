import { Component, OnInit } from "@angular/core";
import { ModularService } from "../services/modular.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-modular",
  templateUrl: "./modular.component.html",
  styleUrls: ["./modular.component.css"],
})
export class ModularComponent implements OnInit {
  public videos;
  constructor(private _modularService: ModularService) {}

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
