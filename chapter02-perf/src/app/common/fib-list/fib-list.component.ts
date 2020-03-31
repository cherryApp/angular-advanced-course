import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-fib-list',
  templateUrl: './fib-list.component.html',
  styleUrls: ['./fib-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FibListComponent implements OnInit, OnChanges {

  @Input() list;
  @Input() title;
  @Input() type;
  cols = [
    {key: 'id', label: '#'},
    {key: 'first_name', label: 'Fname'},
  ];

  filterPhrase = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.changeDetectorRef.detach();
    // this.changeDetectorRef.detectChanges();

    // setInterval( () => this.changeDetectorRef.detectChanges(), 1000 );
  }

  ngOnChanges() {
    this.changeDetectorRef.detectChanges();
  }

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.changeDetectorRef.detectChanges();
      console.log(this.filterPhrase);
      this.filterPhrase = '';
    }
  }

  calculate(investor: User): number {
    console.log(`${this.title} calculating`);
    return this.type === 'fibonacci'
      ? this.fibonacci(20)
      : this.grow(1000, 0.055, 5);
  }

  fibonacci(num) {
    if (num <= 1) {
      return 1;
    }

    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }

  grow(base: number, interest: number, years: number): number {
    base *= 1 + interest;
    years--;
    if (years) {
        return this.grow(base, interest, years);
    }
    return Math.round(base * 100) / 100;
  }

}
