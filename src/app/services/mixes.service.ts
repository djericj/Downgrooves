import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { IMix } from "../services/interfaces";

@Injectable()
export class MixesService {
  constructor(private http: HttpClient) {}

  getMixes(): Observable<any> {
    // get users from api
    return this.http
      .get("../../assets/mixes-db.json") //, options)
      .map((response: Response) => {
        return response;
      });
  }

  getMix(id): Observable<IMix> {
    return this.getMixes().map(data => {
      return data.find(x => x.MixId == id);
    });
  }

  handleError(): string {
    return "error";
  }
}
