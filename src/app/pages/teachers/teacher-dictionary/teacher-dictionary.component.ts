import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/api/models/user.model';
import { Word } from 'src/api/models/word.model';
import { TeachersService } from 'src/api/services/teachers-service/teachers.service';
import { UsersService } from 'src/api/services/users-service/users.service';
import { WordsService } from 'src/api/services/words-service/words.service';
import { AppComponent } from 'src/app/app.component';
import { DialogButton, DialogTemplateComponent } from 'src/app/shared/dialog/dialog-template/dialog-template.component';
import { DeleteComponent } from 'src/app/shared/dialog/dialogs/delete/delete.component';
import { CellDefinition, MultiSelectListComponent } from 'src/app/shared/multi-select-list/multi-select-list.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
    selector: 'app-teacher-dictionary',
    templateUrl: './teacher-dictionary.component.html',
    styleUrls: ['./teacher-dictionary.component.scss']
})

export class TeacherDictionaryComponent implements OnInit {
    public teacherId: number;

    public userName: string;
    public dataLoaded: boolean = false;
    public wordsAssociation: WordItemList[] = [];
    private fullWordsList: Word[];
    public dictionaryCellDefinitions: CellDefinition[];
    public arasaacWord: ArasaacWord | null;
    public wordToShowDetails: Word;
    public arasaacDialogButtons: DialogButton[];
    private notifications: NotificationComponent;
    public buscar: boolean = false;

    @ViewChild('searchInArasaacDialogTemplate') public searchInArasaacDialogTemplate: TemplateRef<any>;
    @ViewChild('wordDetailsDialogTemplate') public wordDetailsDialogTemplate: TemplateRef<any>;
    @ViewChild('wordsTableComponent') public wordsTableComponent: MultiSelectListComponent;

    constructor(
        app: AppComponent,
        private wordsService: WordsService,
        private userService: UsersService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private teacherService: TeachersService
    ) {
        this.notifications = app.getNotificationsComponent();

        this.dictionaryCellDefinitions = [
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

        this.arasaacDialogButtons = [
            {
                text: 'Añadir',
                clicked: () => this.saveWordFromArasaac()
            },
            {
                text: 'Salir',
                clicked: () => {}
            }
        ]
    }

    public ngOnInit() {
        this.teacherService.getTeacherLoged().subscribe(x => this.teacherId = x.id);
        this.userService.getUserLoged()
            .subscribe((user: User) => {
                this.userName = user.name;

        this.wordsService.getWordsList()
            .subscribe((words: Word[]) => {
                let mappedWords = words.map(w => {
                    let result = new WordItemList();
                    result.id = w.id;
                    result.viewName = w.name;
                    result.owner = (w.teacherId == null ? 'Sistema' : '' + this.userName + '');
                    result.isChecked = false;
                    return result;
                });

                this.fullWordsList = words;
                this.wordsAssociation = this.wordsAssociation.concat(mappedWords.filter(x => !this.wordsAssociation.some(y => y.id === x.id)));
                this.dataLoaded = true;
            });
        });
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

    public showWordFromArasaac(id: number): void {
        let dialogRef = this.dialog.open(
            DialogTemplateComponent,
            {
                data: {
                    template: this.searchInArasaacDialogTemplate,
                    dialogButtons: this.arasaacDialogButtons,
                    dialogTitle: 'Buscar en ARASAAC'
                }
            }
        );
        dialogRef.afterClosed().subscribe(() => this.arasaacWord = null);
    }

    public deleteWord(id: number) {

        const wordToDelete = this.wordsAssociation.find(c => c.id === id);

        if (!wordToDelete) return;

        if (wordToDelete.owner === 'Sistema') {
            this.notifications.pushNotification('No está permitido borrar palabras del sistema', 'error');
            return;
        }

        let dialogRef = this.dialog.open(DeleteComponent);

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.wordsService.deleteWord(id)
                    .subscribe(_ => {
                        this.wordsAssociation.splice(this.wordsAssociation.findIndex(c => c.id === id), 1);
                        this.wordsTableComponent.refreshDataTable(this.wordsAssociation);
                        this.notifications.pushNotification('La palabra ha sido borrada correctamente', 'success');
                    },
                    (error) => {
                        this.notifications.pushNotification('Error al intentar borrar la palabra', 'error');
                    });
            }
        });

    }

    public returnWordsSelection(): void {
        this.router.navigate(['/students/profile/']);
    }

    public searchInArasaac(text: string): void {
        this.wordsService.findWordInArasaac(text)
            .subscribe((arasaacWord: ArasaacWord) => {
                this.arasaacWord = arasaacWord;
            });
        this.buscar = true;
    }

    public saveWordFromArasaac(): void {
        if (!this.arasaacWord) return;

        let word = {
            image: this.arasaacWord.image,
            video: this.arasaacWord.video,
            videoDefinition: this.arasaacWord.videoDefinition,
            name: this.arasaacWord.name,
            teacherId: this.teacherId
        } as Word;

        this.wordsService.saveWord(word)
            .subscribe(
                (savedWord) => {
                    this.wordsAssociation.push({
                        id: savedWord.id,
                        isChecked: false,
                        owner: this.userName,
                        viewName: word.name
                    } as WordItemList);
                    this.wordsTableComponent.refreshDataTable(this.wordsAssociation);
                },
                error => this.notifications.pushNotification(error, 'error')
            );
    }
}

export class WordItemList {
    id: number;
    viewName: string;
    owner: string;
    isChecked: boolean;
}

class ArasaacWord {
    name: string;
    image: string;
    video: string;
    videoDefinition: string;
}
