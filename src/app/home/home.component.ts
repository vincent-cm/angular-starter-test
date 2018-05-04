import { Component, OnInit } from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'home', // <home></home>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [Title],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ['./home.component.css'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  public firebaseItem: AngularFireObject<any>;
  public firebaseSubscription: any;
  /**
   * TypeScript public modifiers
   */
  constructor(
    public appState: AppState,
    public title: Title,
    public documentDB: AngularFireDatabase
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');

    this.firebaseItem = this.documentDB.object('test-8d4a2/test');

    // Create firebase listener
    this.firebaseSubscription = this.firebaseItem
      .valueChanges()
      .subscribe(action => {
        // Firebase data
        console.log("FIREBASE RESULT: " + JSON.stringify(action));
      });

    /**
     * this.title.getData().subscribe(data => this.data = data);
     */
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }
}
