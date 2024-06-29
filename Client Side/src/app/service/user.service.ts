import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../module/Message ';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  BaseUrl="https://jsonplaceholder.typicode.com"
  newMassage!:Message
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('authorizition', 'SEFFTGFDDDDD');
getUserList():Observable<Message[]>{
  return this.http.get<Message[]>(`${this.BaseUrl}/posts`,{"headers":this.headers})
}
insertMessage(message:Message):Observable<Message[]>{
  return this.http.post<Message[]>(`${this.BaseUrl}/posts`,message)
}
// login(message:Message){
//   this.http.post<Message>(`${this.BaseUrl}/posts`,message).subscribe({
//     next:(res)=>{
//       this.newMassage=res
//     }
//   })
// }
}
