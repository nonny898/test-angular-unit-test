import { Component } from '@angular/core';

interface NavigationInterface {
  name: string;
  path: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tour of Heroes';

  get navigations(): NavigationInterface[] {
    return [
      {
        name: 'Dashboard',
        path: '/dashboard',
      },
      {
        name: 'Heroes',
        path: '/hero',
      },
    ];
  }
}
