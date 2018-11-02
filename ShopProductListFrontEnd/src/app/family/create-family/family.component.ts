import {Component, OnDestroy, OnInit} from '@angular/core';
import {FamilyService} from '../family-manager/family.service';
import {Family} from '../../model/family';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateFamilyAction} from '../../store/actions/family-actions';
import {Subject} from 'rxjs/internal/Subject';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectCreateFamilySuccess} from '../../store/reducers';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit, OnDestroy {

  constructor(private familyService: FamilyService, private fb: FormBuilder, private store: Store<any>) {
    this.createFamilySuccess$ = this.store.pipe(select(selectCreateFamilySuccess));
  }

  private destroyed$ = new Subject();
  createFamilySuccess$: Observable<boolean>;
  family: Family = new Family();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;

  initialize(): void {
    this.validateForm = this.fb.group({
      familyName: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initialize();
  }

  showModal(): void {
    this.initialize();
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 2000);
  }

  createFamily() {
    this.family.familyName = this.validateForm.get('familyName').value;
    this.store.dispatch(new CreateFamilyAction(this.family));
    this.createFamilySuccess$.pipe().subscribe(value => {
      if(value) this.handleOk();
    })
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.createFamily();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
