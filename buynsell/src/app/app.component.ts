import { Component } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  api:VgAPI;

    constructor(private router: Router) {};

    videosrc = '../Video1.mp4';

    onPlayerReady(api:VgAPI) {
        this.api = api;
        this.api.play();
    }

    buy(){
        this.router.navigate(['/get']);
    }
    sell(){
        this.router.navigate(['/sell']);
    }
}
