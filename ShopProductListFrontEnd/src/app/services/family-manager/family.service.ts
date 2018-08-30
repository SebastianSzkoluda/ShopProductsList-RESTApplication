import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/index';
import {Family} from './family';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FamilyService {

  private familyUrl = '/api/family/';
  constructor(private http: HttpClient) { }

  createFamily(family: Family): Observable < Family > {
    return this.http.post< Family >(this.familyUrl + 'createFamily', family);
  }
  checkIfUserHaveFamily(): Observable <boolean> {
    return this.http.get < boolean > (this.familyUrl + 'checkIfUserHaveFamily');
  }
  loggedUserFamilies(): Observable < Array<Family> > {
    return this.http.get < Array<Family> >(this.familyUrl + 'loggedUserFamilies');
  }
}
