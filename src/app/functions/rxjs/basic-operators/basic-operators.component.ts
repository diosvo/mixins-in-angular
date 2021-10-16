import { Component, OnInit } from '@angular/core';
import { map, Observable, Subject, tap, zip } from 'rxjs';

type Durum = ['flat bread', 'meat', 'sauce', 'tomato', 'cabbage']

let flatBreadCounter = 0;
let meatCounter = 0;
let sauceCounter = 0;
let tomatoCounter = 0;
let cabbageCounter = 0;

@Component({
  selector: 'app-basic-operators',
  templateUrl: './basic-operators.component.html',
  styleUrls: ['./basic-operators.component.scss']
})
export class BasicOperatorsComponent implements OnInit {

  durum$: Observable<Durum>;

  _flatBread = new Subject<'flat bread'>();
  _meat = new Subject<'meat'>();
  _sauce = new Subject<'sauce'>();
  _tomato = new Subject<'tomato'>();
  _cabbage = new Subject<'cabbage'>();

  constructor() { }

  ngOnInit(): void {
    this.durum$ = zip(
      this._flatBread.pipe(
        map(ing => `${ing} ${++flatBreadCounter}`),
        tap(console.log)
      ),
      this._meat.pipe(
        map(ing => `${ing} ${++meatCounter}`),
        tap(console.log)
      ),
      this._sauce.pipe(
        map(ing => `${ing} ${++sauceCounter}`),
        tap(console.log)
      ),
      this._tomato.pipe(
        map(ing => `${ing} ${++tomatoCounter}`),
        tap(console.log)
      ),
      this._cabbage.pipe(
        map(ing => `${ing} ${++cabbageCounter}`),
        tap(console.log)),
    ).pipe(
      tap(durum => console.log('Enjoy!', durum))
    );
  }
}
