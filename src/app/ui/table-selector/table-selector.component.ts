import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ClientPlanComponent} from '@app/client-plan/client-plan.component';
import {take} from 'rxjs/operators';
import {IRestaurantTable} from '@interfaces/restaurant-table.interface';
import {Subject} from 'rxjs';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  // tslint:disable-next-line
  selector: 'ui-table-selector',
  templateUrl: './table-selector.component.html',
  styleUrls: ['./table-selector.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableSelectorComponent),
      multi: true
    }
  ]

})
export class TableSelectorComponent implements OnInit, OnDestroy {
  changes$ = new Subject();
  touches$ = new Subject();
  @Input() disabled: boolean;
  @Input() isAdmin = false;

  @Input() tables: IRestaurantTable[] = [];

  anyTableSelected = false;
  state: IRestaurantTable;

  constructor(private _matDialog: MatDialog) {
  }

  ngOnInit() {
  }

  selectTable(e: MouseEvent) {
    this._matDialog.open(ClientPlanComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      panelClass: 'dialog-padding-0',
      data: this.state
    })
      .beforeClosed()
      .pipe(take(1))
      .subscribe((table: IRestaurantTable) => {
        if (!table) {
          return;
        }
        this.anyTableSelected = false;
        this.writeValue(table);
      });
  }

  registerOnChange(fn: any) {
    this.changes$
      .pipe(untilDestroyed(this))
      .subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.touches$
      .pipe(untilDestroyed(this))
      .subscribe(fn);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  updateValue(value: any, isMatSelect = false) {
    if (isMatSelect) {
      this.state = this.tables.find(item => item.id === value.value);
    } else {
      this.state = value;
    }
    this.changes$.next(this.state);
  }

  writeValue(rawValue: any) {
    this.state = rawValue;
    this.changes$.next(rawValue);
  }

  deleteSelectedTable(e: Event) {
    e.preventDefault();
    this.updateValue(null);
  }

  ngOnDestroy() {
  }
}
