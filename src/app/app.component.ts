import { Component, ViewChild } from '@angular/core';
import { NotificationComponent } from './shared/notification/notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild(NotificationComponent) private notifications: NotificationComponent;

    public getNotificationsComponent(): NotificationComponent {
        return this.notifications;
    }
}
