import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cd-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export default class AppComponent {}
