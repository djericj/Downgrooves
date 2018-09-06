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
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService,
    private titleService: Title
  ) {
    super();
  }
  ngOnInit() {
    this.mixes = this.getMixes("");
    function getHashFilter() {
      var hash = location.hash;
      // get filter=filterName
      var matches = location.hash.match(/filter=([^&]+)/i);
      var hashFilter = matches && matches[1];
      return hashFilter && decodeURIComponent(hashFilter);
    }

    $(function() {
      var $grid = $(".grid");

      // bind filter button click
      var $filters = $("#filters").on("click", "button", function() {
        var filterAttr = $(this).attr("data-filter");
        // set filter in hash
        location.hash = "filter=" + encodeURIComponent(filterAttr);
      });

      var isIsotopeInit = false;

      function onHashchange() {
        var hashFilter = getHashFilter();
        if (!hashFilter && isIsotopeInit) {
          return;
        }
        isIsotopeInit = true;
        // filter isotope
        $grid.isotope({
          itemSelector: ".grid-item",
          filter: hashFilter
        });
        // set selected class on button
        if (hashFilter) {
          $filters.find(".is-checked").removeClass("is-checked");
          $filters
            .find('[data-filter="' + hashFilter + '"]')
            .addClass("is-checked");
        }
      }

      $(window).on("hashchange", onHashchange);
      // trigger event handler to init Isotope
      onHashchange();
    });
  }

  public isoOptions: IsotopeOptions = {
    percentPosition: true,
    itemSelector: ".grid-item"
  };

  getMixes(category: string): Observable<IMix[]> {
    return this._mixesService.getMixes().map(
      // the first argument is a function which runs on success
      data => {
        this.titleService.setTitle("DJ Mixes | Downgrooves Electronic Music");
        data.sort(
          (l, r): number => {
            if (l.CreateDate > r.CreateDate) return -1;
            if (l.CreateDate < r.CreateDate) return 1;
            return 0;
          }
        );
        if (category) {
          data = data.filter(x => {
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
        return data;
      }
    );
  }
}
