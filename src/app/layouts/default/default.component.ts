import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
})
export class DefaultComponent implements OnInit {
  sideBarOpen = false;

  constructor(public media: MediaObserver) {}

  ngOnInit(): void {
    this.sideBarOpen = !this.media.isActive('xs');
  }

  onToggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
