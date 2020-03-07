import { Component, OnInit } from "@angular/core";
import { MixesService } from "../services/mixes.service";
import { ActivatedRoute } from "@angular/router";
import { IMix } from "../services/interfaces";
import { Title } from "@angular/platform-browser";
import { BaseComponent } from "../base/base.component";
import { Observable } from "../../../node_modules/rxjs";
import { IsotopeOptions } from "../../../node_modules/ngx-isotope";

@Component({
  selector: "app-mixes",
  templateUrl: "./mixes.component.html",
  styleUrls: ["./mixes.component.css"],
  providers: [MixesService]
})
export class MixesComponent extends BaseComponent implements OnInit {
  public mixes: Observable<IMix[]>;
  public category: string;
  public loading: boolean;
  public properTitle: string;
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService,
    private titleService: Title
  ) {
    super();
  }
  ngOnInit() {
    this._route.params.subscribe(params => {
      this.category = params["category"];
      if (this.category === "") {
        this.category = "progessive";
      }
      this.mixes = this.getMixes(this.category);
      this.properTitle =
        this.category.charAt(0).toUpperCase() + this.category.slice(1);
    });
  }

  // getMixCategory(): Observable<IMix[]> {
  //   // return this._route.params.map(params => {
  //   //   let category: string = params["category"];
  //   //   return this.getMixes(category);
  //   // });
  // }

  public isoOptions: IsotopeOptions = {
    percentPosition: true,
    itemSelector: ".grid-item"
  };

  getMixes(category: string): Observable<IMix[]> {
    return this._mixesService.getMixes().map(
      // the first argument is a function which runs on success
      data => {
        this.titleService.setTitle("DJ Mixes | Downgrooves Electronic Music");
        data.sort((l, r): number => {
          if (l.CreateDate > r.CreateDate) {
            return -1;
          }
          if (l.CreateDate < r.CreateDate) {
            return 1;
          }
          return 0;
        });
        if (category) {
          data = data.filter(x => {
            return x.Category.toUpperCase() == category.toUpperCase();
          });
          this.titleService.setTitle(
            category.charAt(0).toUpperCase() +
              category.slice(1) +
              " " +
              "DJ mixes | " +
              this._siteTitle
          );
        }
        return data;
      }
    );
  }
}
