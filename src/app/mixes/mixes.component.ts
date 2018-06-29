import { Component, OnInit } from "@angular/core";
import { MixesService } from "../services/mixes.service";
import { ActivatedRoute } from "@angular/router";
import { IMix } from "../services/interfaces";
import { Title } from "@angular/platform-browser";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: "app-mixes",
  templateUrl: "./mixes.component.html",
  styleUrls: ["./mixes.component.css"],
  providers: [MixesService]
})
export class MixesComponent extends BaseComponent implements OnInit {
  public mixes: IMix[];
  public category: string;
  loading: false;
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService,
    private titleService: Title
  ) {
    super();
  }

  ngOnInit() {
    this.getMixes();
  }

  getMixes() {
    this._route.params.subscribe(params => {
      let category: string = params["category"];
      this._mixesService.getMixes().subscribe(
        // the first argument is a function which runs on success
        data => {
          this.mixes = data;
          this.titleService.setTitle("DJ Mixes | Downgrooves Electronic Music");
          this.mixes = this.mixes.sort(
            (l, r): number => {
              if (l.CreateDate > r.CreateDate) return -1;
              if (l.CreateDate < r.CreateDate) return 1;
              return 0;
            }
          );
          if (category) {
            this.mixes = this.mixes.filter(x => {
              return x.Category.toUpperCase() == category.toUpperCase();
            });
            this.category = category;
            this.titleService.setTitle(
              category.charAt(0).toUpperCase() +
                category.slice(1) +
                " " +
                "DJ mixes | " +
                this._siteTitle
            );
          }
        }
      );
    });
  }
}
