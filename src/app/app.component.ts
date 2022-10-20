import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.logger.printLog('Logging from App Component');
  }
}
