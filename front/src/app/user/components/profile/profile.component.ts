import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user-profile';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { VkProfile } from '../../types/vk-profile';
import { tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/common/notification.service';


@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: UserProfile;
  public vkProfile: VkProfile;

  constructor(
    private userService: UserService,
    private notify: NotificationService
  ) { }

  public ngOnInit(): void {
    this.userService.getProfile()
      .pipe(untilDestroyed(this))
      .subscribe(res => this.profile = res);

    this.userService.vkProfile
      .pipe(untilDestroyed(this))
      .subscribe(res => this.vkProfile = res);
  }

  public goToVk(): void {
    window.open(`http://vk.com/id${this.vkProfile.id}`, '_blank');
  }

  public logout(): void {
    this.userService.vkLogout()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.notify.success('Вы вышли из учетной записи ВК');
      });
  }

}
