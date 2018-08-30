import {Component, OnInit} from '@angular/core';
import {FamilyService} from '../services/family-manager/family.service';
import {Family} from '../services/family-manager/family';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  constructor(private familyService: FamilyService, private fb: FormBuilder) { }

  family: Family = new Family();
  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  initialize(): void {
    this.validateForm = this.fb.group({
      familyName: [ null, [ Validators.required ] ]
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
    this.family.family_name = this.validateForm.get('familyName').value;
    console.log(this.family.family_name);
    this.familyService.createFamily(this.family).subscribe(() => {
     this.handleOk();
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.createFamily();
  }
  handleCancel(): void {
    this.isVisible = false;
  }

}
