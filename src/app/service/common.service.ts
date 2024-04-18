import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http:HttpClient) { 

  }

 public postUserData(data:any){
   return this.http.post('https://localhost:7096/api/UserAPI',data)
 }

 public getUserData(){
  return this.http.get('https://localhost:7096/api/UserAPI')
 }

 public deleteUser(id:any){
  return this.http.delete(`https://localhost:7096/api/UserAPI/${id}`)
 }

 public editUser(id:any,updateUser:any){
  return this.http.put(`https://localhost:7096/api/UserAPI/${id}`,updateUser)
 }

}
