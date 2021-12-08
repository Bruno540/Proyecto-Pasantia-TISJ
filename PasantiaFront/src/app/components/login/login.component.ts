import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { LoginService } from 'src/app/services/auth/login.service';
import { TokenStorageService } from 'src/app/services/auth/tokenstorage/tokenstorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        private tokenService: TokenStorageService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.titleService.setTitle('Iniciar Sesion');
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
            this.tokenService.saveToken(data.token);
            this.tokenService.saveUserEmail(data.usuario.email);
            this.tokenService.saveRoleName(data.usuario.rol);
            this.snackBar.open("Login exitoso", "Cerrar")
            this.router.navigateByUrl('/');
        },
            error => {
                this.loading = false;
                this.snackBar.open(error.error.message, "Cerrar")
            });
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
