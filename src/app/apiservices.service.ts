import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  constructor(private _http:HttpClient) {}

    //connection with backend
    baseUrl = 'http://localhost:3000/user';
    
    //get all data
    getAllData():Observable<any> {
      return this._http.get(`${this.baseUrl}`);
    }

    //Insert Data
    insertData(data : any):Observable<any> {
      console.log(data,'Data inserted');
      return this._http.post(`${this.baseUrl}`,data);    
    }

    //Delete data
    deletedata(id : any):Observable<any> {
      console.log('Data deleted');
      let ids = id;
      return this._http.delete(`${this.baseUrl}/${ids}`,)
      
    }

    //Update data
    updateData(data : any,id : any):Observable<any> {
      let ids = id;
      return this._http.put(`${this.baseUrl}/${ids}`,data);
    }

    //Get single data
    getSingleData(id : any):Observable<any> {
      let ids = id;
      return this._http.get(`${this.baseUrl}/${ids}`);
    }
   
}
