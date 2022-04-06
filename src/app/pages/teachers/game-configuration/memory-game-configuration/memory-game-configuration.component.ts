import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MemoryGameClassroomConfiguration } from 'src/api/models/memoryGameClassroomConfiguration.model';
import { Word } from 'src/api/models/word.model';
import { MemoryGameClassroomConfigurationService } from 'src/api/services/memory-game-classroom-configuration-service/memory-game-classroom-configuration.service';

@Component({
  selector: 'app-memory-game-configuration',
  templateUrl: './memory-game-configuration.component.html',
  styleUrls: ['./memory-game-configuration.component.scss']
})
export class MemoryGameConfigurationComponent implements OnInit {

    @Input() public gameId: number;
    @Input() public classroomId: number;
    @Output() public goBackClicked = new EventEmitter();
    public currentConfigurationId: number;
    public formGroup: FormGroup;
    public classroomWords: Word[];
    public currentConfiguration: MemoryGameClassroomConfiguration;
    public formGroupIsLoaded: boolean = false;

    constructor(
        private memoryGameClassroomConfigurationService: MemoryGameClassroomConfigurationService
    ) { }

    public ngOnInit() {
        this.formGroupIsLoaded = false;
        this.memoryGameClassroomConfigurationService.getMemoryGameClassroomConfigurationByClassroomId(this.classroomId)
            .subscribe(
                (currentConfiguration: MemoryGameClassroomConfiguration) => {
                    this.currentConfiguration = currentConfiguration;
                    this.currentConfigurationId = currentConfiguration.id;
                },
                () => this.loadFormGroup(),
                () => this.loadFormGroup(),
            );
    }

    public saveGameConfiguration() {
        const config = {
            gameId: this.gameId,
            classroomId: this.classroomId,
            time: this.formGroup.controls.time.value
        } as MemoryGameClassroomConfiguration;

        if (!this.currentConfiguration) {
            this.memoryGameClassroomConfigurationService.createMemoryGameClassroomConfiguration(config)
                .subscribe();
        }
        else {
            config.id = this.currentConfigurationId;
            this.memoryGameClassroomConfigurationService.updateMemoryGameClassroomConfiguration(config)
                .subscribe();
        }
    }

    private loadFormGroup() {
        this.formGroup = new FormGroup({
            id: new FormControl(this.currentConfiguration ? this.currentConfiguration.id : ''),
            time: new FormControl(this.currentConfiguration ? this.currentConfiguration.time : '', [Validators.required])
        });
        this.formGroupIsLoaded = true;
    }



}
