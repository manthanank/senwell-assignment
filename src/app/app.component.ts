import { Component, OnInit } from '@angular/core';
import { groupBy, map, mergeMap, toArray } from 'rxjs';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'senwell-assignment';

  datas: any;
  distinctItems: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData().subscribe(data => {
      console.log(data);
      this.datas = data;
    });

    this.data.getData().pipe(
      mergeMap((data) => data),
      groupBy((item) => item.name),
      mergeMap((group) => group.pipe(toArray())),
      map((items) => ({ name: items[0].name, count: items.length })),
      toArray()
    ).subscribe((items) => {
      this.distinctItems = items;
      console.log(this.distinctItems);
    });
  }

  getRowClass(count: number) {
    if (count > 0 && count < 3) {
      return 'red';
    } else if (count >= 3 && count < 10) {
      return 'yellow';
    } else if (count >= 10) {
      return 'green';
    }
    return '';
  }

}
