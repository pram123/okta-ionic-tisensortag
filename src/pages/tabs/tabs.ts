import { Component } from '@angular/core';

import { MySensorPage} from "../my-sensor/my-sensor";
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MySensorPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
