import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/common/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ExportService } from '../../services/export.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
    selector: 'app-vk-auth-dialog',
    templateUrl: './vk-auth-dialog.component.html',
    styleUrls: ['./vk-auth-dialog.component.scss']
})
export class VkAuthDialogComponent implements OnInit {

    public vkAuthForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    public validationForm = new FormGroup({
        code: new FormControl('', [Validators.required]),
    });

    public showValidationForm = false;

    constructor(
        private userService: UserService,
        private notify: NotificationService,
        private dialog: MatDialogRef<any>,
    ) { }

    public ngOnInit(): void {
    }

    public login(): void {
        if (!this.vkAuthForm.valid) { return; }
        const { username, password } = this.vkAuthForm.value;
        this.userService.vkLogin(username, password)
            .subscribe(
                res => {
                    this.dialog.close(true);
                },
                (err) => {
                    if (err.error === 'invalid_client') {
                        this.notify.success('Неправильный логин или пароль.');
                    } else if (err.error === 'need_validation') {
                        this.showValidationForm = true;
                    }
                }
            );
    }

    public sendCode(): void {
        const { username, password } = this.vkAuthForm.value;
        const { code } = this.validationForm.value;

        this.userService.vkLogin(username, password, code)
            .subscribe(
                () => this.dialog.close(true),
                (err) => {
                    if (err.error === 'need_validation') {
                        this.notify.success('Вы ввели неверный код подтверждения.');
                    }
                }
            );


    }

}
