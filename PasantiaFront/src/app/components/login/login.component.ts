import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { LoginService } from 'src/app/services/auth/login.service';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private authenticationService: LoginService,
        private tokenService: TokenStorageService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Proyecto .NET Login');
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new FormGroup({
            email: new FormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl(savedUserEmail !== null)
        });
    }

    login() {
        const email = this.loginForm.get('email')!.value;
        const password = this.loginForm.get('password')!.value;

        this.loading = true;
        this.authenticationService.login(email.toLowerCase(), password).subscribe(data => {
            console.log("LOS DATOS DE LOGIN SON: ",data);
            this.tokenService.saveToken(data.token);
            this.tokenService.saveUserName(data.email);
            this.tokenService.saveRoleName(data.role);
            //this.router.navigate(['/']);
            window.location.reload();
        },
        error => {
            this.loading = false;
        });
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
