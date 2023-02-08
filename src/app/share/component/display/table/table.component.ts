import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TableColumnInterface } from './table.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() dataSource!: any[] | Observable<any[]>;
  @Input() columns!: TableColumnInterface[];
  @Input() displayedColumns!: string[];
}
