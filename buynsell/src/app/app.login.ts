import { Component  } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import { Router } from '@angular/router';
import { DataService } from './services/app.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.login.html',
  styleUrls: ['./app.login.css']
})

export class AppLogin {

    private email: string;
    private password : string;
    
    videosrc = '../Video1.mp4';

    user = {
        email:"",
        password:""
    };

    api:VgAPI;

    onPlayerReady(api:VgAPI) {
        this.api = api;
        this.api.play();
    }

    constructor(private _data: DataService, private router: Router) {
    };

    register(){
        this.router.navigate(['/register'])
    }

    login(){
        this.user.email = this.email;
        this.user.password = this.password;
        this._data.login(this.user)
        .subscribe(
            token => {
                this._data.saveUser(token);
                console.log("Token from server -->" + token);
            },
            error => console.log(error),
            () => {
                this.router.navigate(['/home'])
            }
        );
        
    }
}

