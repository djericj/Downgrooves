import { Component, OnInit } from "@angular/core";
import { MixesService } from "../services/mixes.service";

@Component({
  selector: "app-mixes",
  templateUrl: "./mixes.component.html",
  styleUrls: ["./mixes.component.css"],
  providers: [MixesService]
})
export class MixesComponent implements OnInit {
  public mixes;
  loading: false;
  constructor(private _mixesService: MixesService) {}

  ngOnInit() {
    this.getMixes();
  }

  getMixes() {
    this._mixesService.getMixes().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.mixes = data.sort(
          (l, r): number => {
            if (l.CreateDate > r.CreateDate) return -1;
            if (l.CreateDate < r.CreateDate) return 1;
            return 0;
          }
        );
      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log("done loading mixes")
    );
  }
}
