import {Component, OnInit} from '@angular/core';
import {Family} from '../../model/family';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  families: Array<Family>;
  constructor() { }

  ngOnInit() {
    localStorage.clear();
  }

}
