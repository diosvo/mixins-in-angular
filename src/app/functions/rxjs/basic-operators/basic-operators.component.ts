import { Component, OnInit } from '@angular/core';
import { map, mergeMap, Observable, Subject, take, tap, zip } from 'rxjs';

type Durum = ['flat bread', 'meat', 'sauce', 'tomato', 'cabbage'];

interface Order {
  amount: number;
  customerId: number;
}

interface Product {
  product: Durum;
  customerId: number;
}

@Component({
  selector: 'app-basic-operators',
  templateUrl: './basic-operators.component.html',
  styleUrls: ['./basic-operators.component.scss']
})
export class BasicOperatorsComponent implements OnInit {

  durum$: Observable<Durum>;
  delivery$: Observable<Product>;

  _order = new Subject<Order>()
  _flatBread = new Subject<'flat bread'>();
  _meat = new Subject<'meat'>();
  _sauce = new Subject<'sauce'>();
  _tomato = new Subject<'tomato'>();
  _cabbage = new Subject<'cabbage'>();

  flatBreadCounter = 0;
  meatCounter = 0;
  sauceCounter = 0;
  tomatoCounter = 0;
  cabbageCounter = 0;
  customerId = 0;

  constructor() { }

  ngOnInit(): void {
    this.durum$ = zip(
      this._flatBread.pipe(
        map(ing => `${ing} ${++this.flatBreadCounter}`),
        tap(console.log)
      ),
      this._meat.pipe(
        map(ing => `${ing} ${++this.meatCounter}`),
        tap(console.log)
      ),
      this._sauce.pipe(
        map(ing => `${ing} ${++this.sauceCounter}`),
        tap(console.log)
      ),
      this._tomato.pipe(
        map(ing => `${ing} ${++this.tomatoCounter}`),
        tap(console.log)
      ),
      this._cabbage.pipe(
        map(ing => `${ing} ${++this.cabbageCounter}`),
        tap(console.log)
      ),
    ).pipe(
      tap(durum => console.log('Enjoy!', durum))
    );

    this.delivery$ = this._order.pipe(
      tap(order => console.log('New Order', order)),
      mergeMap(({ amount, customerId }) =>
        this.durum$.pipe(
          take(amount),
          map(durum => ({ product: durum, customerId }))
        )
      ),
      tap(product => console.log('Delivery Product', product))
    );
  }

  dispatchOrder(): void {
    const amount = Math.floor(Math.random() * 3) + 1;
    ++this.customerId;
    this._order.next({ amount, customerId: this.customerId });
  }
}
