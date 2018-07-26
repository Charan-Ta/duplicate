import { Directive, ElementRef, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Scroll_Position } from '../../Interfaces/pagination-scroll';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';

const DEFAULT_SCROLL_POSITION: Scroll_Position = {
  Scroll_Height: 0,
  Scroll_Top: 0,
  Client_Height: 0
};

@Directive({
  selector: '[appPaginationScroll]'
})
export class PaginationScrollDirective {

  private scroll_Event;
  private Scrolled_Down;
  private Request_On_Scroll;

  @Input()
  scrollCallback;

  @Input()
  immediateCallback;

  @Input()
  scrollPercent = 90;

  constructor(private El: ElementRef) { }

  ngAfterViewInit() {
    this.registerScrollEvent();
    this.Scroll_Events();
    this.CallbackOnScroll();
  }

  private registerScrollEvent() {
    this.scroll_Event = Observable.fromEvent(this.El.nativeElement, 'scroll');
  }

  private Scroll_Events() {
    this.Scrolled_Down = this.scroll_Event.map((e: any): Scroll_Position => ({
      Scroll_Height: e.target.scrollHeight,
      Scroll_Top: e.target.scrollTop,
      Client_Height: e.target.clientHeight
    })).pairwise()
      .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]))
  }

  private CallbackOnScroll() {
    this.Request_On_Scroll = this.Scrolled_Down;
    if (this.immediateCallback) {
      this.Request_On_Scroll = this.Request_On_Scroll
        .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
    }
    this.Request_On_Scroll
      .exhaustMap(() => { return this.scrollCallback(); })
      .subscribe(() => { });
  }

  private isUserScrollingDown = (positions) => {
    return positions[0].Scroll_Top < positions[1].Scroll_Top;
  }

  private isScrollExpectedPercent = (position) => {
    return ((position.Scroll_Top + position.Client_Height) / position.Scroll_Height) > (this.scrollPercent / 100);
  }
}
