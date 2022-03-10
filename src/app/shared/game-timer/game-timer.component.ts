import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-game-timer',
    templateUrl: './game-timer.component.html',
    styleUrls: ['./game-timer.component.scss']
})
export class GameTimerComponent implements OnInit {

    @Output() public timeOverEvent = new EventEmitter<void>();
    public timeValue: number;
    public maxTimeValue: number;
    private lastTime: number;
    isStopped: boolean;
    constructor() { }

    public ngOnInit() {

    }

    public startTimer(maxTimeValue: number) {
        this.maxTimeValue = maxTimeValue;
        this.timeValue = maxTimeValue;
        this.lastTime = Date.now()/1000;
        this.isStopped = false;
        setTimeout(() => this.updateTimer(), 100);
    }

    public stopTimer() {
        this.isStopped = true;
    }

    public resumeTimer() {
        this.isStopped = false;

        this.lastTime = Date.now()/1000;
        setTimeout(() => this.updateTimer(), 100);
    }

    public getLeftTimeString(timeValue: number): string {
        const minutes = Math.floor(timeValue / 60);
        const seconds =  Math.floor(timeValue - 60*minutes);
        return minutes + ':' + (seconds > 10 ? seconds : '0' + seconds);
        //return minutes + ' minutos  ' + seconds + ' segundos';
    }

    public getLeftTime():number{
        return this.timeValue;
    }

    private updateTimer(): void {
        if (this.isStopped) return;

        if(this.timeValue <= 0){
            this.timeValue = 0;
            this.timeOverEvent.emit();
            return;
        }

        const currentTime = Date.now()/1000;

        this.timeValue -= (currentTime - this.lastTime);
        this.lastTime = currentTime;
        setTimeout(() => this.updateTimer(), 100);
    }


}
