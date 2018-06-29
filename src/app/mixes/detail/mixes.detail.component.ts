import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MixesService } from "../../services/mixes.service";
import { IMix } from "../../services/interfaces";
import * as moment_ from "moment";
import { Title } from "@angular/platform-browser";
import { BaseComponent } from "../../base/base.component";

@Component({
  selector: "app-mixes-detail",
  templateUrl: "./mixes.detail.component.html",
  styleUrls: ["./mixes.detail.component.css"]
})
export class MixesDetailComponent extends BaseComponent implements OnInit {
  public mix: IMix;
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService,
    private _titleService: Title
  ) {
    super();
  }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this._route.params.subscribe(params => {
      let name = params["name"];
      this._mixesService.getMix(name).subscribe(data => {
        this.mix = data;
        this.mix.CreateDate = moment_(this.mix.CreateDate).format("MMM YYYY");
        console.log(this.mix);
        this._titleService.setTitle(
          this.mix.Name +
            " mixed by " +
            this.mix.artist +
            " | " +
            this._siteTitle
        );
      });
    });
  }
}
