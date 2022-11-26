import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClassStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { loginVm } from "../models/user";

@Injectable()
export class sharedService{
     headers:any
    constructor(private http: HttpClient){
        if(localStorage.getItem('token')!=''){
            var token=localStorage.getItem('token');
             this.headers = new HttpHeaders()
              .set('Authorization', 'Bearer ' + token)
              .set('Content-Type', 'application/json'); 
        }
    }
    currentUserData:any;
    host='https://localhost:7032/';
    public login(loginData:loginVm):Observable<any>{
        let url=this.host+"api/User/login";
        return this.http.post(url,loginData);
    }
    public addUser(loginData):Observable<any>{
        let url=this.host+"api/user/AddUser";
        return this.http.post(url,loginData);
    }
    getBooks():Observable<any>{
        if(localStorage.getItem('token')!=''){
            var token=localStorage.getItem('token');
             this.headers = new HttpHeaders()
              .set('Authorization', 'Bearer '+token)
              .set('Content-Type', 'application/json'); 
        }
        let url=this.host+"api/books";
        return this.http.get(url);
    }

    getUsers():Observable<any>{
        let url=this.host+"api/User";
        return this.http.get(url,this.headers);
    }
    checkIn(model):Observable<any>{
        let url=this.host+"api/Books/Checkin";
        return this.http.post(url,model,this.headers);
    }
    checkOut(model):Observable<any>{
        let url=this.host+"api/Books/Checkout";
        return this.http.post(url,model,this.headers);
    }
    renew(model):Observable<any>{
        let url=this.host+"api/Books/Renew";
        return this.http.post(url,model,this.headers);
    }
    getCurrentUser(id):Observable<any>{
        let url=this.host+"api/User/Getuser?id="+id;
        return this.http.get(url);
    }
    getAuthors():Observable<any>{
        let url=this.host+"api/Author";
        return this.http.get(url);
    }
    getBookCategory():Observable<any>{
        let url=this.host+"api/BookCategory";
        return this.http.get(url);
    }
    adminIssuedBooks():Observable<any>{
        let url=this.host+"api/Books/adminIssuedBooks";
        return this.http.get(url);
    }
    
    userIssuedBooks(id):Observable<any>{
        let url=this.host+"api/Books/userIssuedBooks?userId="+id;
        return this.http.get(url);
    }
   
}