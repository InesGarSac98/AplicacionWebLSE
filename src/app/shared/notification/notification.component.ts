import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    public notifications: Notification[];
    @ViewChild('template') public template: TemplateRef<ElementRef>;
    constructor() { }

    public ngOnInit() {
        this.notifications = [];
    }

    public pushNotification(message: string, type: 'success' | 'error'): void {
        let notification: Notification = {
            id: this.newGuid(),
            message: message,
            type: type
        };

        this.autoHideAlert(notification.id);
        this.notifications.push(notification);
    }

    public notificationLoaded(element: ElementRef): void {

        setTimeout(() => (element.nativeElement as any).alert('close'), 1500);
    }

    public dismissAlert(id: string): void {
        $('#'+id).alert('close');
    }

    private newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    private autoHideAlert(id: string): void {
        setTimeout(() => $('#'+id).alert('close'), 3000);
    }
}

class Notification {
    id: string;
    message: string;
    type: 'success' | 'error';
}
