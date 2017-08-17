import { Component ,OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { Router } from '@angular/router';
import { DataService } from './services/app.data.service';
import {FormControl, Validators,FormGroup, ReactiveFormsModule  } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^[0-9]/;

@Component({
  selector: 'app-root',
  templateUrl: './app.register.html',
  styleUrls: ['./app.register.css']
})

export class AppRegister implements OnInit {
    private name:string;
    private email:string;
    private phone:string;   
    private pass:string;
    private confpass:string;
    form:FormGroup;

    videosrc = '../Video1.mp4';

    api:VgAPI;

    constructor(private _data: DataService, private router: Router) {};

    onPlayerReady(api:VgAPI) {
        this.api = api;
        this.api.play();
    }

    ngOnInit(): void {
    this.form = new FormGroup({
        'name1': new FormControl('', [
            Validators.required,
            Validators.minLength(4)]),
        'email1': new FormControl('',[
            Validators.required,
            Validators.pattern(EMAIL_REGEX)]),
        'phone1': new FormControl('', [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(9),
            Validators.pattern(PHONE_REGEX)]),
        'pass1': new FormControl('', [
            Validators.required,
            Validators.pattern(PHONE_REGEX)]),
        'confpass1': new FormControl('', [
            Validators.required,
            Validators.pattern(PHONE_REGEX)])
        });
        console.log(this.form);
    }

    register(){
        // if(this.regFormControl.valid){
            let user = {
                name:this.name,
                email:this.email,
                phone:this.phone,
                password:this.pass
            }
    //}

            localStorage.setItem('currentUser', JSON.stringify(user));

            // this._data.createUser(user)
            // .subscribe(
            // token => {
            //     this._data.saveUser(token);
            //     console.log('token from server -->' + token);
            // },
            // error => console.log(error),
            // () => {
                this.router.navigate(['/home']);
            // });
    }
}

