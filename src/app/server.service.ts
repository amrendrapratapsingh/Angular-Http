import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import 'rxjs/Rx';
//import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ServerService{
  constructor(private http:HttpClient){}

  storeServer(server:any[]){
    const headers = new Headers({
      'Content-Type':'application/json'
    })
    return this.http.post('https://console.firebase.google.com/project/ng-http-a563a/database/firestore/data.json/',server)

  }
  getServers(){
    return this.http.get('https://console.firebase.google.com/project/ng-http-a563a/database/firestore/data.json/')
      .map((response:Response) => {
        const data = response.json();
        for(const server of data) {
          server.name = 'Fetch' + server.name;
        }
        return data;
     });
  }

  // async Http request


  getAppName() {
    this.http.get('https://console.firebase.google.com/project/ng-http-a563a/database/firestore/appName.json/')
    .map( (response:Response) => {
      const data = response.json();
      console.log(data);
    })
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || 'server Error');

  }
}
