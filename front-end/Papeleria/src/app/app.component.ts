import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { listItemsNav } from './const/list-Items-nav.const';
import { ItemsNav } from './interfaces/items-nav.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Papeleria';
  itemsNav: Array<ItemsNav> = listItemsNav;
  constructor(private router: Router){}
  navigate(route: string){
    this.router.navigate([route])
  }
}
