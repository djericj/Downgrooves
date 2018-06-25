import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MixesService } from "../../services/mixes.service";
import { IMix } from "../../services/interfaces";
import * as moment_ from "moment";
@Component({
  selector: "app-mixes-detail",
  templateUrl: "./mixes.detail.component.html",
  styleUrls: ["./mixes.detail.component.css"]
})
export class MixesDetailComponent implements OnInit {
  public mix: IMix;
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService
  ) {}

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this._route.params.subscribe(params => {
      let mixId = params["id"];
      this._mixesService.getMix(mixId).subscribe(data => {
        this.mix = data;
        this.mix.CreateDate = moment_(this.mix.CreateDate).format("MMM YYYY");
        console.log(this.mix);
      });
    });
  }
}
