import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-shop-map',
  templateUrl: './shop-map.component.html',
  styleUrls: ['./shop-map.component.css']
})
export class ShopMapComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initialize();
  }

  validateForm: FormGroup;
  isVisible = false;
  isOkLoading = false;
  mapUrl: string;
  location: string = '';
  shopName: string = '';

  initialize(): void {
    this.validateForm = this.fb.group({
      location: [null, [Validators.required]],
      shopName: [null, [Validators.required]]
    });
  }

  showModal(): void {
    this.isVisible = true;
    this.initialize();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.location = '';
    this.shopName = '';
  }
  submitForm() {
    this.location = this.validateForm.get('location').value;
    this.shopName = this.validateForm.get('shopName').value;
  }

  loadMap(): boolean {
    if(this.location.length > 0 && this.shopName.length > 0) {
      this.mapUrl = 'https://maps.google.com/maps?q=' + this.location + '%20' + this.shopName +'&t=&z=12&ie=UTF8&iwloc=&output=embed';
      return true;
    }
    else {
      return false;
    }
  }
}
