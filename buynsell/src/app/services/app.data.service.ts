import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions ,URLSearchParams} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserData } from './userdata';

@Injectable()
export class DataService {

    private _register = 'http://localhost:3000/register';
    private _login = 'http://localhost:3000/login';
    private _addDetails = 'http://localhost:3000/add';
    private _getDetails = 'http://localhost:3000/get';

    constructor(private _http: Http, private router: Router) { }

    private uName: String;
    private uEmail: String;
    private uPhone: Number;
    private upassword: String;

    setUserParams(User):void{
        this.uName = User.name;
        this.uEmail = User.email;
        this.uPhone = User.phone;
        this.upassword = User.password;
    }

    getUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    isLoggedIn(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser){
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }

    saveUser(token){
        localStorage.setItem('currentUser', token);
    }

    logout(){
        localStorage.removeItem('currentUser');
    }

    getUserData(): Observable<JSON> {

        // let params: URLSearchParams = new URLSearchParams();
        // params.set('name', name);
        // params.set('email',email);
        // params.set('phone',phone);

        // let requestOptions = new RequestOptions();
        // requestOptions.search = params;

        return this._http.get(this._getDetails)
            .map((response: Response) => <JSON> response.json())
            .catch(this.handleError);
    }

    createUser(UserData): Observable<JSON> {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._register, JSON.stringify(UserData) , options)
                    .map((response: Response) => <JSON> response.json())
                    .catch(this.handleError);
  }

    login(UserData): Observable<JSON> {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._login, JSON.stringify(UserData) , options)
                    .map((response: Response) => <JSON> response.json())
                    .catch(this.handleError);
  }

//     maintAd(usr): Observable<UserData> {
//         let headers = new Headers({ 'Content-Type': 'application/json' });
//         let options = new RequestOptions({ headers: headers }); 

//         let params: URLSearchParams = new URLSearchParams();
//         params.set('name', usr.name);
//         params.set('email',usr.email);
//         params.set('phone',usr.phone);
//         params.set('id',usr.ads[0].id);

//         options.search = params;
//         return this._http.put(this._adMaint, JSON.stringify(usr) , options)
//                     .map((response: Response) => <UserData> response.json())
//                     .catch(this.handleError);
//   }

//       deleteAd(name,email,phone,id): Observable<UserData> {
//         let headers = new Headers({ 'Content-Type': 'application/json' });
//         let options = new RequestOptions({ headers: headers });

//         let params: URLSearchParams = new URLSearchParams();
//         params.set('name', name);
//         params.set('email',email);
//         params.set('phone',phone);
//         params.set('id',id);

//         options.search = params;

//         return this._http.delete(this._adDelete, options)
//                     .map((response: Response) => <UserData> response.json())
//                     .catch(this.handleError);
//   }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}