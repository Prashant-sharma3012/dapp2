import { Component } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.sellmenu.html',
  styleUrls: ['./app.sellmenu.css']
})
export class AppSell {
      api:VgAPI;

    constructor(private router: Router) {};

    onPlayerReady(api:VgAPI) {
        this.api = api;
        this.api.play();
    }

    videosrc = '../Video1.mp4';

  tiles = [
    {product: 'One', cols: 1, rows: 2, desc: 'lightblue'},
    {product: 'Two', cols: 1, rows: 2, desc: 'lightgreen'},
    {product: 'Three', cols: 1, rows: 2, desc: 'lightpink'},
    {product: 'Four', cols: 1, rows: 2, desc: '#DDBDF1'},
        {product: 'One', cols: 1, rows: 2, desc: 'lightblue'},
    {product: 'Two', cols: 1, rows: 2, desc: 'lightgreen'},
    {product: 'Three', cols: 1, rows: 2, desc: 'lightpink'},
    {product: 'Four', cols: 1, rows: 2, desc: '#DDBDF1'},
        {product: 'One', cols: 1, rows: 2, desc: 'lightblue'},
    {product: 'Two', cols: 1, rows: 2, desc: 'lightgreen'},
  ];
}
