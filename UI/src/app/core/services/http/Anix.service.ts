import { isNullOrUndefined } from "util";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/operator/map";
@Injectable()
export class AnixService {
  constructor(private http: HttpClient) { }

  ExecuteSql(database, query, params) {
    
    let data = {
      Query: query,
      Params: this.ConvertObjectToArray(params),
      ProcedureName: null,
      Database: database
    };
    console.log(environment.ApiURL + "api/ExecuteSQLProcedure");
    return this.http.post(environment.ApiURL + "api/ExecuteSQLQuery", data);
  }

  ExecuteSP(database, procedure, params) {
    
    let data = {
      Query: null,
      Params: this.ConvertObjectToArray(params),
      ProcedureName: procedure,
      Database: database
    };
    return this.http.post(environment.ApiURL + "Api/ExecuteSQLProcedure", data);
  }

  ConvertObjectToArray(params) {
    const ParameterArray = [];
    if (isNullOrUndefined(params)) {
      return null;
    }
    Object.keys(params).map((key) => {
      ParameterArray.push({ Name: key, Value: params[key] });
    });
    return ParameterArray;
  }
}
