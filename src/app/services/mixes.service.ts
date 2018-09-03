import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { IMix } from "../services/interfaces";

@Injectable()
export class MixesService {
  constructor(private http: HttpClient) {}

  getMixes(): Observable<any> {
    return this.http
      .get("../../assets/mixes-db.json") //, options)
      .map((response: Response) => {
        return response;
      });
  }

  getMix(name): Observable<IMix> {
    return this.getMixes().map(data => {
      //console.log(name.replace(/-/gi, " "));
      return data.find(
        (x: IMix) =>
          x.Name.toUpperCase() == name.toUpperCase().replace(/-/gi, " ")
      );
    });
  }

  handleError(): string {
    return "error";
  }
}
