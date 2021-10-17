import { Component, OnInit } from '@angular/core';
import { LoggerService } from '@lib/services/log/logger.service';
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

  _order = new Subject<Order>();
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

  amount = 0;
  customerId = 0;

  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    this.durum$ = zip(
      this._flatBread.pipe(tap(ing => this.logger.log(`${ing} ${++this.flatBreadCounter}`))),
      this._meat.pipe(tap(ing => this.logger.log(`${ing} ${++this.meatCounter}`))),
      this._sauce.pipe(tap(ing => this.logger.log(`${ing} ${++this.sauceCounter}`))),
      this._tomato.pipe(tap(ing => this.logger.log(`${ing} ${++this.tomatoCounter}`))),
      this._cabbage.pipe(tap(ing => this.logger.log(`${ing} ${++this.cabbageCounter}`))),
    ).pipe(
      tap(durum => this.logger.log('Enjoy!' + JSON.stringify(durum)))
    );

    this.delivery$ = this._order.pipe(
      tap(order => this.logger.log('New Order:' + JSON.stringify(order))),
      mergeMap(({ amount, customerId }) =>
        this.durum$.pipe(
          take(amount),
          map(durum => ({ product: durum, customerId }))
        )
      ),
      tap(product => this.logger.log('Delivery Product:' + JSON.stringify(product)))
    );
  }

  dispatchOrder(): void {
    this.amount = Math.floor(Math.random() * 3) + 1;
    ++this.customerId;
    this._order.next({ amount: this.amount, customerId: this.customerId });
  }
}
