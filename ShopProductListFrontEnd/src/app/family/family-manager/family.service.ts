import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {Family} from '../../model/family';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';

@Injectable()
export class FamilyService {

  private familyUrl = '/api/';
  constructor(private http: HttpClient, private store: Store<any>) { }

  createFamily(family: Family): Observable < Family > {
    return this.http.post< Family >(this.familyUrl + 'family', family);
  }

  checkIfUserHaveFamily(): Observable <boolean> {
    return this.http.get < boolean > (this.familyUrl + 'checkIfUserHaveFamily');
  }

  getFamilyById(id: number): Observable<Family> {
    return this.http.get<Family>(this.familyUrl + 'family' + `/${id}`)
  }

  loggedUserFamilies(): Observable < Array<Family> > {
    return this.http.get < Array<Family> >(this.familyUrl + 'family');
  }

  getAllState() {
    return this.store.select('familyReducer');
  }

  updateFamiliesState(obj) {
    this.store.dispatch(
      {
        type: obj.action,
        payload: obj.payload
      }
    );
  }
}
