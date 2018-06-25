import { Component, OnInit } from "@angular/core";
import { ITunesService } from "./services/itunes.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private _iTunesService: ITunesService) {}

  ngOnInit() {}
}
