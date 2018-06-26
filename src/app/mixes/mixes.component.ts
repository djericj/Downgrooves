import { Component, OnInit } from "@angular/core";
import { MixesService } from "../services/mixes.service";
import { ActivatedRoute } from "@angular/router";
import { IMix } from "../services/interfaces";

@Component({
  selector: "app-mixes",
  templateUrl: "./mixes.component.html",
  styleUrls: ["./mixes.component.css"],
  providers: [MixesService]
})
export class MixesComponent implements OnInit {
  public mixes: IMix[];
  loading: false;
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService
  ) {}

  ngOnInit() {
    this.getMixes();
  }

  getMixes() {
    this._route.params.subscribe(params => {
      let category = params["category"];
      this._mixesService.getMixes().subscribe(
        // the first argument is a function which runs on success
        data => {
          this.mixes = data;
          this.mixes = this.mixes.sort(
            (l, r): number => {
              if (l.CreateDate > r.CreateDate) return -1;
              if (l.CreateDate < r.CreateDate) return 1;
              return 0;
            }
          );
          if (category) {
            this.mixes = this.mixes.filter(x => {
              return x.Category == category;
            });
          }
        }
      );
    });
  }
}
