import {Injectable} from '@angular/core';
import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, debounceTime, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {FamilyService} from '../../family/family-manager/family.service';
import {selectFamily} from '../reducers';
import * as fm from '../actions/family-actions';
import {FamilyCreateFailedAction, FamilyCreateSuccessAction} from '../actions/family-actions';
import {of} from 'rxjs/internal/observable/of';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class FamilyEffects {

  constructor(private actions$: Actions, private familyService: FamilyService, private store: Store<any>, private message: NzMessageService) {
  }

  @Effect()
  createFamily$: Observable<Action> = this.actions$
    .pipe(
      ofType(fm.ACTION_CREATE_FAMILY),
      debounceTime(300),
      withLatestFrom(this.store.pipe(select(selectFamily))),
      switchMap(([, family]) => {
        return this.familyService.createFamily(family)
          .pipe(map(fm => new FamilyCreateSuccessAction(fm)),
            catchError(() => of(new FamilyCreateFailedAction(null))));
      })
    );

  @Effect({dispatch: false})
  createFamilySuccessMessage$ = this.actions$
    .pipe(
      ofType(fm.ACTION_FAIMLY_CREATE_SUCCESS),
      debounceTime(300),
      tap(() => {
        return this.message.create('success', 'Family created successfully!');
      })
    );

  @Effect({dispatch: false})
  createFamilyFailedMessage$ = this.actions$
    .pipe(
      ofType(fm.ACTION_FAIMLY_CREATE_FAILED),
      debounceTime(300),
      tap(() => {
        return this.message.create('error', 'Create family failed!');
      })
    );
}
