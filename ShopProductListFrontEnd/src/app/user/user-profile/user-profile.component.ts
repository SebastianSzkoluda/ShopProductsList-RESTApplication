import {Component, OnInit} from '@angular/core';
import {FamilyUser} from '../../model/family-user';
import {UserService} from '../user-manager/user.service';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectUserAvatar} from '../../store/reducers';
import {UploadAvatarAction} from '../../store/actions/auth-actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  loading = false;
  avatarUrl: string;
  avatarUrl$: Observable<string>;
  user: FamilyUser = new FamilyUser();

  constructor(private userService: UserService, private msg: NzMessageService, private store: Store<any>) {
    this.avatarUrl$ = this.store.pipe(select(selectUserAvatar));
  }

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(usr => {
      this.user = usr;
    });
  }

  beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      this.msg.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  };

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    console.log(info.file.status);
    if (info.file.status === 'uploading') {
      this.loading = true;
      return;
    }
    if (info.file.status === 'done') {
      this.store.dispatch(new UploadAvatarAction(this.user.username+".jpg?"+ new Date().getMilliseconds()));
    }
    this.avatarUrl = undefined;
  }

}
