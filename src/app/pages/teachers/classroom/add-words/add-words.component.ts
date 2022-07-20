import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassroomWord } from 'src/api/models/classroomWord.model';
import { Teacher } from 'src/api/models/teacher.model';
import { Word } from 'src/api/models/word.model';
import { ClassroomsService } from 'src/api/services/classrooms-service/classrooms.service';
import { ClassroomWordsService } from 'src/api/services/classroomWords-service/classroomWords.service';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { AppComponent } from 'src/app/app.component';
import { DialogTemplateComponent } from 'src/app/shared/dialog/dialog-template/dialog-template.component';
import { CellDefinition, SelectableItem } from 'src/app/shared/multi-select-list/multi-select-list.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.scss']
})
export class AddWordsComponent implements OnInit {
    @ViewChild('wordDetailsDialogTemplate') public wordDetailsDialogTemplate: TemplateRef<any>;

    public teacher: Teacher;
    public classroomId: number;
    public dataLoaded: boolean = false;
    public isSaveButtonEnabled: boolean = false;
    public wordsAssociation: SelectableItem[] = [];
    public wordToShowDetails: Word;
    public wordCellDefinitions: CellDefinition[];

    private fullWordsList: Word[];
    private existingClassroomWords: ClassroomWord[];
    private notifications: NotificationComponent;

    constructor(
        app: AppComponent,
        private classroomService: ClassroomsService,
        private classroomWordsService: ClassroomWordsService,
        private wordsService: WordsService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private teacherService: TeachersService
        ) {
            this.notifications = app.getNotificationsComponent();
            this.wordCellDefinitions = [
                {
                    header: 'Palabra',
                    itemKey: 'viewName',
                    isImage: false
                },
                {
                    header: 'Creado por',
                    itemKey: 'owner',
                    isImage: false
                }
            ];
        }

    public async ngOnInit() {
        this.classroomId = this.route.snapshot.params['classroomId'];

        this.teacher = await this.teacherService.getTeacherLoged().toPromise();

        this.getWordsListClassroom();
    }

    public showSelectedWord(id: number): void {
        const word = this.fullWordsList.find(x => x.id === id);

        if (!word) return;

        this.wordToShowDetails = word;

        this.dialog.open(
            DialogTemplateComponent,
            {
                data: {
                    template: this.wordDetailsDialogTemplate,
                    dialogButtons: [],
                    dialogTitle: word.name
                }
            }
        );
    }

    public async saveWordsSelection(): Promise<void> {
        this.isSaveButtonEnabled = false;

        const wordIdsToDelete = this.existingClassroomWords
            .filter(x => !this.wordsAssociation.find(y => y.id === x.wordId)?.isChecked)
            .map(x => x.id);

        for(const id of wordIdsToDelete){
            await this.classroomWordsService.deleteClassroomWord(id).toPromise();
            this.existingClassroomWords.splice(this.existingClassroomWords.findIndex(x => x.id === id));
        }

        const wordIdsToCreate = this.wordsAssociation
            .filter(x => !this.existingClassroomWords.some(y => y.wordId === x.id) && x.isChecked)
            .map(x => x.id);

        for(const wordId of wordIdsToCreate){
            const createdClassroomWord = await this.classroomWordsService.createClassroomWord(wordId, this.classroomId).toPromise();
            this.existingClassroomWords.push(createdClassroomWord);
        }
        setTimeout(() => this.isSaveButtonEnabled = true, 1500);

        this.notifications.pushNotification('Se han asociado las palabras a la clase correctamente', 'success');
    }

    private getWordsListClassroom() {
        this.classroomService.getWordsListClassroom(this.classroomId).subscribe((words: ClassroomWord[]) =>  {
            this.existingClassroomWords = words;
            this.wordsAssociation = words.map(w => {
                let result = new WordSelectableItem();
                result.id = w.word.id;
                result.viewName = w.word.name;
                result.owner = (w.word.teacherId == null ? 'Sistema' : '' + this.teacher.user.name + '');
                result.isChecked = true;
                return result;
            });
            this.getWordsList();
        });
    }

    private getWordsList() {
        this.wordsService.getWordsList()
            .subscribe((words: Word[]) => {
                let mappedWords = words.map(w => {
                    let result = new WordSelectableItem();
                    result.id = w.id;
                    result.viewName = w.name;
                    result.owner = (w.teacherId == null ? 'Sistema' : '' + this.teacher.user.name + '');
                    result.isChecked = false;
                    return result;
                });

                this.fullWordsList = words;
                this.wordsAssociation = this.wordsAssociation.concat(mappedWords.filter(x => !this.wordsAssociation.some(y => y.id === x.id)));
                this.dataLoaded = true;
                this.isSaveButtonEnabled = true;
            });
    }
}

class WordSelectableItem extends SelectableItem {
    owner: string;
}
